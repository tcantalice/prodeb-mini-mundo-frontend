import api from "@/connectors/api";
import type ListagemTarefasView from "./interfaces/ListagemTarefasView";
import type { Axios } from "axios";
import type { TarefaViewModel } from "./interfaces/ListagemTarefasView";
import { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";

export default class ListagemTarefaPresenter {
  private readonly api: Axios;
  private view?: ListagemTarefasView;

  constructor(
    private readonly projetoId: string,
  ) {
    this.api = api;
  }

  public setView(view: ListagemTarefasView) {
    this.view = view;
  }

  public async onLoad(): Promise<void> {
    if (!this.view) return;

    this.view.enableLoading();

    try {
      const { data: { data }} = await this.api.get(`/projetos/${this.projetoId}/tarefas`);

      this.view.setTarefasList(data.map((tarefa: any) => ({
        id: tarefa.id,
        descricao: tarefa.descricao,
        status: tarefa.dataFim
          ? StatusTarefaEnum.Concluido
          : (tarefa.dataInicio ? StatusTarefaEnum.EmAndamento : StatusTarefaEnum.Pendente),
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
