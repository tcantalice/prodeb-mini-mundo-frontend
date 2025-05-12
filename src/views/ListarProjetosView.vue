<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Lista de Projetos</h1>
      <button
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        @click="router.push('/projetos/novo')"
      >
        Novo Projeto
      </button>
    </div>

    <div v-if="carregando" class="text-gray-500">Carregando...</div>
    <div v-else-if="erro" class="text-red-500">Erro ao carregar projetos.</div>
    <div v-else>
      <div v-if="projetos.length === 0" class="text-gray-400">Nenhum projeto encontrado.</div>

      <div class="grid gap-4">
        <div
          v-for="projeto in projetos"
          :key="projeto.id"
          @click="irParaDetalhes(projeto.id)"
          class="cursor-pointer bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition"
        >
          <h2 class="text-lg font-semibold text-indigo-600">{{ projeto.nome }}</h2>
          <p class="text-sm text-gray-700">Criado por: <span class="font-medium">{{ projeto.criadoPor }}</span></p>
          <p class="text-sm text-gray-500">Data de criação: {{ formatarData(projeto.criadoEm) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';

import api from '@/connectors/api';
import type Projeto from '@/models/projeto';

const router = useRouter();

const projetos = ref<Projeto[]>([]);
const carregando = ref(true);
const erro = ref(false);

const carregarProjetos = async () => {
  try {
    const { data: { data } } = await api.get('/projetos');

    if (!data || data.length === 0) {
      erro.value = true;
      return;
    }

    projetos.value = data.map((projeto: any, index: number) => ({
      id: projeto.id,
      nome: projeto.nome,
      descricao: projeto.descricao || null,
      orcamento: projeto.orcamento !== null ? Number(projeto.orcamento) : null,
      ativo: projeto.ativo !== undefined ? projeto.ativo : true,
      criadoEm: new Date(projeto.criado_em),
      criadoPor: projeto.criado_por.nome
    } as Projeto));

  } catch (e) {
    console.error('Erro ao carregar projetos:', e);
    erro.value = true;
  } finally {
    carregando.value = false;
  }
}


const irParaDetalhes = (id: string) => {
  router.push({ name: 'visualizar-projeto', params: { id } })
}

const formatarData = (dataISO: string | Date) => {
  const data = new Date(dataISO);

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
