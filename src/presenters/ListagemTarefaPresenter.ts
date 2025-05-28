import api from "@/connectors/api";
import type { Axios } from "axios";
import { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";
import type TarefaViewModel from "./models/TarefaViewModel";
import type ListagemTarefaView from "./interfaces/ListagemTarefaView";

export default class ListagemTarefaPresenter {
  private readonly api: Axios;
  private view!: ListagemTarefaView;

  constructor(private readonly projetoId: string) {
    this.api = api;
  }

  /**
   *
   * @deprecated
   */
  public setView(view: ListagemTarefaView) {
    this.bindView(view);
  }

  public bindView(view: ListagemTarefaView) {
    this.view = view;
  }

  public async onLoad(): Promise<void> {
    if (!this.view) return;

    this.view.showLoading();

    try {
      const { data: { data }} = await this.api.get(`/projetos/${this.projetoId}/tarefas`);

      this.view.setTarefas(data.map((tarefa: any) => ({
        id: tarefa.id,
        descricao: tarefa.descricao,
        status: tarefa.dataFim
          ? StatusTarefaEnum.Concluido
          : (tarefa.dataInicio ? StatusTarefaEnum.EmAndamento : StatusTarefaEnum.Pendente),
        criadoPor: tarefa.criador,
        criadoEm: '',
        dataInicio: null,
        dataFim: null,
      }) as TarefaViewModel) as TarefaViewModel[]);
    } catch(e) {
      console.error('Ocorreu um erro ao tentar obter as tarefas do projeto', e);
    } finally {
      this.view.hideLoading();
    }
  }
}
