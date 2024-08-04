<script setup>
import { reactive } from 'vue';
import { createCar } from '../../../services';

const props = defineProps({
  getData: Function,
});
const dataInput = reactive({
  merek: '',
  model: '',
  nomor_plat: '',
  tarif_per_hari: '',
});

function resetData() {
  dataInput.merek = '';
  dataInput.model = '';
  dataInput.nomor_plat = '';
  dataInput.tarif_per_hari = '';
}

function createMobil() {
  createCar(dataInput)
    .then((res) => {
      resetData();
      props.getData()
    })
    .catch((err) => console.log(err), resetData());
}
</script>

<template>
  <dialog id="modal_input" class="modal">
    <div class="modal-box flex flex-col gap-5">
      <div class="flex justify-between">
        <h3 class="text-lg font-bold">Input Data</h3>
        <form method="dialog">
          <button class="hover:bg-blue-50 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24">
              <title>close</title>
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </form>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div>
          <label for="merek">Merek Mobil</label>
          <select v-model="dataInput.merek" id="merek" class="select select-bordered select-sm w-full">
            <option selected>Daihatsu</option>
            <option>Chevrolet</option>
            <option>Datsun</option>
            <option>Jeep</option>
            <option>Toyota</option>
            <option>Nissan</option>
          </select>
        </div>
        <div>
          <label for="model">Model Mobil</label>
          <select v-model="dataInput.model" id="model" class="select select-bordered select-sm w-full">
            <option selected>Sedan</option>
            <option>Sport</option>
            <option>Offroad</option>
            <option>Family</option>
          </select>
        </div>
        <div class="col-span-2">
          <label for="plat">Nomor Plat Mobil</label>
          <input v-model="dataInput.nomor_plat" id="plat" type="text" placeholder="Type here" class="input input-bordered input-sm w-full" />
        </div>
        <div class="col-span-2">
          <label for="tarif">Tarif Sewa Perhari</label>
          <input v-model="dataInput.tarif_per_hari" id="tarif" type="number" placeholder="Type here" class="input input-bordered input-sm w-full" />
        </div>
      </div>
      <div class="flex justify-end gap-5">
        <form method="dialog">
          <button class="w-20 h-9 text-gray-900 font-medium rounded-lg border border-gray-900 hover:bg-blue-100">Cancel</button>
        </form>
        <form method="dialog">
          <button @click="createMobil" class="w-20 h-9 text-white font-medium rounded-lg bg-blue-800 hover:bg-blue-900">Submit</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
