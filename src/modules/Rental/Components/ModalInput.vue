<script setup>
import { reactive } from 'vue';
import { createRental } from '../../../services';

const props = defineProps({
  optionPlat: Array,
  showAlert: Function,
  getData: Function
});

const dataInput = reactive({
  nomor_plat: '',
  start_date: '',
  end_date: '',
});

function resetData() {
  dataInput.nomor_plat = '';
  dataInput.start_date = '';
  dataInput.end_date = '';
}

function createMobil() {
  createRental(dataInput)
    .then((res) => {
      resetData();
      props.showAlert('success');
      props.getData()
    })
    .catch((err) => {
      console.log(err);
      resetData();
      props.showAlert("error")
    });
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
        <div class="col-span-2">
          <label for="plat">Nomor Plat Mobil</label>
          <select v-model="dataInput.nomor_plat" id="plat" class="select select-bordered select-sm w-full">
            <option v-for="option in optionPlat" :value="option.nomor_plat">{{ option.nomor_plat }}</option>
          </select>
        </div>
        <div>
          <label for="mulai">Tanggal Mulai</label>
          <input v-model="dataInput.start_date" id="mulai" type="date" placeholder="Type here" class="input input-bordered input-sm w-full" />
        </div>
        <div>
          <label for="end">Tanggal Pengembalian</label>
          <input v-model="dataInput.end_date" id="end" type="date" placeholder="Type here" class="input input-bordered input-sm w-full" />
        </div>
      </div>
      <div class="flex mt-5 justify-end gap-5">
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
