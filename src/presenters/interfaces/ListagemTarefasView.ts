import type { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";

export interface TarefaViewModel {
  id: string;
  descricao: string;
  status: StatusTarefaEnum;
  dataInicio: string | null;
  dateFim: string | null;
  criador: string;
  dataCriacao: string;
}

export default interface ListagemTarefasView {
  enableLoading(): void;

  disableLoading(): void;

  setTarefasList(list: TarefaViewModel[]): void;
}
