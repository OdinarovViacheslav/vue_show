<script setup>
import Header from './components/Header.vue'
import CardListVue from './components/CardList.vue'
import Drawer from "@/components/Drawer.vue";
</script>

<template>

  <div class="bg-white w-4/5 mx-auto rounded-xl shadow-xl mt-14">
    <Drawer/>
    <Header/>
    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8"> Все товары </h2>
      <CardListVue/>

    </div>
  </div>
</template>
<style scoped>

</style>
