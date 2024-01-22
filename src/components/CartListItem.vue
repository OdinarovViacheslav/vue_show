<script setup>
import CartItem from "@/components/CartItem.vue";
import {inject} from "vue";

const {cart, removeFromCart} = inject('cart')


</script>
<template>
  <div class="flex flex-col flex-1 gap-4" v-auto-animate>
    <CartItem
        v-for="item in cart"
        :key="item.id"
        :img-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :id="item.id"
        @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>


