<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

defineEmits(['onConfirmCreation']);

const isCreating = ref<boolean>(false);

const descricaoField = ref<HTMLInputElement>();
const descricao = ref<string | null>(null);

watch(isCreating, async (field) => {
  if (field) {
    await nextTick();
    descricaoField.value?.focus();
  }
});

const onLeaveDescricaoField = () => {
  isCreating.value = false;
  descricao.value = null;
}
</script>

<template>
  <section>
    <div v-if="isCreating" class="p-2">
      <input
        ref="descricaoField"
        v-model="descricao"
        class="w-full focus:outline-0 focus:p-1"
        type="text"
        @blur="onLeaveDescricaoField"
        @keypress.enter="$emit('onConfirmCreation', descricao)" />
    </div>
    <div
      @click="() => isCreating = true"
      class="bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-b-md border border-gray-200">
      <span class="font-bold">Adicionar +</span>
    </div>
  </section>
</template>
