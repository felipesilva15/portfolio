# Portfólio

<div align="center">
    <img alt="Logo" width="350px" src="https://i.imgur.com/bCrWkXc.png" />

![Status](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=RED&style=for-the-badge)

[![Build](https://img.shields.io/github/actions/workflow/status/felipesilva15/portfolio-manager-api/build.yml?logo=github&label=build)](https://github.com/felipesilva15/portfolio-manager-api/actions/workflows/build.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/felipesilva15/portfolio/run-tests.yml?logo=github&label=testes)](https://github.com/felipesilva15/portfolio-manager-api/actions/workflows/run-tests.yml)
![Top language](https://img.shields.io/github/languages/top/felipesilva15/portfolio.svg)
![Language count](https://img.shields.io/github/languages/count/felipesilva15/portfolio.svg)
![Repository size](https://img.shields.io/github/repo-size/felipesilva15/portfolio.svg)
[![Last commit](https://img.shields.io/github/last-commit/felipesilva15/portfolio.svg)](https://github.com/felipesilva15/portfolio/commits/main)
[![Issues](https://img.shields.io/github/issues/felipesilva15/portfolio.svg)](https://github.com/felipesilva15/portfolio/issues)
[![Licence](https://img.shields.io/github/license/felipesilva15/portfolio.svg)](https://github.com/felipesilva15/portfolio/blob/main/LICENSE)

</div>

Um website desenvolvido para fornecer as informações sobre mim, como portfólio, experiências profissionais, habilidades etc. Veja nas seções abaixo os detalhamentos do mesmo.

## 📑 Sumário

- [Descrição geral](#-descrição-geral)
- [Principais funcionalidades](#-principais-funcionalidades)
- [Screenshots](#-screenshots)
- [Tecnologias utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Executando localmente](#-executando-localmente)
- [Executando com Docker](#-executando-com-docker)
- [Testes](#-testes)
- [Autores](#%EF%B8%8F-autores)
- [Licença](#-licença)

## 📘 Descrição Geral

- **Versão:** 1.0.0
- **Autor:** [Felipe Silva](mailto:felipe.allware@gmail.com)
- **Licença:** [Licença](https://github.com/felipesilva15/portfolio/blob/main/LICENSE)
- **Deploy:** [Site](https://portfolio.felipesilva15.com.br)
- **Backend:** [GitHub](https://github.com/felipesilva15/portfolio-manager-api) | [Swagger](https://portfolio-manager-api.felipesilva15.com.br/api/documentation)

## ⚙ Principais funcionalidades

- Interface responsiva
- Consumo de dados via API
- Testes automatizados
- CI com GitHub Actions

## 📷 Screenshots

Abaixo são apenas algumas capturas de tela da aplicação.

![Sobre mim - Home](https://i.imgur.com/2UaJiiu.jpeg)
*Sobre mim - Home*

![Currículo](https://i.imgur.com/vMZ2Fkf.jpeg)
*Currículo*

![Portfólio - Projetos](https://i.imgur.com/gacpqLi.jpeg)
*Portfólio - Projetos*

![Contato](https://i.imgur.com/ztIYnXm.jpeg)
*Contato*

## 🛠️ Tecnologias utilizadas

- **Angular 19**
- **PrimeNG 19**
- **PrimeFlex**
- **Docker**
- **GitHub Actions (CI/CD)**

## 📁 Estrutura de pastas

Veja abaixo uma breve explicação da estrutura de pastas utilizadas neste projeto.

```text
.
├── docker/                         # Configurações e instruções para build da imagem com Docker 
├── public/                         # Arquivos estáticos públicos (Favicon, imagens etc.)
└── src/
    ├── app/
    │   ├── core/                   # Módulo central de recursos para toda aplicação
    │   ├── layout/                 # Layout base (navar, layout etc.)
    │   ├── models/                 # Models e interfaces da aplicação
    │   ├── modules/                # Módulos que separam os components, services etc.
    │   ├── pages/                  # Páginas da aplicação
    │   ├── shared/
    │   │   ├── components/         # Componentes reutilizáveis e globais
    │   │   ├── enums/              # Enums globais
    │   │   ├── pipes/              # Pipes de formatação
    │   │   ├── services/           # Serviços de API globais (HTTP)
    │   │   ├── utils/              # Serviços de funções úteis
    │   │   └── validators/         # Validadores de dados
    │   ├── app.component.ts        # Componente raiz
    │   ├── app.config.ts           # Módulo principal
    │   └── app.routes.ts           # Rotas da aplicação
    ├── assets/
    │   └── styles/                 # Estilos globais e variáveis SCSS
    ├── environments/               # Configurações de ambiente
    │   ├── environment.ts
    │   ├── environment.development.ts
    │   └── environment.production.ts
    ├── index.html
    ├── main.ts
    └── styles.scss
```

## 🚀 Executando localmente

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

- Angular CLI
- npm

### 🔧 Instalação

1. Clone o projeto utilizando o comando abaixo

    ``` bash
    git clone https://github.com/felipesilva15/portfolio.git
    ```

2. Acesse a pasta dos fonts deste projeto

    ```bash
    cd portfolio
    ```

3. Instale as dependências do projeto

    ```bash
    npm install
    ```

4. Inicie a aplicação

    ```bash
    ng serve --open
    ```

5. Acesse a aplicação em <http://localhost:4200>.

## 🐳 Executando com Docker

```bash
# Build da imagem e execução do container
docker compose up -d
```

Após completar a execução, basta acessar a aplicação em <http://localhost:8081>.

## 🧪 Testes

Para realizar os testes automatizados, execute o comando de testes do Angular (Karma + Jasmine).

```bash
npm run test
```

## ✒️ Autores

- **Felipe Silva** - *Desenvolvedor e mentor* - [felipesilva15](https://github.com/felipesilva15)

## 📄 Licença

Este projeto está sob a licença (MIT) - veja o arquivo [LICENSE](https://github.com/felipesilva15/portfolio/blob/main/LICENSE) para detalhes.

---

Documentado por [Felipe Silva](https://github.com/felipesilva15) 😊
