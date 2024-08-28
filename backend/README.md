# GetDemo - Desafio Técnico  Backend

### Este repositório contém a solução para o desafio técnico da GetDemo.

## Arquitetura de Pastas

```
├── dist/
├── coverage/
├── src/
│ ├── config/
│ │ └── database.ts
│ ├── controllers/
│ │ ├── DemoController.ts
│ │ └── __tests__/
│ │     └── DemoController.e2e.spec.ts
│ ├── models/
│ │ ├── Demo.ts
│ │ └── Frame.ts
│ ├── routes/
│ │ ├── demoRoutes.ts
│ │ ├── frameRoutes.ts
│ ├── services/
│ │ ├── DemoService.ts
│ │ └── __tests__/
│ │     └── DemoService.spec.ts
│ │     └── FrameService.spec.test.ts
│ ├── utils/
│ │ └── errorHandler.ts
│ ├── app.ts
│ └── server.ts
├── scripts/
│ └── seedDb.ts
├── package.json
├── tsconfig.json 
└── README.md
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Express**: Framework web minimalista para Node.js.
- **Sequelize**: ORM para interagir com bancos de dados relacionais.
- **SQLite3**: Banco de dados relacional leve e embutido.
- **TSX**: Executa arquivos TypeScript no Node.js com recarregamento automático.
- **Tsup**: Ferramenta rápida para build e bundling de projetos TypeScript.
- **Vitest**: Framework de testes rápido e moderno para projetos JavaScript e TypeScript.


## Como Executar o Projeto

### 1. Instalação das Dependências

Antes de executar o projeto, certifique-se de instalar todas as dependências necessárias:


```
yarn  install
```

Após instalar as dependências, é necessário popular o banco de dados com dados iniciais. Para isso, execute o comando:


```
yarn  seed
```

### 2. Execução em Desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento, use o comando:


```
yarn  start:dev
```

### 3. Execução em Produção

Antes de rodar em produção, é necessário compilar o TypeScript para JavaScript: Isso irá gerar o código compilado na pasta dist/. Em seguida, você pode rodar o servidor com o comando:


```
yarn  build
```

```
yarn  start
```

