<script setup lang="ts">
import { StatusTarefaEnum } from '@/domain/tarefa/StatusTarefaEnum';
import { defineModel } from 'vue';

export type ItemTarefaViewModel = {
  id: string,
  descricao: string,
  dataInicio: string | null,
  dataFim: string | null,
  status: StatusTarefaEnum,
};

const tarefa = defineModel<ItemTarefaViewModel>('tarefa', { required: true });

const resolveStatusStyle = (status: StatusTarefaEnum) => {
  return ({
    [StatusTarefaEnum.EmAndamento]: ['bg-amber-400', 'text-neutral-600'],
    [StatusTarefaEnum.Concluido]: ['bg-emerald-700', 'text-neutral-100'],
    [StatusTarefaEnum.Pendente]: ['bg-gray-300', 'text-netral-600']
  } as { [status in StatusTarefaEnum]: string[] })[status];
};
</script>

<template>
  <div class="flex">
    <div class="flex-0 p-2"><input type="checkbox" class="w-5"/></div>
    <div class="flex-3 p-2 truncate">
      <span class="text-neutral-700">{{ tarefa.descricao }}</span>
    </div>
    <div class="text-center flex-1 p-2" :class="resolveStatusStyle(tarefa.status)">
      <span>{{ tarefa.status }}</span>
    </div>
    <div class="text-center flex-1 p-2">
      <span class="text-neutral-700">{{ tarefa.dataInicio }}</span>
    </div>
    <div class="text-center flex-1 p-2">
      <span class="text-neutral-700">{{ tarefa.dataFim }}</span>
    </div>
  </div>
</template>
