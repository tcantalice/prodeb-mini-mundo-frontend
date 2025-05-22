import api from "@/connectors/api";
import type ListagemTarefasView from "./interfaces/ListagemTarefasView";
import type { Axios } from "axios";
import type { TarefaViewModel } from "./interfaces/ListagemTarefasView";

export default class ListagemTarefaPresenter {
  private readonly api: Axios;

  constructor(private readonly view: ListagemTarefasView) {
    this.api = api;
  }

  public async onLoad(projetoId: string): Promise<void> {
    this.view.enableLoading();

    try {
      const { data: { data }} = await this.api.get(`/projetos/${projetoId}/tarefas`);

      this.view.setTarefasList(data.map((tarefa) => ({
        id: tarefa.id,
        descricao: tarefa.descricao,
        status: tarefa.dataFim ? 'concluido' : (tarefa.dataInicio ? 'em-andamento' : 'pendente'),
        criador: tarefa.criador,
        dataCriacao: '',
        dataInicio: null,
        dateFim: null,
      }) as TarefaViewModel) as TarefaViewModel[]);
    } catch(e) {
      this.view.showError('Projeto não encontrado');
    } finally {
      this.view.disableLoading();
    }
  }
}
