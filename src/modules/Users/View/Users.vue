<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getAllUsers } from '../../../services';

const data = reactive([]);
const search = ref('');

function getData() {
  getAllUsers()
    .then((res) => {
      data.splice(0, data.length, ...res.data.data);
    })
    .catch((err) => console.log(err));
}

const filteredData = computed(() => {
  const dataSearch = search.value.toLowerCase();
  return data.filter((car) => car.nama.toLowerCase().includes(dataSearch) || car.alamat.toLowerCase().includes(dataSearch) || car.nomor_telepon.toLowerCase().includes(dataSearch) || car.nomor_sim.toLowerCase().includes(dataSearch));
});

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="w-full rounded-2xl bg-white shadow">
    <div class="flex p-5 justify-between">
      <h1 class="text-xl font-bold">User List</h1>
      <form class="flex w-72">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <input
            v-model="search"
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="Search user"
            required
          />
        </div>
      </form>
    </div>
    <hr />

    <div class="relative overflow-x-auto p-5">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Alamat</th>
            <th scope="col" class="px-6 py-3">Nomor SIM</th>
            <th scope="col" class="px-6 py-3">Nomor Telepon</th>
            <th scope="col" class="px-6 py-3">Terdaftar Pada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="item.id" class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ parseInt(index, 10) + 1 }}
            </th>
            <td class="px-6 py-4">
              {{ item.nama }}
            </td>
            <td class="px-6 py-4">
              {{ item.alamat ?? 'Belum Dikembalikan' }}
            </td>
            <td class="px-6 py-4">
              {{ item.nomor_sim }}
            </td>
            <td class="px-6 py-4">
              {{ item.nomor_telepon }}
            </td>
            <td class="px-6 py-4">
              {{ item.created_at }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
