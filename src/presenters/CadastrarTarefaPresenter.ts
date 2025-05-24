import api from "@/connectors/api";
import type { Axios } from "axios";
import type CadastrarTarefaView from "./interfaces/CadastrarTarefaView";

interface CadastrarTarefaInput {
  descricao: string;
}

export default class CadastrarTarefaPresenter {
  private readonly api: Axios;
  private view?: CadastrarTarefaView;

  public constructor(private readonly projetoId: string) {
    this.api = api;
  }

  public setView(view: CadastrarTarefaView) {
    this.view = view;
  }

  public async cadastrar(input: CadastrarTarefaInput) {
    if (!this.view) return;

    this.view.enableLoading();

    try {
      const response = await this.api.post(`/projetos/${this.projetoId}/tarefas`, {
        descricao: input.descricao
      });

      if (response.status === 200) {
        this.view.showSuccess('Tarefa cadastrada!');
      }
    } catch(e) {
      console.error(e);
      this.view.showError('Ocorreu uma falha ao cadastrar a tarefa!');
    } finally {
      this.view.disableLoading();
    }
  }
}
