export interface RequisicaoVacina {
  id: number;
  dataVacinacao: string;
  dataRetorno: string;
  statusPagamento: string;
  referencia: string;
  obervacao: string;
	vacina: number;
  descricaoVacina: string;
	valorVacina: number;
  descricaoAnimal: string;
  humanoAnimal: string;
  status: string;
}

export interface RespostaVacina {
  id: number;
  dataVacinacao: string;
  dataRetorno: string;
  statusPagamento: string;
  referencia: string;
  obervacao: string;
	vacina: number;
  descricaoVacina: string;
	valorVacina: number;
  descricaoAnimal: string;
  humanoAnimal: string;
  status: string;
}
