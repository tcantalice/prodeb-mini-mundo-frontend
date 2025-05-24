<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['onConfirmCreation']);

const isCreating = ref<boolean>(false);
</script>

<template>
  <section>
    <div v-if="isCreating" class="p-2">
      <input class="w-full" type="text" @blur="() => isCreating = false" @keypress.enter="$emit('onConfirmCreation')" :autofocus="true"/>
    </div>
    <div @click="() => isCreating = true" class="bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-b-md border border-gray-200">
      <span class="font-bold">Adicionar +</span>
    </div>
  </section>
</template>
