# Sky - Teste Técnico Front-End

> Uma interface web interativa para explorar filmes e séries em destaque, utilizando a API do The Movie Database (TMDb). Este projeto foi desenvolvido como uma demonstração de habilidades em front-end, focando em código limpo, semântico e acessível.

## 📸 Preview

![Preview do Projeto em desktop e mobile](/docs/images/screenshot.png)

---

## ✨ Funcionalidades

- [x] **Carrosséis Dinâmicos:** Exibição de filmes e séries populares carregados via API.
- [x] **Busca em Tempo Real:** Campo de pesquisa funcional que exibe resultados de forma clara.
- [x] **Design Responsivo:** Experiência de usuário consistente em desktops, tablets e celulares.
- [x] **Navegação por Abas:** Separação de conteúdo entre Filmes, Séries e Canais.
- [x] **Tema Claro/Escuro:** Alternância de modo de visualização para preferência do usuário.
- [x] **Controles de Acessibilidade:** Botões para aumentar e diminuir o tamanho da fonte global.

## 🛠️ Tecnologias Utilizadas

- HTML5 (Semântico e Acessível)
- SASS / CSS3
- JavaScript (ES6+)
- Gulp.js (Automação de tarefas)
- Swiper.js (Para os carrosséis)
- **The Movie Database (TMDb) API** (Fonte dos dados)

---

## ⚙️ Pré-requisitos e Configuração

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) (geralmente vem com o Node.js)

Além disso, este projeto consome dados da API do TMDb.

1.  **Crie uma conta** no [The Movie Database](https://www.themoviedb.org/).
2.  **Obtenha sua chave de API (v3 auth)** nas configurações da sua conta.
3.  No arquivo `src/js/scripts/main.js`, localize a variável `API_KEY` e substitua o valor `SEUA_CHAVE_API` pela sua chave.

    ```javascript
    // Exemplo em main.js
    const API_KEY = "sua-chave-pessoal-da-api-aqui";
    ```

## 📦 Instalação e Execução

1.  Clone este repositório:
    ```sh
    git clone https://SEU-REPOSITORIO/NOME-PROJETO.git
    ```
2.  Navegue até a pasta do projeto:
    ```sh
    cd NOME-PROJETO
    ```
3.  Instale as dependências:
    ```sh
    npm install
    ```
4.  Execute o Gulp para iniciar o servidor de desenvolvimento e compilar os arquivos:
    ```sh
    gulp
    ```
5.  O projeto estará rodando em `http://localhost:3000`.

## ✍️ Como Editar o Projeto

Conforme as boas práticas do setup, as edições devem ser feitas da seguinte forma:

- **Estilos:** Todas as modificações de estilo devem ser feitas nos arquivos `.scss` dentro da pasta `src/scss/`. O Gulp irá compilar e minificar o CSS automaticamente.
  - ⚠️ **Não edite** os arquivos `src/css/style.min.css` ou `dist/css/style.min.css` diretamente.
- **JavaScript:** As alterações de lógica devem ser feitas no arquivo `src/js/scripts/main.js` ou em outros arquivos dentro da mesma pasta.
  - ⚠️ **Não edite** os arquivos `src/js/all.js` ou `dist/js/all.js` diretamente.
