import type TarefaViewModel from "../models/TarefaViewModel";

export default interface GerenciamentoTarefaView {
  updateTarefa(tarefa: TarefaViewModel): void;

  showSuccess(message: string): void;

  showError(error: string): void;

  showLoading(idTarefa: string): void;

  hideLoading(idTarefa: string): void;
}
