<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type TarefaViewModel from '@/presenters/models/TarefaViewModel';

import ListaTarefaController from '../controllers/ListaTarefaController';
import FooterListaTarefa from './FooterListaTarefa.vue';
import HeaderListaTarefa from './HeaderListaTarefa.vue';
import ItemListaTarefa from './ItemListaTarefa.vue';


const props = defineProps<{ controller: ListaTarefaController }>();
const controller: ListaTarefaController = props.controller;

const tarefas = ref<Record<string, TarefaViewModel>>({});

controller.setView({
  disableLoading: () => {},
  enableLoading: () => {},
  setTarefasList: (list: TarefaViewModel[]) => {
    tarefas.value = list.map((tarefa: TarefaViewModel) =>{
      return ({
        id: tarefa.id,
        descricao: tarefa.descricao,
        status: tarefa.status,
        dataInicio: tarefa.dataInicio,
        dataFim: tarefa.dateFim
      });
    });
  },
  showError: (message: string) => {},
  showSuccess: (message: string) => {},
});

onMounted(async () => {
  await controller.onLoad();
});
</script>

<template>
  <section>
    <HeaderListaTarefa />
    <section id="lista-tarefa-body">
      <ItemListaTarefa :key="tarefa.id" v-for="(tarefa, i) in tarefas" v-model:tarefa="tarefas[i]"/>
    </section>
    <FooterListaTarefa
      @on-confirm-creation="(descricao: string) => controller.cadastrar(descricao)"/>
  </section>
</template>
