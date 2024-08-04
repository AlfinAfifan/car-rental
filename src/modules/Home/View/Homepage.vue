<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getCar } from '../../../services';
import ModalInput from '../Components/ModalInput.vue';

const data = reactive([]);
const search = ref('');
const nomorPlat = ref('');
const loading = ref(false);

function getData() {
  loading.value = true;
  getCar()
    .then((res) => {
      data.splice(0, data.length, ...res.data);
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
}

function formattedCurrencyValue(money) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(money);
}
function handleClick(car) {
  nomorPlat.value = car.nomor_plat;
}

const filteredCars = computed(() => {
  const dataSearch = search.value.toLowerCase();
  return data.filter((car) => car.merek.toLowerCase().includes(dataSearch) || car.model.toLowerCase().includes(dataSearch) || car.nomor_plat.toLowerCase().includes(dataSearch));
});

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="flex justify-between items-center bg-white p-5 rounded-xl shadow">
    <h1 class="text-xl font-bold">Beranda</h1>
    <form class="">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          v-model="search"
          type="search"
          id="default-search"
          class="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search car"
          required
        />
      </div>
    </form>
  </div>

  <div v-if="!loading" class="grid grid-cols-3 mt-5 gap-10">
    <div v-for="car in filteredCars" :key="car.id" class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ car.model }}</h2>
        <p>{{ car.merek }}</p>
        <div class="flex justify-between mt-3">
          <h1 class="text-green-800 font-medium">Tersedia</h1>
          <h1>{{ formattedCurrencyValue(car.tarif_per_hari) }}</h1>
        </div>
        <div class="card-actions justify-end">
          <button onclick="modal_input.showModal()" @click="handleClick(car)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 w-full">Sewa</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-60 flex justify-center items-center text-xl font-semibold text-blue-500">Loading...</div>

  <ModalInput :nomorPlat="nomorPlat" />
</template>
