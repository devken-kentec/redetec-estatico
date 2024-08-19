export interface RequisicaoAcesso {
    id: number;
    statusAcesso: string;
	  statusLogin: string;
	  descricao: string;
	  senha: string;
	  pin: string;
	  login: string;
	  nome: string;
	  sobreNome: string;
	  idNome: number;
}

export interface RespostaAcesso {
  id: number;
  statusAcesso: string;
  statusLogin: string;
  descricao: string;
  senha: string;
  pin: string;
  login: string;
  nome: string;
  sobreNome: string;
  idNome: number;
}
