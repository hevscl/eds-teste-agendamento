import React, { useState } from 'react';
import type { Agendamento } from '../types/agendamento';
import { formatDate, formatTime } from '../utils/dateUtils';

interface AgendamentoTableProps {
  agendamentos: Agendamento[]; 
  onEdit: (agendamento: Agendamento) => void; 
  onDelete: (agendamento: Agendamento) => void; 
  loading?: boolean; 
}

export const AgendamentoTable: React.FC<AgendamentoTableProps> = ({
  agendamentos,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const totalPaginas = Math.ceil(agendamentos.length / itensPorPagina);
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const agendamentosPagina = agendamentos.slice(indexInicial, indexFinal);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando agendamentos...</span>
      </div>
    );
  }

  if (agendamentos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Nenhum agendamento encontrado</p>
        <p className="text-gray-400 text-sm mt-1">
          Clique em "Novo Agendamento" para criar o primeiro
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Cabeçalho */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Horário
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Responsável
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        
        {/* Corpo */}
        <tbody className="bg-white divide-y divide-gray-200">
          {agendamentosPagina.map((agendamento) => (
            <tr key={agendamento.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {agendamento.descricao}
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(agendamento.data)} 
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatTime(agendamento.horario)} 
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {agendamento.responsavel}
                </div>
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(agendamento)} 
                    className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                    title="Editar agendamento"
                  >
                    Editar
                  </button>
                  
                  <button
                    onClick={() => onDelete(agendamento)} 
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                    title="Excluir agendamento"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
          disabled={paginaAtual === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-sm text-gray-600">
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
          disabled={paginaAtual === totalPaginas}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};