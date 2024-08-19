export interface RequisicaoLogin {
  email: string;
  senha: string;
  novaSenha: string;
}

export interface RespostaLogin {
  id: number;
  nome: string;
  autenticacao: boolean;
  descricao: Array<string>;
}
