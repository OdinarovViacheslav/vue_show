<script setup>
import DrawerHead from "@/components/DrawerHead.vue";
import CartListItem from "@/components/CartListItem.vue";
import {computed, inject, provide, ref} from "vue";
import InfoBlock from "@/components/InfoBlock.vue";
import axios from "axios";

const isCreatingOrder = ref(false)
const orderId = ref(null)

const {
  cart,
  closeDrawer
} = inject('cart')

const props = defineProps({
  totalPrice: Number,
  discountPrice: Number,
})

const createOrder = async () => {
  try {
    const {data} = await axios.post('https://604781a0efa572c1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })
    cart.value = []
    orderId.value = data.id
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const DisabledButton = computed(() => isCreatingOrder.value || cartIsEmpty.value)
const cartIsEmpty = computed(() => cart.value.length === 0)

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead/>


    <div class="flex h-full items-center" v-if="!props.totalPrice || orderId">
      <InfoBlock v-if="!totalPrice && !orderId"
          title="Корзина пустая"
          description="Добавьте товар"
          image-url="/empty-cart.jpg"/>
      <InfoBlock v-if="orderId"
          title="Заказ оформлен"
          description="`номер заказа {{orderId}}`"
          image-url="/complete-order.jpg"
      />
    </div>
    <div v-else>
      <CartListItem/>

      <div class="flex flex-col gap-5 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ props.totalPrice }}</b>
        </div>
        <div class="flex gap-2">
          <span>Скидка:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ props.discountPrice }}</b>
        </div>
        <button
            :disabled="props.totalPrice ? false : true"
            @click="createOrder"
            class="bg-lime-500 w-full mt-4 rounded-xl py-3 hover:bg-lime-600 disabled:bg-slate-300
         hover:bg-lime-700 text-white cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>

  </div>
</template>

