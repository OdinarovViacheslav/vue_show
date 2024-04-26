<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

const favorites = ref([])
import CardList from '../components/CardList.vue'

const favorites_items = localStorage.getItem('favorites_items')
favorites.value = favorites_items ? JSON.parse(favorites_items) : []
console.log(favorites.value)

onMounted(async () => {
  try {
    const {data} = await axios.get('https://604781a0efa572c1.mokky.dev/favorites');
    // favorites.value = data.map(obj => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>
<template>
  <h1>
    Закладки
    {{ favorites_items }}
  </h1>
  <CardList :items="favorites" is-favorites/>
</template>

