<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref, defineModel } from 'vue';
import type GerenciamentoProjetoPresenter from '@/presenters/GerenciamentoProjetoPresenter';
import type { ProjetoViewModel } from '@/presenters/interfaces/GerenciamentoProjetoView';

const carregando = defineModel<boolean>('carregando', { required: true });

const props = defineProps<{ presenter: GerenciamentoProjetoPresenter }>();
const presenter = props.presenter;

const projeto = ref<{
  id: string,
  nome: string,
  descricao: string | null,
  orcamento: number | null,
  ativo: boolean
}>();

presenter.bindView({
  bindProjeto: (projetoViewModel: ProjetoViewModel) => {
    projeto.value = ({
      id: projetoViewModel.id,
      nome: projetoViewModel.nome,
      ativo: projetoViewModel.ativo,
      descricao: projetoViewModel.descricao,
      orcamento: projetoViewModel.orcamento,
    });
  },
  disableLoading: () => {
    carregando.value = false;
    console.log('Desabilitado loading')
  },
  enableLoading: () => carregando.value = true,
  showValidationError: (field: string, message: string) => {}
});

onMounted(async () => {
 presenter.onLoad();
});
</script>

<template>
  <div class="p-2">
    <div class="flex align-middle gap-2">
      <h1 class="text-4xl font-light">{{ projeto?.nome }}</h1>
      <span class="p-1 rounded-full cursor-pointer">
        <FontAwesomeIcon :icon="faInfoCircle" />
      </span>
    </div>
    <h2 class="text-neutral-400 italic">{{ projeto?.ativo ? 'Ativo' : 'Inativo' }}</h2>
    <p v-if="projeto?.descricao" class="w-full text-sm mt-2">{{ projeto.descricao }}</p>
  </div>
</template>
