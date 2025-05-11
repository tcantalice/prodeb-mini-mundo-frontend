<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/connectors/api';

const router = useRouter();

const nome = ref<string>('');
const descricao = ref<string>('');
const orcamento = ref<number | null>(null);
const erro = ref<string | null>(null);
const carregando = ref(false);

const salvarProjeto = async () => {
  erro.value = null;
  carregando.value = true;

  try {
    const payload = {
      nome: nome.value,
      descricao: descricao.value || null,
      orcamento: orcamento.value !== null ? Number(orcamento.value) : null
    };

    const response = await api.post('/projetos', payload);

    if (response.status === 201) {
      router.back();;
    } else {
      erro.value = 'Erro ao cadastrar projeto.';
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
    <h1 class="text-2xl font-bold mb-6">Novo Projeto</h1>

    <form @submit.prevent="salvarProjeto" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nome *</label>
        <input
          type="text"
          v-model="nome"
          required
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          v-model="descricao"
          rows="3"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Orçamento (R$)</label>
        <input
          type="number"
          min="0"
          v-model="orcamento"
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div class="flex justify-between items-center mt-6">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          :disabled="carregando"
        >
          {{ carregando ? 'Salvando...' : 'Salvar' }}
        </button>
        <router-link to="/" class="text-sm text-gray-600 hover:underline">Cancelar</router-link>
      </div>

      <div v-if="erro" class="text-red-500 text-sm mt-2">{{ erro }}</div>
    </form>
  </div>
</template>
