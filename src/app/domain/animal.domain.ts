import { RespostaHumano } from "./humano.domain";

export interface RequisicaoAnimal {
  id: number;
  nome: string;
  dataNascimento: string;
  cor: string;
  porte: string;
  especie: string;
  peso: number;
  sexo: string;
  foto: string;
  observacao: string;
  raca: number;
  humano: number;
  empresa: number;
  status: string;
}

export interface RespostaAnimal {
  id: number;
  nome: string;
  humanoCompleto: string;
  contatoFone: string;
  contatoZap: string;
  dataNascimento: string;
  cor: string;
  porte: string;
  especie: string;
  peso: number;
  sexo: string;
  foto: string;
  observacao: string;
  raca: number;
  humano: number;
  empresa: number;
  status: string;
}

export interface ComboBoxAnimal {
  id: number;
  nome: string;
  humano: RespostaHumano;
}
