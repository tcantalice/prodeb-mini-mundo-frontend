import type { StatusTarefaEnum } from "@/domain/tarefa/StatusTarefaEnum";

export default interface TarefaViewModel {
  id: string;
  descricao: string;
  dataInicio: string | null;
  dataFim: string | null;
  status: StatusTarefaEnum;
  criadoPor: string;
  criadoEm: string;
}
