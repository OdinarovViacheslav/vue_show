<script setup>
import DrawerHead from "@/components/DrawerHead.vue";
import CartListItem from "@/components/CartListItem.vue";
import {computed} from "vue";
import InfoBlock from "@/components/InfoBlock.vue";

const emit = defineEmits(['createOrder'])


defineProps({
  totalPrice: Number,
  discountPrice: Number,
  cartDisabledButton: Boolean
})

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead/>

    <div class="flex h-full items-center" v-if="!totalPrice">
      <InfoBlock title="Корзина пустая" description="Добавьте товар" image-url="/empty-cart.jpg"/>

    </div>
    <div v-else>
      <CartListItem/>

      <div class="flex flex-col gap-5 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }}</b>
        </div>
        <div class="flex gap-2">
          <span>Скидка:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ discountPrice }}</b>
        </div>
        <button
            :disabled="totalPrice ? false : true"
            @click="() => emit('createOrder')"
            class="bg-lime-500 w-full mt-4 rounded-xl py-3 hover:bg-lime-600 disabled:bg-slate-300
         hover:bg-lime-700 text-white cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>

  </div>
</template>

