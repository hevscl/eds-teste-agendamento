import { useState, useEffect, useCallback } from 'react';
import type { Agendamento, NovoAgendamento, AtualizarAgendamento } from '../types/agendamento';
import { AgendamentoService } from '../services/agendamentoService';

interface UseAgendamentosState {
  agendamentos: Agendamento[]; 
  loading: boolean; 
  error: string | null; 
  searchQuery: string; 
  filteredAgendamentos: Agendamento[]; 
}

interface UseAgendamentosActions {
  carregarAgendamentos: () => Promise<void>; 
  criarAgendamento: (agendamento: NovoAgendamento) => Promise<void>; 
  atualizarAgendamento: (agendamento: AtualizarAgendamento) => Promise<void>; 
  removerAgendamento: (id: number) => Promise<void>; 
  setSearchQuery: (query: string) => void; 
  limparErro: () => void; 
}

type UseAgendamentosReturn = UseAgendamentosState & UseAgendamentosActions;

export const useAgendamentos = (): UseAgendamentosReturn => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAgendamentos = AgendamentoService.filtrarPorDescricao(agendamentos, searchQuery);

  const carregarAgendamentos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const dados = await AgendamentoService.buscarAgendamentos();
      
      setAgendamentos(dados);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  }, []);

  const criarAgendamento = useCallback(async (agendamento: NovoAgendamento) => {
    try {
      setLoading(true);
      setError(null);

      const novoAgendamento = await AgendamentoService.criarAgendamento(agendamento);
      
      setAgendamentos(prev => [...prev, novoAgendamento]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar agendamento');
      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarAgendamento = useCallback(async (agendamento: AtualizarAgendamento) => {
    try {
      setLoading(true);
      setError(null);

      const agendamentoAtualizado = await AgendamentoService.atualizarAgendamento(agendamento);
      
      setAgendamentos(prev =>
        prev.map(ag => ag.id === agendamento.id ? agendamentoAtualizado : ag)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar agendamento');
      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  const removerAgendamento = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await AgendamentoService.removerAgendamento(id);
      
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover agendamento');
      throw err; 
    } finally {
      setLoading(false);
    }
  }, []);

  const limparErro = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  return {
    agendamentos,
    loading,
    error,
    searchQuery,
    filteredAgendamentos,
    carregarAgendamentos,
    criarAgendamento,
    atualizarAgendamento,
    removerAgendamento,
    setSearchQuery,
    limparErro,
  };
};