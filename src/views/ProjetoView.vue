<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter, type HistoryState } from 'vue-router';
import api from '@/connectors/api';
import type Projeto from '@/models/projeto';

const route = useRoute();
const router = useRouter();
const projeto = ref<Projeto | null>(null);
const carregando = ref(true);
const erro = ref(false);

const tarefas = ref<Array<{ id: string, descricao: string, status: string, criadoEm: string }>>([
  {
    id: '1289412412',
    descricao: 'Implementar cadastro de atividade',
    status: 'pendente',
    criadoEm: '20/05/2025'
  },
  {
    id: '1289412413',
    descricao: 'Implementar edição de atividade',
    status: 'em-andamento',
    criadoEm: '20/05/2025'
  }
]);

const carregarProjeto = async () => {
  try {
    const { data: { data } } = await api.get(`/projetos/${route.params.id}`);

    projeto.value = {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao || null,
      orcamento: data.orcamento !== null ? Number(data.orcamento) : null,
      ativo: data.ativo,
      criadoEm: new Date(data.criado_em),
      criadoPor: data.criado_por.nome
    } as Projeto;

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

const resolveStatusStyle = (status: string) => {
  return ({
    'pendente': ['bg-gray-400', 'text-white'],
    'em-andamento': ['bg-yellow-500', 'text-gray-900'],
    'concluido': ['bg-emerald-600', 'text-gray-900']
  })[status];
}

onMounted(carregarProjeto)
</script>

<template>
  <div class="p-6">

    <div v-if="carregando" class="text-gray-500">Carregando...</div>
    <div v-else-if="erro" class="text-red-500">Erro ao carregar os detalhes do projeto.</div>
    <div v-else-if="!projeto" class="text-gray-400">Projeto não encontrado.</div>
    <section v-else class="bg-white rounded-xl shadow p-6 border border-gray-200 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-indigo-700">{{ projeto.nome }}</h2>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          @click="router.push({ name: 'editar-projeto', params: { id: projeto.id }, state: { projeto: {
            id: projeto.id,
            nome: projeto.nome,
            descricao: projeto.descricao,
            ativo: projeto.ativo,
            orcamento: projeto.orcamento
          } as HistoryState } })"
        >Editar</button>
      </div>
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
    </section>
    <section id="tasks-container" class="mt-10 shadow">
      <div id="tasks-header" class="flex col-auto border border-gray-200 rounded-t-md bg-gray-100 text-sm">
        <div class="flex-4 p-2">Tarefa</div>
        <div class="flex-1 p-2">Criada Em</div>
        <div class="flex-1 p-2">Status</div>
        <div class="flex-1 p-2">Inicio</div>
        <div class="flex-1 p-2">Conclusão</div>
      </div>
      <div id="tasks-list" class="bg-white">
        <div
          :key="tarefa.id"
          v-for="tarefa in tarefas"
          :id="`task-item-${tarefa.id}`"
          class="flex border-x border-x-gray-200 cursor-pointer"
          >
          <div class="p-2 flex-4 border-r border-r-black/10 truncate">
            <span :title="tarefa.descricao">{{ tarefa.descricao }}</span>
          </div>
          <div class="p-2 flex-1 border-r border-r-black/10">
            <span>{{ tarefa.criadoEm }}</span>
          </div>
          <div class="cursor-pointer p-2 flex-1 border-r border-r-black/10" :class="[resolveStatusStyle(tarefa.status)]">
            <span>{{ tarefa.status }}</span>
          </div>
          <div class="p-2 flex-1 border-r border-r-black/10">
            <span>--</span>
          </div>
          <div class="p-2 flex-1">
            <span>--</span>
          </div>
        </div>
      </div>
      <div class="bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-b-md border border-gray-200">
        <span class="font-bold">Adicionar +</span>
      </div>
    </section>
  </div>
</template>
