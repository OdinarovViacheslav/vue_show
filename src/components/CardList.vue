<script setup>
import Card from "@/components/Card.vue";

const onClickAdd = () => {
  alert('Added to cart')
}
const onClockFavorite = () => {
  alert('Favorite')
}
</script>
<template>
  <div class="grid grid-cols-4 gap-5">
    <Card img-url="/sneakers/1.jpg"
          title="hui"
          :price="200"
          :is-added="true"
          :is-favorite="true"
          :onClickAdd="onClickAdd"
          :onClickFavorite="onClockFavorite"
    />
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
  </div>
</template>

