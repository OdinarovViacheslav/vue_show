<script setup>
defineProps({
      id: Number,
      title: String,
      imgUrl: String,
      price: Number,
      isFavorite: Boolean,
      isAdded: Boolean,
      onClickFavorite: Function,
      onClickAdd: Function
    }
)

</script>
<template>

  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imgUrl" alt="item">

    <div class="flex flex-col">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ price }} $</b>
        <img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/btn-remove.svg" alt="close">

      </div>

    </div>

  </div>

</template>

