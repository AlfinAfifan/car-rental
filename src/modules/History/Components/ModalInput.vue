<script setup>
import { reactive } from 'vue';
import { createRental } from '../../../services';
import Swal from 'sweetalert2';

const props = defineProps({
  nomorPlat: String,
});

const dataInput = reactive({
  nomor_plat: '',
});

function showAlert(type) {
    if(type === "success") {
        Swal.fire({
            title: 'SUCCESS!',
            text: 'Rental mobil berhasil. Data peminjaman sudah disimpan',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    } else if (type === "error" ) {
        Swal.fire({
            title: 'GAGAL!',
            text: 'Mobil tidak tersedia pada tanggal tersebut',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}

function resetData() {
  dataInput.nomor_plat = '';
}

function handleSubmit() {
  dataInput.nomor_plat = props.nomorPlat
  createRental(dataInput)
    .then((res) => {
      resetData();
      showAlert('success');
    })
    .catch((err) => {
      console.log(err);
      resetData();
      showAlert("error")
    });
}
</script>

<template>
  <dialog id="modal_input" class="modal">
    <div class="modal-box flex flex-col gap-5">
      <div class="flex justify-between">
        <h3 class="text-lg font-bold">Sewa Mobil</h3>
        <form method="dialog">
          <button class="hover:bg-blue-50 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24">
              <title>close</title>
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </form>
      </div>
        <div>
          <label for="mulai">Nomor Plat Mobil</label>
          <input v-model="dataInput.nomor_plat" id="mulai" type="text" placeholder="Type here" class="input input-bordered w-full" />
        </div>
      <div class="flex mt-5 justify-end gap-5">
        <form method="dialog">
          <button class="w-20 h-9 text-gray-900 font-medium rounded-lg border border-gray-900 hover:bg-blue-100">Cancel</button>
        </form>
        <form method="dialog">
          <button @click="handleSubmit" class="w-20 h-9 text-white font-medium rounded-lg bg-blue-800 hover:bg-blue-900">Submit</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
