export interface Agendamento {
  id: number; 
  descricao: string; 
  data: string; 
  horario: string; 
  responsavel: string; 
}

export interface NovoAgendamento {
  descricao: string;
  data: string;
  horario: string;
  responsavel: string;
}

export interface AtualizarAgendamento {
  id: number;
  descricao?: string;
  data?: string;
  horario?: string;
  responsavel?: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface BuscaParams {
  q?: string; 
  page?: number; 
  limit?: number; 
}