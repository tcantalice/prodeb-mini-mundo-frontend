<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const projeto = ref<{
  id: string,
  nome: string,
  descricao: string | null,
  orcamento: number | null,
  ativo: boolean
}>({
  id: '',
  nome: 'Título',
  descricao: null,
  orcamento: null,
  ativo: true
});
</script>

<template>
  <div class="p-2">
    <div class="flex align-middle gap-2">
      <h1 class="text-4xl font-light">{{ projeto.nome }}</h1>
      <span class="p-1 rounded-full cursor-pointer">
        <FontAwesomeIcon :icon="faInfoCircle" />
      </span>
    </div>
    <h2 class="text-neutral-400 italic">{{ projeto.ativo ? 'Ativo' : 'Inativo' }}</h2>
    <p v-if="projeto.descricao" class="w-full text-sm mt-2">{{ projeto.descricao }}</p>
  </div>
</template>
