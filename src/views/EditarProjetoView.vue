<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/connectors/api';
import type Projeto from '@/models/projeto';

const route = useRoute();
const router = useRouter();

const projeto = ref<Projeto>();
const nome = ref('');
const descricao = ref('');
const orcamento = ref<number | null>(null);
const ativo = ref(true);
const erro = ref<string | null>(null);
const carregando = ref(false);

onMounted(async () => {
  carregando.value = true;

  const projetoDoState = window.history.state?.projeto;

  if (projetoDoState) {
    projeto.value = projetoDoState;
  } else {
    const id = route.params.id;
    const { data: { data }} = await api.get(`/projetos/${id}`);
    projeto.value = {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao || null,
      orcamento: data.orcamento !== null ? Number(data.orcamento) : null,
      ativo: data.ativo,
      criadoEm: new Date(data.criado_em),
      criadoPor: data.criado_por.nome
    } as Projeto;
  }

  if (projeto.value) {
    nome.value = projeto.value.nome;
    descricao.value = projeto.value.descricao || '';
    orcamento.value = projeto.value.orcamento ?? null;
    ativo.value = projeto.value.ativo ?? true;
  }

  carregando.value = false;
});

const salvarProjeto = async () => {
  erro.value = null;
  carregando.value = true;

  try {
    const payload = {
      nome: nome.value,
      descricao: descricao.value || projeto.value!.descricao,
      orcamento: orcamento.value !== null ? Number(orcamento.value) : projeto.value!.orcamento,
      ativo: ativo.value
    };

    const response = await api.put(`/projetos/${route.params.id}`, payload);

    if (response.status === 200) {
      router.back();
    } else {
      erro.value = 'Erro ao atualizar projeto.';
    }
  } catch (e) {
    erro.value = 'Erro na comunicação com o servidor.';
  } finally {
    carregando.value = false;
  }
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
