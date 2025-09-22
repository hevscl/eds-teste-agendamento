import type { Agendamento, NovoAgendamento, AtualizarAgendamento, BuscaParams } from '../types/agendamento';

const API_BASE_URL = 'http://localhost:3001';

export class AgendamentoService {

  static async buscarAgendamentos(params: BuscaParams = {}): Promise<Agendamento[]> {
    try {
      const url = new URL(`${API_BASE_URL}/agendamentos`);
      
      // Adicionar parâmetros de busca 
      if (params.q) {
        url.searchParams.append('q', params.q);
      }
      if (params.page) {
        url.searchParams.append('_page', params.page.toString());
      }
      if (params.limit) {
        url.searchParams.append('_limit', params.limit.toString());
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  }

  static async buscarAgendamentoPorId(id: number): Promise<Agendamento> {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar agendamento ${id}:`, error);
      throw error;
    }
  }

  static async criarAgendamento(agendamento: NovoAgendamento): Promise<Agendamento> {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  }

  static async atualizarAgendamento(agendamento: AtualizarAgendamento): Promise<Agendamento> {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos/${agendamento.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar agendamento ${agendamento.id}:`, error);
      throw error;
    }
  }

  static async removerAgendamento(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erro ao remover agendamento ${id}:`, error);
      throw error;
    }
  }

  static filtrarPorDescricao(agendamentos: Agendamento[], query: string): Agendamento[] {
    if (!query.trim()) {
      return agendamentos;
    }

    return agendamentos.filter(agendamento =>
      agendamento.descricao.toLowerCase().includes(query.toLowerCase())
    );
  }
}