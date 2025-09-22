eds-teste-agendamento

Tecnologias Utilizadas

- React 19 com TypeScript
- Vite para build e desenvolvimento
- Tailwind CSS para estilização
- React Hook Form para gerenciamento de formulários
- Zod para validação de schemas
- JSON Server para simulação de API RESTful
- Vitest e React Testing Library para testes

Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

Instalação e Execução

1. Instalar dependências

npm install

2. Executar o servidor de API (json-server)

Em um terminal separado, executar:

npm run server

O servidor estará disponível em `http://localhost:3001`

3. Executar a aplicação React

npm run dev

A aplicação estará disponível em `http://localhost:5173`

4. Executar os testes

Executar todos os testes
npm run test:run

Executar testes em modo watch
npm run test

Executar testes com interface visual
npm run test:ui

5. Build para produção

npm run build


Testes

O projeto inclui testes unitários para:

- Funções utilitárias: Formatação de datas, validações
- Componentes: Formulário de agendamento com validações
- Cobertura: Testes de casos de sucesso, erro e validação

 Executando testes específicos

Testar apenas funções utilitárias
npm run test:run src/utils

Testar apenas componentes
npm run test:run src/components