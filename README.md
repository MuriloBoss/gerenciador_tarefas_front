# Gerenciador de Tarefas

Sistema web para gerenciamento de projetos e tarefas com timer Pomodoro integrado.

## Tecnologias

- React 18
- React Router DOM
- Bootstrap 5
- JWT para autenticação

## Funcionalidades

- **Projetos**: Criação e gerenciamento de projetos
- **Tarefas**: Organização de tarefas vinculadas a projetos
- **Pomodoro**: Timer para técnica Pomodoro
- **Autenticação**: Sistema de login com JWT

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Acesse em `http://localhost:3000`

## Build

```bash
npm run build
```

## Estrutura

```
src/
├── componentes/
│   ├── telas/
│   │   ├── projeto/
│   │   ├── tarefa/
│   │   ├── pomodoro/
│   │   └── login/
│   ├── comuns/
│   └── Menu*.jsx
├── servicos/
└── seguranca/
```

## Rotas

- `/` - Home pública
- `/login` - Autenticação
- `/privado/projetos` - Gerenciar projetos
- `/privado/tarefas` - Gerenciar tarefas
- `/privado/pomodoro` - Timer Pomodoro
