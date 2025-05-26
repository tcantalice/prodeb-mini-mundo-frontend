<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GerenciamentoProjetoPresenter from '@/presenters/GerenciamentoProjetoPresenter';
import type GerenciamentoProjetoView from '@/presenters/interfaces/GerenciamentoProjetoView';
import type { ProjetoViewModel } from '@/presenters/interfaces/GerenciamentoProjetoView';

const route = useRoute();

const nome = ref('');
const descricao = ref<string | null>('');
const orcamento = ref<number | null>(null);
const ativo = ref<boolean>(false);
const erro = ref<string | null>(null);
const carregando = ref(false);


const view: GerenciamentoProjetoView = {
  enableLoading: () => carregando.value = true,
  disableLoading: () => carregando.value = false,
  showError: (message: string) => erro.value = message,
  showSuccess: (message: string) => console.log(message),
  showFieldError: (field: string, message: string) => {},
  showWarning: (message: string) => console.log(message),
  fillFields: (model: ProjetoViewModel) => {
    nome.value = model.nome;
    descricao.value = model.descricao;
    ativo.value = model.ativo;
    orcamento.value = model.orcamento;
  }
};

const presenter: GerenciamentoProjetoPresenter = new GerenciamentoProjetoPresenter(view);

onMounted(async () => {
  await presenter.onLoad(route.params.id as string);
});

const salvarProjeto = async () => {
  presenter.editarProjeto(route.params.id as string, {
    nome: nome.value,
    descricao: descricao.value,
    orcamento: orcamento.value !== null ? Number(orcamento.value) : null,
    ativo: ativo.value
  });
};
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Editar Projeto</h1>

    <form @submit.prevent="salvarProjeto" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nome *</label>
        <input
          type="text"
          v-model="nome"
          required
          :disabled="carregando"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          v-model="descricao"
          rows="3"
          :disabled="carregando"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Orçamento (R$)</label>
        <input
          type="number"
          min="0"
          :disabled="carregando"
          v-model="orcamento"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div class="flex items-center">
        <input
          id="ativo"
          type="checkbox"
          v-model="ativo"
          :disabled="carregando"
          class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="ativo" class="ml-2 block text-sm text-gray-700">Ativo</label>
      </div>

      <div class="flex justify-between items-center mt-6">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          :disabled="carregando"
        >
          {{ carregando ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
        <router-link :to="{ name: 'visualizar-projeto', params: { id: route.params.id } }" class="text-sm text-gray-600 hover:underline">Cancelar</router-link>
      </div>

      <div v-if="erro" class="text-red-500 text-sm mt-2">{{ erro }}</div>
    </form>
  </div>
</template>
