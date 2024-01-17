
<template>
  <div class="relative">
    <img class="absolute left-4 top-3" src="/search.svg" alt="search">
    <input
        @input="onChangeSearchInput"
        class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
        type="text"
        placeholder="Поиск"
    />
  </div>
</template>

