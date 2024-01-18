<script setup>

defineProps({
    id:Number,
    imgUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd:Function
  })



</script>

<template>
  <div class="flex">
    <div
        class="relative bg-white m-10 border border-slate-100 rounded-3xl p-8 transition
                                                cursor-pointer hover:-translate-y-2 hover:shadow-xl">
      <img @click="onClickFavorite" :src="!isFavorite ? '/unliked.svg' : '/liked.svg'" alt="unliked"
           class="absolute top-8 left 8">

      <img :src="imgUrl" alt="sneacker">
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">Price:</span>
          <b>{{ price }}</b>
        </div>

        <img @click="onClickAdd" :src="!isAdded ? '/btn-plus.svg' : '/btn-checked.svg'" alt="plus">
      </div>

    </div>
  </div>

</template>


