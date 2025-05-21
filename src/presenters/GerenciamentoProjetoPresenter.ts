import api from "@/connectors/api";
import type { Axios } from "axios";
import type GerenciamentoProjetoView from "./interfaces/GerenciamentoProjetoView";
import type { UpdateProjetoData } from "./interfaces/GerenciamentoProjetoView";

export default class GerenciamentoProjetoPresenter {
  private readonly api: Axios;

  public constructor(private readonly view: GerenciamentoProjetoView) {
    this.api = api;
  }

  public async onLoad(id: string) {
    this.view.enableLoading();

    try {
      const { data: { data: projeto }, status } = await this.api.get(`/projetos/${id}`);

      if (status === 200) {
        this.view.fillFields({
          id,
          nome: projeto.nome,
          descricao: projeto.descricao,
          ativo: projeto.ativo,
          orcamento: projeto.orcamento
        });
      } else {
        this.view.showError('Não foi possível obter os dados do projeto!');
      }
    } catch(e) {
      this.view.showError('Não foi possível obter os dados do projeto!');
    } finally {
      this.view.disableLoading();
    }
  }

  public async editarProjeto(id: string, data: UpdateProjetoData) {
    this.view.enableLoading();

    try {
      const response = await this.api.put(`/projetos/${id}`, {
        nome: data.nome,
        descricao: data.descricao,
        orcamento: data.orcamento,
        ativo: data.ativo
      });

      if (response.status === 200) {
        this.view.showSuccess('Projeto atualizado com sucesso!');
      } else {
        this.view.showError('Falha ao atualizar o projeto!');
      }
    } catch(e) {
      this.view.showError('Não foi possível atualizar no momento. Tente novamente mais tarde.');
    } finally {
      this.view.disableLoading();
    }
  }
}
