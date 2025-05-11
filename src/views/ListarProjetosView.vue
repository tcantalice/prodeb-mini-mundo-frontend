<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Projetos</h1>

    <div v-if="carregando" class="text-gray-500">Carregando...</div>
    <div v-else-if="erro" class="text-red-500">Erro ao carregar projetos.</div>
    <div v-else>
      <div v-if="projetos.length === 0" class="text-gray-400">Nenhum projeto encontrado.</div>

      <div class="grid gap-4">
        <div
          v-for="projeto in projetos"
          :key="projeto.id"
          class="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition"
        >
          <h2 class="text-lg font-semibold text-indigo-600">{{ projeto.nome }}</h2>
          <p class="text-sm text-gray-700">Criado por: <span class="font-medium">{{ projeto.criadoPor }}</span></p>
          <p class="text-sm text-gray-500">Data de criação: {{ formatarData(projeto.criadoEm) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import api from '@/connectors/api';
import Projeto from '@/models/projeto';

const projetos = ref([]);
const carregando = ref(true);
const erro = ref(false);

const carregarProjetos = async () => {
  try {
    const { data: { data } } = await api.get('/projetos');

    if (!data || data.length === 0) {
      erro.value = true;
      return;
    }

    projetos.value = data.map((projeto, index) => new Projeto(
        projeto.id,
        projeto.nome,
        null,
        null,
        new Date(projeto.criado_em),
        projeto.criado_por.nome
      ));

  } catch (e) {
    console.error('Erro ao carregar projetos:', e);
    erro.value = true;
  } finally {
    carregando.value = false;
  }
}

const formatarData = (dataISO) => {
  const data = new Date(dataISO)
  return data.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  carregarProjetos()
})
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
