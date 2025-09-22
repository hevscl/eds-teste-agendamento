import { z } from 'zod';
import { isPastDate } from './dateUtils';

export const agendamentoSchema = z.object({
  descricao: z
    .string()
    .min(1, 'Descrição é obrigatória') 
    .min(3, 'Descrição deve ter pelo menos 3 caracteres') 
    .max(200, 'Descrição deve ter no máximo 200 caracteres'), 
  
  data: z
    .string()
    .min(1, 'Data é obrigatória') 
    .refine((date) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(date);
    }, 'Data deve estar no formato YYYY-MM-DD')
    .refine((date) => {
      return !isPastDate(date);
    }, 'Data não pode ser no passado'),
  
  horario: z
    .string()
    .min(1, 'Horário é obrigatório') 
    .refine((time) => {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeRegex.test(time);
    }, 'Horário deve estar no formato HH:MM'),
  
  responsavel: z
    .string()
    .min(1, 'Responsável é obrigatório') 
    .min(2, 'Responsável deve ter pelo menos 2 caracteres') 
    .max(100, 'Responsável deve ter no máximo 100 caracteres'), 
});

export const buscaSchema = z.object({
  query: z
    .string()
    .optional() 
    .refine((query) => {
      return !query || query.trim().length > 0;
    }, 'Termo de busca não pode estar vazio'),
});

export type AgendamentoFormData = z.infer<typeof agendamentoSchema>;

export type BuscaFormData = z.infer<typeof buscaSchema>;