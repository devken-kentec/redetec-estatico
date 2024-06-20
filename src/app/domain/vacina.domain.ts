export interface RequisicaoVacina {
    id: number;
    inicio: string;
    statusVacina: string;
    status: string;
    termino: string;
    observacao: string;
    animal: number;
    tipoVacina: number;
}

export interface RespostaVacina {
    id: number;
     inicio: string;
     statusVacina: string;
     status: string;
     termino: string;
     observacao: string;
     animal: number;
     tipoVacina: number;
    animalNome: string;
    animalHumano: string;
    tipoVacinaDescricao: string;
     tipoVacinaValor: number;

}