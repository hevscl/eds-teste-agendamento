import React from 'react';
import { Modal } from './Modal';
import type { Agendamento } from '../types/agendamento';
import { formatDate, formatTime } from '../utils/dateUtils';

interface ConfirmDeleteModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  agendamento: Agendamento | null; 
  loading?: boolean; 
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  agendamento,
  loading = false,
}) => {
  if (!agendamento) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      size="sm"
    >
      <div className="space-y-4">
        {/* Mensagem de confirmação */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tem certeza que deseja excluir este agendamento?
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            Esta ação não pode ser desfeita.
          </p>
        </div>

        {/* Detalhes do agendamento */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Detalhes do Agendamento:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Descrição:</span> {agendamento.descricao}</p>
            <p><span className="font-medium">Data:</span> {formatDate(agendamento.data)}</p>
            <p><span className="font-medium">Horário:</span> {formatTime(agendamento.horario)}</p>
            <p><span className="font-medium">Responsável:</span> {agendamento.responsavel}</p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm} 
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} 
          >
            {loading ? 'Excluindo...' : 'Excluir'} 
          </button>
        </div>
      </div>
    </Modal>
  );
};
