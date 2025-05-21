export interface UpdateProjetoData {
  nome: string;
  descricao: string | null;
  orcamento: number | null;
  ativo: boolean;
}

export interface ProjetoViewModel {
  id: string;
  nome: string;
  descricao: string | null;
  orcamento: number | null;
  ativo: boolean;
}

export default interface GerenciamentoProjetoView {
  enableLoading(): void;

  disableLoading(): void;

  showSuccess(message: string): void;

  showError(message: string): void;

  showWarning(message: string): void;

  showFieldError(field: string, message: string): void;

  fillFields(projeto: ProjetoViewModel): void;
}
