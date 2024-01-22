<script setup>
import {computed, onMounted, provide, reactive, ref, watch} from "vue";
import Header from './components/Header.vue'
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import axios, {spread} from "axios";
import Main from "@/pages/Main.vue";

const isCreatingOrder = ref(false)
const cart = ref([])

const cartOpen = ref(false)

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartDisabledButton = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)
const discountPrice = computed(() => Math.round(totalPrice.value * 7) / 100)
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
const createOrder = async () => {
  try {
    const {data} = await axios.post('https://604781a0efa572c1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value,
    })
    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}
const closeDrawer = () => {
  cartOpen.value = false
}
const openDrawer = () => {
  cartOpen.value = true
}

watch(cart, () => {
      localStorage.setItem('cart', JSON.stringify(cart.value))
    },
    {deep: true}
)


provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer
      v-if="cartOpen"
      :total-price="totalPrice"
      :discount-price="discountPrice"
      @create-order="createOrder"
      is-creating-order="isCreatingOrder"
      :cart-disabled-button="cartDisabledButton"
  />

  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer"/>

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>

</style>
