export default interface CadastrarTarefaView {
  showError(error: string): void;

  showSuccess(message: string): void;

  showLoading(): void;

  hideLoading(): void;
}
