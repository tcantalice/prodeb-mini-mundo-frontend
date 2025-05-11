<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/connectors/api';
import Projeto from '@/models/projeto';

const route = useRoute();
const projeto = ref<Projeto | null>(null);
const carregando = ref(true);
const erro = ref(false);

const carregarProjeto = async () => {
  try {
    const { data: { data } } = await api.get(`/projetos/${route.params.id}`);

    projeto.value = new Projeto(
      data.id,
      data.nome,
      data.descricao,
      data.orcamento,
      new Date(data.criado_em),
      data.criado_por.nome
    );
  } catch (e) {
    console.error('Erro ao carregar projeto:', e);
    erro.value = true
  } finally {
    carregando.value = false
  }
}

const formatarData = (dataISO: Date | string) => {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(carregarProjeto)
</script>

<template>
  <div class="p-6">

    <div v-if="carregando" class="text-gray-500">Carregando...</div>
    <div v-else-if="erro" class="text-red-500">Erro ao carregar os detalhes do projeto.</div>
    <div v-else-if="!projeto" class="text-gray-400">Projeto não encontrado.</div>
    <div v-else class="bg-white rounded-xl shadow p-6 border border-gray-200 space-y-3">
      <h2 class="text-xl font-semibold text-indigo-700">{{ projeto.nome }}</h2>
      <p class="text-gray-800">
        <span class="font-medium">Descrição: </span>
        <span>{{ projeto.descricao || 'Sem descrição' }}</span>
      </p>
      <p class="text-gray-800">
        <span class="font-medium">Orçamento: </span>
        <span>{{ projeto.orcamento ? `R$ ${projeto.orcamento.toLocaleString('pt-BR')}` : 'Não informado' }}</span>
      </p>
      <p class="text-gray-700">
        <span class="font-medium">Criado por: </span> {{ projeto.criadoPor }}
      </p>
      <p class="text-gray-600">
        <span class="font-medium">Data de criação: </span> {{ formatarData(projeto.criadoEm) }}
      </p>
    </div>
  </div>
</template>
