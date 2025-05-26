import api from "@/connectors/api";
import type { Axios } from "axios";
import type GerenciamentoProjetoView from "./interfaces/GerenciamentoProjetoView";
import type { UpdateProjetoInput } from "./interfaces/GerenciamentoProjetoView";

export default class GerenciamentoProjetoPresenter {
  private readonly api: Axios;
  private view?: GerenciamentoProjetoView;

  public constructor(private readonly projetoId: string) {
    this.api = api;
  }

  public bindView(view: GerenciamentoProjetoView) {
    this.view = view;
  }

  public async onLoad() {
    if (!this.view) return;

    this.view.enableLoading();

    try {
      const { data: { data: projeto }, status } = await this.api.get(`/projetos/${this.projetoId}`);

      if (status === 200) {
        this.view.bindProjeto({
          id: projeto.id,
          nome: projeto.nome,
          descricao: projeto.descricao,
          ativo: projeto.ativo,
          orcamento: projeto.orcamento,
          criadoEm: (new Date(projeto.criado_em)).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
          criadoPor: {
            id: projeto.criado_por.id,
            nome: projeto.criado_por.nome
          }
        });
      } else {
        console.error('Não foi possível obter os dados do projeto!');
      }
    } catch(e) {
      console.error(e);
    } finally {
      this.view.disableLoading();
    }
  }

  public async editarProjeto(data: UpdateProjetoInput) {
    if (!this.view) return;

    this.view.enableLoading();

    try {
      const response = await this.api.put(`/projetos/${this.projetoId}`, {
        nome: data.nome,
        descricao: data.descricao,
        orcamento: data.orcamento,
        ativo: data.ativo
      });

      if (response.status === 200) {
        this.view.showSuccess('Projeto atualizado com sucesso!');
      } else {
        console.error('Falha ao atualizar o projeto!');
      }
    } catch(e) {
      console.error('Não foi possível atualizar no momento. Tente novamente mais tarde.');
    } finally {
      this.view.disableLoading();
    }
  }
}
