<script setup>
import Sidebar from '../Components/Sidebar.vue';
</script>

<template>
  <div class="w-full h-screen bg-slate-200">
    <Sidebar />
    <div class="p-7 sm:ml-64">
      <router-view />
    </div>
  </div>
</template>
