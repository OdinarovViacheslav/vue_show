<script setup>
 const emit = defineEmits(['openDrawer']);

</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-10 py-8">

    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10">
      <div>
        <h2 class="text-xl font-bold uppercase">Vue</h2>
        <p class="text-slate-500">Vue-Shop</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')" class="flex items-center gap-3 text-gray-500 hover:text-blue cursor-pointer">
        <img src="/cart.svg" alt="cart">
        <b>123$</b>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-blue cursor-pointer">
        <img src="/heart.svg" alt="heart">
        <span>Закладки</span>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-blue cursor-pointer">
        <img src="/user.svg" alt="user">
        <span>Профиль</span>
      </li>
    </ul>
  </header>

</template>

<script>

</script>

<style scoped>
</style>