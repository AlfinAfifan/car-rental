<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import ModalDelete from "../../../utils/Modal/ModalDelete.vue"
import ModalInput from "../Components/ModalInput.vue"
import { getCar } from "../../../services";

const data = reactive([])
const search = ref('')

function getData() {
  getCar()
    .then(res => data.splice(0, data.length, ...res.data))
    .catch(err => console.log(err));
}


function formattedCurrencyValue(money) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(money);
}

const filteredCars = computed(() => {
  const dataSearch = search.value.toLowerCase();
  return data.filter(car => 
    car.merek.toLowerCase().includes(dataSearch) ||
    car.model.toLowerCase().includes(dataSearch) ||
    car.nomor_plat.toLowerCase().includes(dataSearch)
  );
});


onMounted (()=> {
    getData()
})
</script>

<template>
    <div class="w-full rounded-2xl bg-white shadow">
        <h1 class="text-xl font-bold p-5">Car List</h1>
        <hr>
        <div class="flex w-full justify-between p-5">
            <button onclick="modal_input.showModal()" type="button" class="flex gap-2 text-white bg-blue-900 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="currentColor" viewBox="0 0 24 24"><title>plus-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" /></svg>
                Add
            </button>
            <form class="flex items-center">   
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex text-gray-500 items-center ps-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24"><title>car-search-outline</title><path d="M10.29 19H6V20C6 20.5 5.6 21 5 21H4C3.5 21 3 20.5 3 20V12L5.1 6C5.3 5.4 5.8 5 6.5 5H17.5C18.1 5 18.7 5.4 18.9 6L20.91 11.74C20.17 10.93 19.24 10.31 18.18 9.95L17.1 7H6.8L5.8 10H13.91C12.79 10.4 11.81 11.1 11.08 12H5V17H9.68C9.78 17.71 10 18.38 10.29 19M6 14.5C6 15.3 6.7 16 7.5 16S9 15.3 9 14.5 8.3 13 7.5 13 6 13.7 6 14.5M16.11 11.61C13.61 11.61 11.61 13.61 11.61 16.11S13.61 20.61 16.11 20.61C17 20.61 17.8 20.36 18.5 19.93L21.61 23L23 21.61L19.92 18.5C20.36 17.82 20.61 17 20.61 16.11C20.61 13.61 18.61 11.61 16.11 11.61M16.11 13.61C17.5 13.61 18.61 14.73 18.61 16.11S17.5 18.61 16.11 18.61 13.61 17.5 13.61 16.11 14.73 13.61 16.11 13.61" /></svg>
                    </div>
                    <input v-model="search" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 " placeholder="Search car" required />
                </div>
            </form>
        </div>

        <div class="relative overflow-x-auto p-5">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Merek
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Model
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nomor Plat
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tarif / hari
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredCars" :key="item.id" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ parseInt(index, 10) + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.merek }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.model }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.nomor_plat }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formattedCurrencyValue(item.tarif_per_hari) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <ModalDelete/>
    <ModalInput :getData="getData"/>
</template>