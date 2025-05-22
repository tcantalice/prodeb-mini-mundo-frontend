export interface TarefaViewModel {
  id: string;
  descricao: string;
  status: 'pendente' | 'em-andamento' | 'concluido';
  dataInicio: string | null;
  dateFim: string | null;
  criador: string;
  dataCriacao: string;
}

export default interface ListagemTarefasView {
  enableLoading(): void;

  disableLoading(): void;

  setTarefasList(list: TarefaViewModel[]): void;

  showError(message: string): void;
}
