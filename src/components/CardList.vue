<script setup>
import Card from "@/components/Card.vue";

const onClickAdd = () => {
  alert('Added to cart')
}
const onClockFavorite = () => {
  alert('Favorite')
}
defineProps({
  items: Array
});
</script>
<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
        v-for="item in items"
        :key="item.id"
        :img-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :onClickAdd="onClickAdd"
        :onClickFavorite="onClockFavorite"
    />
  </div>
</template>

