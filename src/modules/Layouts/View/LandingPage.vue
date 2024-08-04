<script setup>
import Navbar from "../Components/Navbar.vue"
</script>

<template>
    <div class="w-screen min-h-screen bg-slate-100 pb-10">
        <Navbar/>
        <div class="mx-36 my-10">
            <router-view/>
        </div>
    </div>
</template>
