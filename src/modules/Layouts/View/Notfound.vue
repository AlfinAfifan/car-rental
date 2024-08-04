<script setup></script>

<template>
    <div class="w-screen h-screen bg-slate-100 flex flex-col gap-5 justify-center items-center">
        <h1 class="text-3xl font-bold text-red-600">404 - Page Not Found !</h1>
        <p class="text-base">Halaman yang anda akses tidak tersedia</p>
        <router-link to="/">
            <div class="px-4 py-2 bg-red-700 rounded-lg text-white font-medium">Kembali ke halaman sebelumnya</div>
        </router-link>
    </div>
</template>