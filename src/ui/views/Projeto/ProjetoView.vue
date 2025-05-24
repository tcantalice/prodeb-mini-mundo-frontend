<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter, type HistoryState } from 'vue-router';
import GerenciamentoProjetoPresenter from '@/presenters/GerenciamentoProjetoPresenter';
import type { ProjetoViewModel } from '@/presenters/interfaces/GerenciamentoProjetoView';
import ListaTarefa from './components/ListaTarefa.vue';
import ListaTarefaController from './controllers/ListaTarefaController';

const route = useRoute();
const router = useRouter();

const loadingProjeto = ref<boolean>(false);
const loadingTarefas = ref<boolean>(false);
const carregando = ref(loadingProjeto || loadingTarefas);
const erro = ref(false);

const projeto = ref<ProjetoViewModel | null>(null);

const gerenciamentoProjetoPresenter = new GerenciamentoProjetoPresenter({
  showSuccess: (message: string) => {},
  showError: (message: string) => {},
  showWarning: (message: string) => {},
  disableLoading: () => loadingProjeto.value = false,
  enableLoading: () => loadingProjeto.value = true,
  fillFields: (projetoModel: ProjetoViewModel) => projeto.value = projetoModel,
  showFieldError: (field: string, message: string) => {}
});

const listaTarefaController: ListaTarefaController = new ListaTarefaController(route.params.id as string);

onMounted(() => {
  gerenciamentoProjetoPresenter.onLoad(route.params.id as string);
});
</script>

<template>
  <div class="p-6 h-screen">
    <div v-if="carregando" class="text-gray-500">Carregando...</div>
    <div v-else-if="erro" class="text-red-500">Erro ao carregar os detalhes do projeto.</div>
    <div v-else-if="!projeto" class="text-gray-400">Projeto não encontrado.</div>
    <section v-else class=" bg-white rounded-xl shadow p-6 border border-gray-200 space-y-3">
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
        <span class="font-medium">Criado por: </span> {{ projeto.criadoPor.nome }}
      </p>
      <p class="text-gray-600">
        <span class="font-medium">Data de criação: </span> {{ projeto.criadoEm }}
      </p>
    </section>
    <section id="tasks-container" class="mt-96 shadow">
      <ListaTarefa :controller="listaTarefaController" />
    </section>
  </div>
</template>
