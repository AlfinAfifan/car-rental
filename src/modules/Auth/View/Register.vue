<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../../../services';

const router = useRouter();
const dataInput = reactive({
  nama: '',
  alamat: '',
  nomor_telepon: '',
  nomor_sim: '',
  password: '',
  role: 'user',
});

const errorRegister = ref(false);

function handleRegister() {
  registerUser(dataInput)
    .then((res) => {
      console.log(res);
      router.push("/login")
    })
    .catch((err) => (errorRegister.value = true));
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-slate-200">
    <div class="w-[500px] rounded-2xl p-5 shadow bg-white">
      <h1 class="text-2xl font-bold text-blue-900">Register Page</h1>
      <div v-if="errorRegister" class="col-span-2 mt-3 bg-red-300 rounded-lg flex justify-center items-center h-10">
        <h1 class="font-medium">Register Gagal !</h1>
      </div>
      <form class="grid grid-cols-2 gap-5 mt-7">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input
            v-model="dataInput.nama"
            type="text"
            id="username"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="username"
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            v-model="dataInput.password"
            type="password"
            id="password"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Min 3 karakter"
          />
        </div>
        <div class="col-span-2">
          <label for="alamat" class="block mb-2 text-sm font-medium text-gray-900">Alamat</label>
          <input
            v-model="dataInput.alamat"
            type="text"
            id="alamat"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Alamat"
          />
        </div>
        <div>
          <label for="telp" class="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
          <input
            v-model="dataInput.nomor_telepon"
            type="text"
            id="telp"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0823..."
          />
        </div>
        <div>
          <label for="sim" class="block mb-2 text-sm font-medium text-gray-900">Nomor SIM</label>
          <input
            v-model="dataInput.nomor_sim"
            type="text"
            id="sim"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nomor SIM"
          />
        </div>
        <div class="col-span-2">
          <button @click="handleRegister" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 w-full">Register</button>
        </div>
      </form>
      <div class="flex gap-1 text-sm font-medium">
        <h1 class="font-normal">Sudah punya akun?</h1>
        <router-link to="/login">
          <h1 class="text-blue-800">Login disini</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>
