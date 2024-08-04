<script setup></script>

<template>
  <dialog id="modal_delete" class="modal">
    <div class="modal-box w-3/12 max-w-5xl">
        <div class="flex justify-between">
            <h3 class="text-lg font-bold">Delete Confirm!</h3>
            <form method="dialog">
                <button class="hover:bg-blue-50 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                </button>
            </form>
            
        </div>
      <p class="py-4 text-center text-base">Are you sure to delete this data?</p>
      <div class="flex justify-center gap-5">
        <form method="dialog">
            <button class="w-20 h-9 text-white font-medium rounded-lg bg-red-600 hover:bg-red-700">
                Yes
            </button>
        </form>
        <form method="dialog">
            <button class="w-20 h-9 text-gray-900 font-medium rounded-lg border border-gray-900 hover:bg-blue-100">
                No
            </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
