_[US **EN**]_

# 🧹 PostgreSQL Table Vacuum Tool

Interactive CLI tool to identify and run `VACUUM` (or `VACUUM FULL`) on fragmented PostgreSQL tables, based on usage statistics.

---

## 📌 Overview

This project helps maintain PostgreSQL databases by:

- Identifying fragmented tables based on dead tuples and size.
- Analyzing table statistics directly from the database.
- Safely executing `VACUUM` or `VACUUM FULL` operations interactively.

---

## 🚀 Features

- 📊 **Automatic analysis** of tables with high fragmentation rates.
- 🧠 **CLI interaction** with intuitive prompts via `inquirer`.
- 🔐 **Secure configuration** through environment variables.
- 📄 **Informative logs** to track analyzed and processed tables.
- 🔁 Support for both `VACUUM` and `VACUUM FULL`, with confirmation prompts.

---

## ⚙️ Project Structure

```
├── config.js             # Configuration and .env reader
├── index.js              # Entry point and user interaction
├── TableAnalyzer.js      # Logic for analyzing table stats
├── VacuumEngine.js       # Executes VACUUM on selected tables
├── .env.example          # Sample environment file
├── .gitignore            # Ignores node_modules, .env, etc.
└── package.json          # Project metadata and dependencies
```

---

## 📦 Technologies

- Node.js
- [`pg`](https://www.npmjs.com/package/pg)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`inquirer`](https://www.npmjs.com/package/inquirer)

---

## 📄 Requirements

- Node.js >= 16.x
- Accessible PostgreSQL database
- Sufficient privileges to run `VACUUM`

---

## 🔧 Installation

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
cp .env.example .env
```

Edit the `.env` file and insert your PostgreSQL connection string:

```env
DATABASE_URL=postgres://user:password@localhost:5432/your_database
```

---

## ▶️ How to Use

```bash
node src/index.js
```

You will be guided through prompts to:

- List fragmented tables.
- Choose between `VACUUM` or `VACUUM FULL`.
- Confirm execution before running.

---

## 📌 Example

```
? List fragmented tables? (Y/n)
? Use VACUUM FULL? (y/N)
? Confirm VACUUM execution? (Y/n)
```

---

## 🛡️ Warnings

- Be cautious in production. `VACUUM FULL` locks the table.
- Ensure your DB user has permission to run `VACUUM`.

---

## 🤝 Contributing

Feel free to open issues or Pull Requests. Suggestions are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Questions or want to contribute?

- **[https://www.linkedin.com/in/luiz-vargas/](https://www.linkedin.com/in/luiz-vargas/)**
- **[https://www.linkedin.com/in/kelvin-dias-moreira-b18247223/](https://www.linkedin.com/in/kelvin-dias-moreira-b18247223/)**

---

_[BR **PT-BR**]_

# 🧹 PostgreSQL Table Vacuum Tool

Ferramenta interativa de linha de comando para identificar e executar `VACUUM` (ou `VACUUM FULL`) em tabelas fragmentadas de um banco de dados PostgreSQL, com base em estatísticas de uso.

---

## 📌 Visão Geral

Este projeto tem como objetivo facilitar a manutenção de bancos PostgreSQL, permitindo:

- Identificar tabelas fragmentadas com base em tuplas mortas e tamanho mínimo.
- Analisar estatísticas das tabelas diretamente do banco.
- Executar operações de `VACUUM` ou `VACUUM FULL` de forma segura e interativa.

---

## 🚀 Funcionalidades

- 📊 **Análise automática** de tabelas com alto percentual de fragmentação.
- 🧠 **Interação via CLI** com prompts intuitivos usando `inquirer`.
- 🔐 **Configuração segura** por meio de variáveis de ambiente.
- 📄 **Logs informativos** para rastrear o que foi analisado e processado.
- 🔁 Suporte ao uso de `VACUUM` e `VACUUM FULL` com confirmação do usuário.

---

## ⚙️ Estrutura do Projeto

```
├── config.js             # Configuração e leitura do .env
├── index.js              # Ponto de entrada e interface com o usuário
├── TableAnalyzer.js      # Lógica de análise das tabelas
├── VacuumEngine.js       # Execução do VACUUM nas tabelas selecionadas
├── .env.example          # Exemplo de configuração de ambiente
├── .gitignore            # Ignora node_modules, .env etc.
└── package.json          # Dependências e metadados do projeto
```

---

## 📦 Tecnologias e Dependências

- Node.js
- [`pg`](https://www.npmjs.com/package/pg) — Cliente PostgreSQL
- [`dotenv`](https://www.npmjs.com/package/dotenv) — Variáveis de ambiente
- [`inquirer`](https://www.npmjs.com/package/inquirer) — Interface interativa no terminal

---

## 📄 Requisitos

- Node.js >= 16.x
- Banco de dados PostgreSQL acessível
- Permissões adequadas para executar `VACUUM`

---

## 🔧 Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua string de conexão PostgreSQL:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/seu_banco
```

---

## ▶️ Como Usar

```bash
node src/index.js
```

Você será guiado por perguntas no terminal para:

- Listar tabelas fragmentadas.
- Escolher o tipo de `VACUUM` a aplicar.
- Confirmar antes da execução.

---

## 📌 Exemplo de Uso

```
? Deseja listar as tabelas fragmentadas? (Y/n)
? Deseja usar VACUUM FULL? (y/N)
? Confirmar execução do VACUUM? (Y/n)
```

---

## 🛡️ Avisos

- Use com cautela em produção, especialmente ao usar `VACUUM FULL`, pois ele bloqueia a tabela.
- Certifique-se de que o usuário de banco tem permissões para executar `VACUUM`.

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues ou Pull Requests! Sugestões e melhorias são bem-vindas.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 📬 Contato

Caso tenha dúvidas ou queira contribuir de outra forma, entre em contato:  
- **[https://www.linkedin.com/in/luiz-vargas/](https://www.linkedin.com/in/luiz-vargas/)**
- **[https://www.linkedin.com/in/kelvin-dias-moreira-b18247223/](https://www.linkedin.com/in/kelvin-dias-moreira-b18247223/)**
