<script setup>
import CardList from '../components/CardList.vue'
import axios from "axios";
import {inject, onMounted, provide, reactive, ref, watch} from "vue";
import {debounce} from "lodash/function.js";

const {addToCart, removeFromCart, cart} = inject('cart')

const items = ref([])
const favorites_list = ref([])


const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})
const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)
const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      favorites_list.value.push(item)
      localStorage.setItem('favorites_items', JSON.stringify(favorites_list.value))
      const obj = {
        item_id: item.id,
        item
      }
      item.isFavorite = true
      const {data} = await axios.post(
          `https://604781a0efa572c1.mokky.dev/favorites`, obj)
      item.favoriteId = data.id

    } else {
      item.isFavorite = false;
      favorites_list.value.splice(favorites_list.value.indexOf(item), 1)

      // localStorage.removeItem(item)
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


onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []


  await fetchItems()
  await fetchFavorites()
    items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
watch(filters, fetchItems);
provide('addToFavorite', addToFavorites)

</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold mb-8 sm:text-3xl"> Все товары </h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">популярное</option>
        <option value="-price">по цене (дорогое)</option>
        <option value="price">по цене (дешевое)</option>
      </select>
      <div class="relative w-10">
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
    <CardList :items="items" @add-to-favorire="addToFavorites" @add-to-cart="onClickAddPlus"/>
  </div>
</template>

