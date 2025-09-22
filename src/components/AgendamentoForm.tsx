import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agendamentoSchema } from '../utils/validationSchemas';
import type { AgendamentoFormData } from '../utils/validationSchemas';
import type { Agendamento } from '../types/agendamento';
import { getCurrentDate } from '../utils/dateUtils';

interface AgendamentoFormProps {
  agendamento?: Agendamento; 
  onSubmit: (data: AgendamentoFormData) => Promise<void>; 
  onCancel: () => void; 
  loading?: boolean; 
}

export const AgendamentoForm: React.FC<AgendamentoFormProps> = ({
  agendamento,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgendamentoFormData>({
    resolver: zodResolver(agendamentoSchema), 
    defaultValues: {
      descricao: agendamento?.descricao || '',
      data: agendamento?.data || getCurrentDate(),
      horario: agendamento?.horario || '',
      responsavel: agendamento?.responsavel || '',
    },
  });

  const handleFormSubmit = async (data: AgendamentoFormData) => {
    try {
      await onSubmit(data);
      
      reset();
    } catch (error) {
      console.error('Erro no formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição *
        </label>
        <input
          type="text"
          id="descricao"
          {...register('descricao')} 
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.descricao ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Digite a descrição do agendamento"
          disabled={loading} 
        />
        {/* Exibe erro se existir */}
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      {/* Data */}
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
          Data *
        </label>
        <input
          type="date"
          id="data"
          {...register('data')} 
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.data ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading} 
        />
        {errors.data && (
          <p className="mt-1 text-sm text-red-600">{errors.data.message}</p>
        )}
      </div>

      {/* Horário */}
      <div>
        <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-1">
          Horário *
        </label>
        <input
          type="time"
          id="horario"
          {...register('horario')} 
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.horario ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading} 
        />
        {errors.horario && (
          <p className="mt-1 text-sm text-red-600">{errors.horario.message}</p>
        )}
      </div>

      {/* Responsável */}
      <div>
        <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700 mb-1">
          Responsável *
        </label>
        <input
          type="text"
          id="responsavel"
          {...register('responsavel')} 
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.responsavel ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Digite o nome do responsável"
          disabled={loading} 
        />
        {errors.responsavel && (
          <p className="mt-1 text-sm text-red-600">{errors.responsavel.message}</p>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel} 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} 
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading} 
        >
          {loading ? 'Salvando...' : agendamento ? 'Atualizar' : 'Criar'} 
        </button>
      </div>
    </form>
  );
};
