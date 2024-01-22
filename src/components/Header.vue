<script setup>
const emit = defineEmits(['openDrawer']);

defineProps({
  totalPrice: Number
})

</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10">
        <div>
          <h2 class="text-xl font-bold uppercase">Vue</h2>
          <p class="text-slate-500">Vue-Shop</p>
        </div>
      </div>
    </router-link>


    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')"
          class="flex items-center gap-3 text-gray-500 hover:text-blue cursor-pointer">
        <img src="/cart.svg" alt="cart">
        <b>{{ totalPrice }}</b>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-blue cursor-pointer">
        <router-link to="/favorites">
          <img src="/heart.svg" alt="heart">
          <span>Закладки</span>
        </router-link>
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