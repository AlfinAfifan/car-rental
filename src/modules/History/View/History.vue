<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getHistoryRental, returnRental } from '../../../services';
import ModalInput from '../Components/ModalInput.vue';
import Swal from 'sweetalert2';

const data = reactive([]);
const search = ref('');
const loading = ref(false);

function getData() {
  loading.value = true;
  getHistoryRental()
    .then((res) => {
      data.splice(0, data.length, ...res.data);
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
}

function showAlert(type) {
  if (type === 'success') {
    Swal.fire({
      title: 'SUCCESS!',
      text: 'Mobil telah dikembalikan, penyewaan mobil selesai',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  } else if (type === 'error') {
    Swal.fire({
      title: 'GAGAL!',
      text: 'Pengembalian mobil gagal',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
}

function handleReturn(car) {
  returnRental({ nomor_plat: car.nomor_plat })
    .then((res) => {
      showAlert('success');
      getData();
    })
    .catch((err) => {
      showAlert('error');
    });
}

const filteredData = computed(() => {
  const dataSearch = search.value.toLowerCase();
  return data.filter((car) => car.mobil.merek.toLowerCase().includes(dataSearch) || car.mobil.model.toLowerCase().includes(dataSearch) || car.mobil.nomor_plat.toLowerCase().includes(dataSearch));
});

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="flex justify-between items-center bg-white p-5 rounded-xl shadow">
    <h1 class="text-xl font-bold">History</h1>
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
    <div v-for="car in filteredData" :key="car.id" class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ car.mobil.model }}</h2>
        <div class="flex justify-between">
          <p>{{ car.mobil.merek }}</p>
          <h1>{{ car.mobil.nomor_plat }}</h1>
        </div>
        <div class="w-full h-0.5 bg-gray-400"></div>
        <div class="flex justify-between mt-3">
          <h1 class="">Disewa</h1>
          <h1>Batas Peminjaman</h1>
        </div>
        <div class="flex justify-between">
          <h1 class="text-blue-700 font-medium">{{ car.start_date }}</h1>
          <h1 class="text-red-700 font-medium">{{ car.end_date }}</h1>
        </div>
        <div class="card-actions flex items-center justify-between">
          <button v-if="!car.returned_at" @click="handleReturn(car.mobil)" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5">Selesai</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-60 flex justify-center items-center text-xl font-semibold text-blue-500">Loading...</div>
</template>
