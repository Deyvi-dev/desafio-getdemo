# GetDemo - Desafio Técnico  FrontEnd

### Este repositório contém a solução para o desafio técnico da GetDemo.

## Arquitetura de Pastas

```
├── public/
├── src/
│ │ └── components
│ │ └── config
│ │ └── helpers
│ │ └── hooks
│ │ └── libs
│ │ └── pages
│ │ └── routes
│ │ └── services
│ │ └── stores
│ │ └── types
│ │ └── App.css
│ │ └── App.tsx
│ │ └── index.css
│ │ └── main.tsx
├── package.json
├── tsconfig.json 
├── tailwind.config.js
└── README.md
```

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Vite**: Ferramenta de build e desenvolvimento rápida para projetos frontend.
- **Tailwind CSS**: Framework de utilitários para estilização de CSS.
- **Shadcn UI**: Componentes acessíveis e personalizáveis para React.
- **SWR**: Hook para dados em React com cache e sincronização.
- **Zustand**: Gerenciador de estado leve para React.
- **ESLint**: Ferramenta para análise de código e linting.
- **React-DOM**: Biblioteca para integração do React com o DOM.
- **Lucide React**: Biblioteca de ícones SVG para React.
- **React-Draggable**: Biblioteca para adicionar funcionalidade de arrastar elementos em aplicativos React.


## Como Executar o Projeto

### 1. Instalação das Dependências

Antes de executar o projeto, certifique-se de instalar todas as dependências necessárias:


```
yarn  install
```

### 2. Execução em Desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento, use o comando:


```
yarn  dev
```

### 3. Execução em Produção

Antes de rodar em produção, é necessário compilar o TypeScript para JavaScript: Isso irá gerar o código compilado na pasta dist/. Em seguida, você pode rodar o servidor com o comando:


```
yarn  build
```

```
yarn  start
```

