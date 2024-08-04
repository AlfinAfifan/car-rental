<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getCar, getHistoryRental, returnRental } from '../../../services';
import ModalInput from '../Components/ModalInput.vue';
import Swal from 'sweetalert2';

const data = reactive([]);
const optionPlat = ref([]);
const search = ref('');

function getData() {
  getHistoryRental()
    .then((res) => data.splice(0, data.length, ...res.data))
    .catch((err) => console.log(err));
}

function getDataMobil() {
  getCar()
    .then((res) => {
      const mappedData = res.data.map((item) => ({
        nomor_plat: item.nomor_plat,
      }));
      optionPlat.value = mappedData;
    })
    .catch((err) => console.log(err));
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

function showAlert(type) {
    if(type === "success") {
        Swal.fire({
            title: 'SUCCESS!',
            text: 'Mobil telah dikembalikan, penyewaan mobil selesai',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    } else if (type === "error" ) {
        Swal.fire({
            title: 'GAGAL!',
            text: 'Pengembalian mobil gagal',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}

const filteredData = computed(() => {
  const dataSearch = search.value.toLowerCase();
  return data.filter((car) => car.user.nomor_telepon.toLowerCase().includes(dataSearch) || car.user.nama.toLowerCase().includes(dataSearch) || car.mobil.nomor_plat.toLowerCase().includes(dataSearch));
});

onMounted(() => {
  getData();
  getDataMobil();
});
</script>

<template>
  <div class="w-full rounded-2xl bg-white shadow">
    <h1 class="text-xl font-bold p-5">Rental List</h1>
    <hr />
    <div class="flex w-full justify-between p-5">
      <button onclick="modal_input.showModal()" type="button" class="flex gap-2 text-white bg-blue-900 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" viewBox="0 0 24 24">
          <title>plus-circle-outline</title>
          <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
        </svg>
        Add
      </button>
      <form class="flex w-72">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex text-gray-500 items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
              <title>car-search-outline</title>
              <path
                d="M10.29 19H6V20C6 20.5 5.6 21 5 21H4C3.5 21 3 20.5 3 20V12L5.1 6C5.3 5.4 5.8 5 6.5 5H17.5C18.1 5 18.7 5.4 18.9 6L20.91 11.74C20.17 10.93 19.24 10.31 18.18 9.95L17.1 7H6.8L5.8 10H13.91C12.79 10.4 11.81 11.1 11.08 12H5V17H9.68C9.78 17.71 10 18.38 10.29 19M6 14.5C6 15.3 6.7 16 7.5 16S9 15.3 9 14.5 8.3 13 7.5 13 6 13.7 6 14.5M16.11 11.61C13.61 11.61 11.61 13.61 11.61 16.11S13.61 20.61 16.11 20.61C17 20.61 17.8 20.36 18.5 19.93L21.61 23L23 21.61L19.92 18.5C20.36 17.82 20.61 17 20.61 16.11C20.61 13.61 18.61 11.61 16.11 11.61M16.11 13.61C17.5 13.61 18.61 14.73 18.61 16.11S17.5 18.61 16.11 18.61 13.61 17.5 13.61 16.11 14.73 13.61 16.11 13.61"
              />
            </svg>
          </div>
          <input
            v-model="search"
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2"
            placeholder="Search plat / penyewa / telp"
            required
          />
        </div>
      </form>
    </div>

    <div class="relative overflow-x-auto p-5">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Tgl Peminjaman</th>
            <th scope="col" class="px-6 py-3">Batas Pengembalian</th>
            <th scope="col" class="px-6 py-3">Nomor Plat</th>
            <th scope="col" class="px-6 py-3">Penyewa</th>
            <th scope="col" class="px-6 py-3">Telp. Penyewa</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="item.id" class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ parseInt(index, 10) + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.start_date }}
            </td>
            <td class="px-6 py-4">
              {{ item.end_date }}
            </td>
            <td class="px-6 py-4">
              {{ item.mobil.nomor_plat }}
            </td>
            <td class="px-6 py-4">
             {{ item.user.nama}}
            </td>
            <td class="px-6 py-4">
             {{ item.user.nomor_telepon}}
            </td>
            <td class="px-6 py-4">
             {{ item.returned_at? "Selesai": "Progress"}}
            </td>
            <td class="px-6 py-4">
             <div v-if="!item.returned_at" @click="handleReturn(item.mobil)" class="p-1 text-gray-800 w-fit cursor-pointer rounded-full hover:bg-green-200">
              <svg fill="currentColor" class="w-5 h-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-circle-outline</title><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" /></svg>
             </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ModalInput :optionPlat="optionPlat" :showAlert="showAlert" :getData="getData" />
</template>
