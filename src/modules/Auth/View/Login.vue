<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../../services';

const router = useRouter();
const dataLogin = reactive({
  nama: '',
  password: '',
});
const errorLogin = ref(false)

function handleLogin() {
  login(dataLogin)
    .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data))
        localStorage.setItem("token", res.data.token)
        if(res.data.data.role === "admin") {
            router.push('/car-list')
        } else {
            router.push('/')
        }
    })
    .catch((err) => errorLogin.value = true);
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-slate-200">
    <div class="w-[350px] rounded-2xl p-5 shadow bg-white">
      <h1 class="text-2xl font-bold text-blue-900">Login Page</h1>
        <div v-if="errorLogin" class="w-full bg-red-300 h-10 rounded-xl flex justify-center items-center font-medium mt-5">Gagal Login !</div>
      <form class="max-w-sm mx-auto mt-5">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
        <div class="flex">
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            v-model="dataLogin.nama"
            type="text"
            id="username"
            class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
            placeholder="Johndoe"
            required
          />
        </div>
        <label for="password" class="block mb-2 mt-4 text-sm font-medium text-gray-900">Password</label>
        <div class="flex">
          <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
            <svg class="text-gray-500 h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>lock-question</title>
              <path
                d="M12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8H17V6A5,5 0 0,0 12,1M12,2.9C13.71,2.9 15.1,4.29 15.1,6V8H8.9V6C8.9,4.29 10.29,2.9 12,2.9M12.19,10.5C13.13,10.5 13.88,10.71 14.42,11.12C14.96,11.54 15.23,12.1 15.23,12.8C15.23,13.24 15.08,13.63 14.79,14C14.5,14.36 14.12,14.64 13.66,14.85C13.4,15 13.23,15.15 13.14,15.32C13.05,15.5 13,15.72 13,16H11C11,15.5 11.1,15.16 11.29,14.92C11.5,14.68 11.84,14.4 12.36,14.08C12.62,13.94 12.83,13.76 13,13.54C13.14,13.33 13.22,13.08 13.22,12.8C13.22,12.5 13.13,12.28 12.95,12.11C12.77,11.93 12.5,11.85 12.19,11.85C11.92,11.85 11.7,11.92 11.5,12.06C11.34,12.2 11.24,12.41 11.24,12.69H9.27C9.22,12 9.5,11.4 10.05,11.04C10.59,10.68 11.3,10.5 12.19,10.5M11,17H13V19H11V17Z"
              />
            </svg>
          </span>
          <input
            v-model="dataLogin.password"
            type="password"
            id="password"
            class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
            placeholder="*******"
            required
          />
        </div>

        <button @click="handleLogin" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 w-full">Login</button>
      </form>
      <div class="flex gap-1 text-sm font-medium">
        <h1 class="font-normal">Belum punya akun?</h1>
        <router-link to="/register">
          <h1 class="text-blue-800">Register disini</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>
