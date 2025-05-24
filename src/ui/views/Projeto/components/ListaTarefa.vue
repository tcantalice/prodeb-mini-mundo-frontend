<script setup lang="ts">
import type ListagemTarefaPresenter from '@/presenters/ListagemTarefaPresenter';
import HeaderListaTarefa from './HeaderListaTarefa.vue';
import ItemListaTarefa from './ItemListaTarefa.vue';
import { onMounted, ref } from 'vue';
import type { TarefaViewModel } from '@/presenters/interfaces/ListagemTarefasView';
import type ListagemTarefasView from '@/presenters/interfaces/ListagemTarefasView';
import FooterListaTarefa from './FooterListaTarefa.vue';

const props = defineProps<{ presenter: ListagemTarefaPresenter }>();
const presenter: ListagemTarefaPresenter = props.presenter;

const tarefas = ref<any>([]);

const listaTarefaView: ListagemTarefasView = {
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
};

presenter.setView(listaTarefaView);


onMounted(async () => {
  presenter.onLoad();
});
</script>

<template>
  <section>
    <HeaderListaTarefa />
    <section id="lista-tarefa-body">
      <ItemListaTarefa :key="tarefa.id" v-for="(tarefa, i) in tarefas" v-model:tarefa="tarefas[i]"/>
    </section>
    <FooterListaTarefa @on-confirm-creation="() => console.log('Tarefa criada!')"/>
  </section>
</template>
