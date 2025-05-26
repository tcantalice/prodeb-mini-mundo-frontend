export interface UpdateProjetoInput {
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
  criadoEm: string;
  criadoPor: {
    id: string;
    nome: string;
  };
}

export default interface GerenciamentoProjetoView {
  enableLoading(): void;

  disableLoading(): void;

  showValidationError(field: string, message: string): void;

  bindProjeto(projeto: ProjetoViewModel): void;
}
