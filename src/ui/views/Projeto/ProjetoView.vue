<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter, type HistoryState } from 'vue-router';
import GerenciamentoProjetoPresenter from '@/presenters/GerenciamentoProjetoPresenter';
import ListagemTarefaPresenter from '@/presenters/ListagemTarefaPresenter';
import type { ProjetoViewModel } from '@/presenters/interfaces/GerenciamentoProjetoView';
import type { TarefaViewModel } from '@/presenters/interfaces/ListagemTarefasView';

const route = useRoute();
const router = useRouter();

const loadingProjeto = ref<boolean>(false);
const loadingTarefas = ref<boolean>(false);
const carregando = ref(loadingProjeto || loadingTarefas);
const erro = ref(false);

const projeto = ref<ProjetoViewModel | null>(null);
const tarefas = ref<Array<TarefaViewModel>>([]);


const resolveStatusStyle = (status: string) => {
  return ({
    'pendente': ['bg-gray-400', 'text-white'],
    'em-andamento': ['bg-yellow-500', 'text-gray-900'],
    'concluido': ['bg-emerald-600', 'text-gray-900']
  })[status];
}

const gerenciamentoProjetoPresenter = new GerenciamentoProjetoPresenter({
  showSuccess: (message: string) => {},
  showError: (message: string) => {},
  showWarning: (message: string) => {},
  disableLoading: () => loadingProjeto.value = false,
  enableLoading: () => loadingProjeto.value = true,
  fillFields: (projetoModel: ProjetoViewModel) => projeto.value = projetoModel,
  showFieldError: (field: string, message: string) => {}
});

const listagemTarefaPresenter = new ListagemTarefaPresenter({
  disableLoading: () => loadingTarefas.value = false,
  enableLoading: () => loadingTarefas.value = true,
  setTarefasList: (list: TarefaViewModel[]) => tarefas.value = list,
  showError: (message: string) => erro.value = true,
});

onMounted(() => {
  gerenciamentoProjetoPresenter.onLoad(route.params.id as string),
  listagemTarefaPresenter.onLoad(route.params.id as string)
});
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
        <span class="font-medium">Criado por: </span> {{ projeto.criadoPor.nome }}
      </p>
      <p class="text-gray-600">
        <span class="font-medium">Data de criação: </span> {{ projeto.criadoEm }}
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
