export default interface Projeto {
    id: string;
    nome: string;
    descricao: string | null;
    orcamento: number | null;
    ativo: boolean;
    criadoEm: Date;
    criadoPor: string;
}
