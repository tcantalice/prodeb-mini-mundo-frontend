import type TarefaViewModel from "../models/TarefaViewModel";

export default interface GerenciamentoTarefaView {
  updateTarefa(tarefa: TarefaViewModel): void;

  showSuccess(message: string): void;

  showError(error: string): void;

  showLoading(): void;

  hideLoading(): void;
}
