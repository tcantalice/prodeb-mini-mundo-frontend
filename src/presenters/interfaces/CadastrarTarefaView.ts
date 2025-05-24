export default interface CadastrarTarefaView {
  showError(message: string): void;

  showSuccess(message: string): void;

  enableLoading(): void;

  disableLoading(): void;
}
