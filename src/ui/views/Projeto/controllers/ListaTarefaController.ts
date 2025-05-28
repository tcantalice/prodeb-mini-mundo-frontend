import CadastrarTarefaPresenter from "@/presenters/CadastrarTarefaPresenter";
import GerenciamentoTarefaPresenter from "@/presenters/GerenciamentoTarefaPresenter";
import type CadastrarTarefaView from "@/presenters/interfaces/CadastrarTarefaView";
import type GerenciamentoTarefaView from "@/presenters/interfaces/GerenciamentoTarefaView";
import type ListagemTarefasView from "@/presenters/interfaces/ListagemTarefaView";
import ListagemTarefaPresenter from "@/presenters/ListagemTarefaPresenter";

export default class ListaTarefaController {
  private readonly cadastroPresenter: CadastrarTarefaPresenter;
  private readonly listagemPresenter: ListagemTarefaPresenter;
  private readonly gerenciamentoPresenter: GerenciamentoTarefaPresenter;

  public constructor(projetoId: string) {
    this.cadastroPresenter = new CadastrarTarefaPresenter(projetoId);
    this.listagemPresenter = new ListagemTarefaPresenter(projetoId);
    this.gerenciamentoPresenter = new GerenciamentoTarefaPresenter();
  }

  public bindListView(view: ListagemTarefasView) {
    this.listagemPresenter.bindView(view);
  }

  public bindCreateView(view: CadastrarTarefaView) {
    this.cadastroPresenter.bindView(view);
  }

  public bindManageView(view: GerenciamentoTarefaView) {
    this.gerenciamentoPresenter.bindView(view);
  }

  public async cadastrar(descricao: string) {
    await this.cadastroPresenter.cadastrar({
      descricao,
    });
  }

  public async onLoad() {
    await this.listagemPresenter.onLoad();
  }

  public async alterarStatus(id: string) {
    await this.gerenciamentoPresenter.alterarStatus(id);
  }
}
