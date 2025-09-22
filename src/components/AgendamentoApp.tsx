import React, { useState } from 'react';
import { useAgendamentos } from '../hooks/useAgendamentos';
import { AgendamentoForm } from './AgendamentoForm';
import { AgendamentoTable } from './AgendamentoTable';
import { Modal } from './Modal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { SearchBar } from './SearchBar';
import type { Agendamento, NovoAgendamento, AtualizarAgendamento } from '../types/agendamento';
import type { AgendamentoFormData } from '../utils/validationSchemas';

export const AgendamentoApp: React.FC = () => {
  const {
    filteredAgendamentos,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    criarAgendamento,
    atualizarAgendamento,
    removerAgendamento,
    limparErro,
  } = useAgendamentos();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const [deletingAgendamento, setDeletingAgendamento] = useState<Agendamento | null>(null);

  //Função para abrir modal criação
  const handleCreateClick = () => {
    setEditingAgendamento(null); 
    setIsFormModalOpen(true); 
  };

  //Função para abrir modal edição
  const handleEditClick = (agendamento: Agendamento) => {
    setEditingAgendamento(agendamento); 
    setIsFormModalOpen(true); 
  };

  //Função para abrir modal confirmação de exclusão
  const handleDeleteClick = (agendamento: Agendamento) => {
    setDeletingAgendamento(agendamento); 
    setIsDeleteModalOpen(true); 
  };

  //Função para fechar modal formulário
  const handleFormModalClose = () => {
    setIsFormModalOpen(false); 
    setEditingAgendamento(null); 
  };

  //Função para fechar modal de confirmação
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false); 
    setDeletingAgendamento(null); 
  };

  //Função para fazer submit do formulário
  const handleFormSubmit = async (data: AgendamentoFormData) => {
    try {
      if (editingAgendamento) {
        const agendamentoAtualizado: AtualizarAgendamento = {
          id: editingAgendamento.id,
          ...data,
        };
        await atualizarAgendamento(agendamentoAtualizado);
      } else {
        const novoAgendamento: NovoAgendamento = data;
        await criarAgendamento(novoAgendamento);
      }
      
      handleFormModalClose();
    } catch (error) {
      console.error('Erro no submit:', error);
    }
  };

  //Função para confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!deletingAgendamento) return;

    try {
      await removerAgendamento(deletingAgendamento.id);
      
      handleDeleteModalClose();
    } catch (error) {
      console.error('Erro na exclusão:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciamento de Agendamentos
            </h1>
            <button
              onClick={handleCreateClick} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Novo Agendamento
            </button>
          </div>

          {/* Busca */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery} 
              placeholder="Buscar por descrição..."
              disabled={loading}
            />
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erro
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={limparErro} 
                      className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabela de agendamentos */}
          <AgendamentoTable
            agendamentos={filteredAgendamentos}
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
            loading={loading}
          />
        </div>

        {/* Modal formulário */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={handleFormModalClose}
          title={editingAgendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
          size="md"
        >
          <AgendamentoForm
            agendamento={editingAgendamento || undefined}
            onSubmit={handleFormSubmit} 
            onCancel={handleFormModalClose} 
            loading={loading}
          />
        </Modal>

        {/* Modal confirmação de exclusão */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onConfirm={handleConfirmDelete} 
          agendamento={deletingAgendamento}
          loading={loading}
        />
      </div>
    </div>
  );
};
