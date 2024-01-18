<script setup>
import CartItem from "@/components/CartItem.vue";
import {inject} from "vue";

const {cart} = inject('cart')

</script>
<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem
        v-for="item in cart"
        :key="item.id"
        :img-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :id="item.id"
    />
  </div>
</template>


