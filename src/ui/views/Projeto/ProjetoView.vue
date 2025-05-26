<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import GerenciamentoProjetoPresenter from '@/presenters/GerenciamentoProjetoPresenter';
import ListaTarefa from './components/ListaTarefa.vue';
import ListaTarefaController from './controllers/ListaTarefaController';
import DetalheProjeto from './components/DetalheProjeto.vue';

const route = useRoute();

const loadingProjeto = ref<boolean>(false);
const carregando = ref(false);
const erro = ref(false);
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <aside class="p-2">

    </aside>
    <main class="p-6 col-span-4">
      <div v-if="carregando" class="text-gray-500">Carregando...</div>
      <div v-else-if="erro" class="text-red-500">Erro ao carregar os detalhes do projeto.</div>
      <section v-else class="h-full">
        <div class="mb-5">
          <DetalheProjeto
            v-model:carregando="loadingProjeto"
            :presenter="new GerenciamentoProjetoPresenter(route.params.id as string)"/>
        </div>
        <div class="">
          <ListaTarefa
            :controller="new ListaTarefaController(route.params.id as string)" />
        </div>
      </section>
    </main>
  </div>
</template>
