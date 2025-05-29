<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type TarefaViewModel from '@/presenters/models/TarefaViewModel';

import ListaTarefaController from '../controllers/ListaTarefaController';
import FooterListaTarefa from './FooterListaTarefa.vue';
import HeaderListaTarefa from './HeaderListaTarefa.vue';
import ItemListaTarefa, { type ItemTarefaViewModel} from './ItemListaTarefa.vue';

const props = defineProps<{ controller: ListaTarefaController }>();
const controller: ListaTarefaController = props.controller;

const tarefas = ref<Record<string, ItemTarefaViewModel & { atualizando: boolean }>>({});

controller.bindCreateView({
  hideLoading() {},
  showError(error: string) {},
  showLoading() {},
  showSuccess(message: string) {}
});

controller.bindListView({
  hideLoading() {},
  showLoading() {},
  setTarefas(list: TarefaViewModel[]) {
    tarefas.value = list.reduce((crr, tarefa: TarefaViewModel) => {
      crr[tarefa.id] = {...tarefa, atualizando: false };

      return crr;
    }, {} as (typeof tarefas.value));
  }
});

controller.bindManageView({
  hideLoading(idTarefa: string) {},
  showLoading(idTarefa: string) {},
  showError(error: string) {},
  showSuccess(message: string) {},
  updateTarefa(tarefa: TarefaViewModel) {
    tarefas.value[tarefa.id] = {
      ...tarefa,
      atualizando: tarefas.value[tarefa.id].atualizando
    };
  }
});

onMounted(async () => {
  await controller.onLoad();
});
</script>

<template>
  <section>
    <HeaderListaTarefa />
    <section id="lista-tarefa-body">
      <ItemListaTarefa
        v-for="(tarefa, i) in tarefas"
        :key="tarefa.id"
        :atualizando="tarefa.atualizando"
        v-model:tarefa="tarefas[i]"/>
    </section>
    <FooterListaTarefa
      @on-confirm-creation="(descricao: string) => controller.cadastrar(descricao)"/>
  </section>
</template>
