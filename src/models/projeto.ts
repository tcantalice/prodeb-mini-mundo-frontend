export default class Projeto {
    id: string;
    nome: string;
    descricao: string | null;
    orcamento: number | null;
    criadoEm: Date;
    criadoPor: string;

    constructor(
        id: string,
        nome: string,
        descricao: string | null,
        orcamento: number | null,
        criadoEm: Date,
        criadoPor: string
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.orcamento = orcamento;
        this.criadoEm = criadoEm;
        this.criadoPor = criadoPor;

        console.log(criadoEm)
    }
}
