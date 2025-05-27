import type { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";

export interface TarefaViewModel {
  id: string;
  descricao: string;
  status: StatusTarefaEnum;
  dataInicio: string | null;
  dataFim: string | null;
}

export default interface GerenciamentoTarefaView {
  updateTarefa(tarefa: TarefaViewModel): void;

  showSuccess(message: string): void;

  showError(error: string): void;

  enableLoading(): void;

  disableLoading(): void;
}
