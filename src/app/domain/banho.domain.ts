export interface RequisicaoBanho {
  id: number;
	inicio: string;
	statusBanhoTosa: string;
	status: string;
	termino: string;
	observacao: string;
	animal: number;
	tipoBanhoTosa: number;
  statusPagamentoBanho: string;
	transporte: number;
  buscar: boolean;
  entregar: boolean;
  desconto: number;
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
  zap: string;
  tipoBanhoDescricao: string;
	tipoBanhoValor: number;
  statusPagamentoBanho: string;
	transporte: number;
  buscar: boolean;
  entregar: boolean;
  desconto: number;
}
