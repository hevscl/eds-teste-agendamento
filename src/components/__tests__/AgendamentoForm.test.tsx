import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AgendamentoForm } from '../AgendamentoForm';
import type { Agendamento } from '../../types/agendamento';

vi.mock('../../utils/dateUtils', () => ({
  getCurrentDate: () => '2024-09-25',
  isPastDate: vi.fn((date: string) => {
    return date === '2020-01-01';
  }),
}));

describe('AgendamentoForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form with all required fields', () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/horário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/responsável/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument();
  });

  it('should pre-fill form when editing existing agendamento', () => {
    const agendamento: Agendamento = {
      id: 1,
      descricao: 'Reunião de teste',
      data: '2024-09-26',
      horario: '14:30',
      responsavel: 'João Silva',
    };

    render(
      <AgendamentoForm
        agendamento={agendamento}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('Reunião de teste')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-09-26')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14:30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /atualizar/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty required fields', async () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const dataInput = screen.getByLabelText(/data/i);
    fireEvent.change(dataInput, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument();
      expect(screen.getByText(/data é obrigatória/i)).toBeInTheDocument();
      expect(screen.getByText(/horário é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/responsável é obrigatório/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show validation error for past date', async () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const descricaoInput = screen.getByLabelText(/descrição/i);
    const dataInput = screen.getByLabelText(/data/i);
    const horarioInput = screen.getByLabelText(/horário/i);
    const responsavelInput = screen.getByLabelText(/responsável/i);

    fireEvent.change(descricaoInput, { target: { value: 'Teste' } });
    fireEvent.change(dataInput, { target: { value: '2020-01-01' } }); 
    fireEvent.change(horarioInput, { target: { value: '14:30' } });
    fireEvent.change(responsavelInput, { target: { value: 'João' } });

    const submitButton = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/data não pode ser no passado/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const descricaoInput = screen.getByLabelText(/descrição/i);
    const dataInput = screen.getByLabelText(/data/i);
    const horarioInput = screen.getByLabelText(/horário/i);
    const responsavelInput = screen.getByLabelText(/responsável/i);

    fireEvent.change(descricaoInput, { target: { value: 'Reunião importante' } });
    fireEvent.change(dataInput, { target: { value: '2024-12-31' } });
    fireEvent.change(horarioInput, { target: { value: '14:30' } });
    fireEvent.change(responsavelInput, { target: { value: 'João Silva' } });

    const submitButton = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        descricao: 'Reunião importante',
        data: '2024-12-31',
        horario: '14:30',
        responsavel: 'João Silva',
      });
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should disable form fields when loading', () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={true}
      />
    );

    expect(screen.getByLabelText(/descrição/i)).toBeDisabled();
    expect(screen.getByLabelText(/data/i)).toBeDisabled();
    expect(screen.getByLabelText(/horário/i)).toBeDisabled();
    expect(screen.getByLabelText(/responsável/i)).toBeDisabled();
    
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /salvando/i })).toBeDisabled();
  });

  it('should show loading text on submit button when loading', () => {
    render(
      <AgendamentoForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={true}
      />
    );

    expect(screen.getByRole('button', { name: /salvando/i })).toBeInTheDocument();
  });
});
