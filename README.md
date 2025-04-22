# 🚀 Desafio Banestes - Sistema para Consulta de Clientes

## 📄 Descrição

Este repositório foi criado para o desafio lançado na **segunda fase da seleção para a vaga de Estagiário de TI no Banestes**. Nele está a minha solução para o desafio proposto: **criar uma aplicação front-end que consuma planilhas CSV armazenadas no Google Sheets**, estruturando os dados e exibindo-os de forma amigável para o usuário final.

### ✅ Requisitos Atendidos

1. Consumo de dados de clientes, contas e agências via API (HTTP).
2. Lista de clientes com exibição dos dados mais relevantes.
3. Filtro e busca por nome e CPF/CNPJ.
4. Paginação com limite de 10 clientes por página.
5. Visualização detalhada de cada cliente.
6. Exibição de todas as contas vinculadas ao cliente.
7. Exibição das informações da agência vinculada ao cliente.
8. Interface agradável com bom uso de cores e espaçamento.
9. Boa experiência do usuário (UX).
10. Código limpo, organizado, comentado e de fácil leitura.
11. Uso extensivo de **TypeScript**, com tipos definidos.
12. Responsividade para diferentes tamanhos de tela.
13. Acessibilidade considerada.
14. Carregamento rápido, validado com ferramentas como **Lighthouse**.

---

## 💻 Uso

A aplicação é simples e intuitiva. Possui:

- Uma tela principal com barra de busca e lista de clientes.
- Funcionalidade para filtrar e paginar os resultados.
- Página de detalhes com todas as informações do cliente selecionado, suas contas e agência.

---

## 🛠 Tecnologias Utilizadas

- **HTML**
- **CSS**
- **TypeScript**
- **React**
- **Tailwind CSS**

---

## 📁 Estrutura do Projeto

A estrutura da aplicação está organizada da seguinte forma:

- `components/`: componentes de interface reutilizáveis.
- `services/`: serviços responsáveis pelo consumo e transformação dos dados CSV da API.
- `types/`: interfaces TypeScript para tipagem dos dados (Cliente, Agência e Conta).
- `utils/`: funções utilitárias auxiliares utilizadas em múltiplas partes do projeto.

---

## 🧪 Requisitos para Rodar Localmente

Para rodar a aplicação em ambiente de desenvolvimento, é necessário ter:

- [Node.js](https://nodejs.org) com NPM instalado (versão 16+ recomendada)
- Tailwind CSS instalado e configurado (já incluído no projeto)

### Instalação

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
npm run dev
