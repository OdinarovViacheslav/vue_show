<script setup>
import {onMounted, provide, reactive, ref, watch} from "vue";
import Header from './components/Header.vue'
import CardListVue from './components/CardList.vue'
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import axios, {spread} from "axios";


const cart = ref([])
const items = ref([]);
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})
const cartOpen = ref(false)
const addToCart = (item) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(
        cart.value.indexOf(item), 1
    )
    item.isAdded = false
  }
}
const closeDrawer = () => {
  cartOpen.value = false
}
const openDrawer = () => {
  cartOpen.value = true
}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchFavorites = async () => {
  try {
    const {data: favorites} = await axios.get(
        `https://604781a0efa572c1.mokky.dev/favorites`);
    items.value = items.value.map(item => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);
      console.log(favorite)
      if (!favorite) {
        return item;
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true

      const {data} = await axios.post(
          `https://604781a0efa572c1.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false;
      await axios.delete(`https://604781a0efa572c1.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavoriteId = null

    }
  } catch (err) {
    console.log(err)
  }

}
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    const {data} = await axios.get(
        `https://604781a0efa572c1.mokky.dev/items`, {
          params
        });
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }));
  } catch (err) {
    console.log(err)
  }
}
onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(filters, fetchItems);
provide('addToFavorite', addToFavorites)
provide('cart', {
  cart,
  closeDrawer,
  openDrawer
})
</script>

<template>
  <Drawer v-if="cartOpen"/>

  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14">
    <Header @open-drawer="openDrawer"/>
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8"> Все товары </h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">популярное</option>
            <option value="-price">по цене (дорогое)</option>
            <option value="price">по цене (дешевое)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="search">
            <input
                @input="onChangeSearchInput"
                class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                type="text"
                placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardListVue :items="items" @add-to-favorire="addToFavorites" @add-to-cart="addToCart"/>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
