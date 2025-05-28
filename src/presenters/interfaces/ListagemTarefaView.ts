import type { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";
import type TarefaViewModel from "../models/TarefaViewModel";

export default interface ListagemTarefaView {
  showLoading(): void;

  hideLoading(): void;

  setTarefas(list: TarefaViewModel[]): void;
}
