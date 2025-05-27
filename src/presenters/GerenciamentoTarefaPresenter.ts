import api from "@/connectors/api";
import type GerenciamentoTarefaView from "./interfaces/GerenciamentoTarefaView";
import type { Axios } from "axios";

export default class GerenciamentoTarefaPresenter {
  private view?: GerenciamentoTarefaView;
  private readonly api: Axios; // TODO: Alterar para serviço de tarefa

  constructor() {
    this.api = api;
  }

  public bindView(view: GerenciamentoTarefaView) {
    this.view = view;
  }

  public async alterarStatus(id: string): Promise<void> {
    if (!this.view) return;

    this.view.enableLoading();

    try {
      const { data: { data }, status } = await this.api.patch(`/tarefas/${id}/status`);

      this.view.updateTarefa({
        id: data.id,
        descricao: data.descricao,
        status:
      });
    } catch(e) {
      console.error(e);
      this.view.showError('Ocorreu um erro atualizar o status da tarefa');
    } finally {
      this.view.disableLoading();
    }
  }
}
