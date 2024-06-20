export interface RequisicaoBanho {
  id: number;
	inicio: string;
	statusBanhoTosa: string;
	status: string;
	termino: string;
	observacao: string;
	animal: number;
	tipoBanhoTosa: number;
}

export interface RespostaBanho {
  id: number;
	inicio: string;
	statusBanhoTosa: string;
	status: string;
	termino: string;
	observacao: string;
	animal: number;
	tipoBanhoTosa: number;
  animalNome: string;
  animalHumano: string;
  tipoBanhoDescricao: string;
	tipoBanhoValor: number;
}
