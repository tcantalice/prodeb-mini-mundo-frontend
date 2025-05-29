import api from "@/connectors/api";
import type GerenciamentoTarefaView from "./interfaces/GerenciamentoTarefaView";
import type { Axios } from "axios";
import { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";

export default class GerenciamentoTarefaPresenter {
  private view!: GerenciamentoTarefaView;
  private readonly api: Axios; // TODO: Alterar para serviço de tarefa

  constructor() {
    this.api = api;
  }

  public bindView(view: GerenciamentoTarefaView) {
    this.view = view;
  }

  public async alterarStatus(idTarefa: string): Promise<void> {
    if (!this.view) return;

    this.view.showLoading(idTarefa);

    try {
      const { data: { data } } = await this.api.patch(`/tarefas/${idTarefa}/status`);

      this.view.updateTarefa({
        id: data.id,
        descricao: data.descricao,
        status: data.finalizada_em
          ? StatusTarefaEnum.Concluido
          : (data.iniciada_em ? StatusTarefaEnum.EmAndamento : StatusTarefaEnum.Pendente),
        dataFim: data.finalizada_em,
        dataInicio: data.iniciada_em,
        criadoEm: '',
        criadoPor: ''
      });
    } catch(e) {
      console.error(e);
      this.view.showError('Ocorreu um erro atualizar o status da tarefa');
    } finally {
      this.view.hideLoading(idTarefa);
    }
  }
}
