import CadastrarTarefaPresenter from "@/presenters/CadastrarTarefaPresenter";
import type CadastrarTarefaView from "@/presenters/interfaces/CadastrarTarefaView";
import type ListagemTarefasView from "@/presenters/interfaces/ListagemTarefasView";
import ListagemTarefaPresenter from "@/presenters/ListagemTarefaPresenter";

export default class ListaTarefaController {
  private readonly cadastroPresenter: CadastrarTarefaPresenter;
  private readonly listagemPresenter: ListagemTarefaPresenter

  public constructor(projetoId: string) {
    this.cadastroPresenter = new CadastrarTarefaPresenter(projetoId);
    this.listagemPresenter = new ListagemTarefaPresenter(projetoId);
  }

  public setView(view: CadastrarTarefaView & ListagemTarefasView) {
    this.cadastroPresenter.setView(view);
    this.listagemPresenter.setView(view);
  }

  public async cadastrar(descricao: string) {
    await this.cadastroPresenter.cadastrar({
      descricao,
    });
  }

  public async onLoad() {
    await this.listagemPresenter.onLoad();
  }
}
