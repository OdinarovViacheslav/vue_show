<script setup>
import Card from "@/components/Card.vue";
import {inject} from "vue";

defineProps({
  items: Array,
  isFavorites: Boolean
});

const addToFavorite = inject('addToFavorite')
const emit = defineEmits(['addToCart'])

</script>
<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5">
    <Card
        v-for="item in items"
        :key="item.id"
        :img-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :onClickFavorite="isFavorites ? null : () => addToFavorite(item)"
        :onClickAdd = "isFavorites ? null : () => emit('addToCart', (item))"
        :is-favorite="item.isFavorite"
        :id="item.id"
        :is-added="item.isAdded"
    />
  </div>
</template>

