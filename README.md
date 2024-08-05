﻿﻿﻿﻿﻿<h3 align="center">
	<img height="60px" alt="Logo Quiz Game" title="Logo Quiz Game" src="/assets/img/brand.jpg"/>
</h3>
 
<h5 align="center"> 
  <b>✅ Completo</b> | <b>✅ Responsivo
</h5> 

---

## Descrição
Projeto desenvolvido de um game quiz. Neste projeto foram utilizados duas API's em conjunto para funcionamento do game, uma para a coleta das perguntas e respostas da API <a href="https://opentdb.com/">Open Trivia DB</a> e outra API <a href="https://rapidapi.com/dilbarov03-wgXDPgLAAhK/api/fast-translate-api1">Fast Translate API</a> para tradução das perguntas e respostas coletadas.<br><br>
O game trata-se de um quiz com o genêro de filmes, com o total de 6 perguntas de múltiplas escolhas com apenas uma escolha correta. Ao final, gera um resultado completo de acertos e erros.

---

<h2 align="left"> 
  <b>Índice</b>
</h2> 

- :eye: [Demonstração](#demonstração)
- :dizzy: [Interface](#interface)
- :computer: [Stacks](#stacks)
- :mag_right: [Como Usar](#como-rodar-o-projeto)

---

## Demonstração

 <div align="center">
   <img width="400px" alt="Quiz Game" title="Quiz Game" src="/assets/github/capture1.jpg"/> 
   <img width="400px" alt="Quiz Game Result" title="Quiz Game Result" src="/assets/github/capture2.jpg"/> 
 </div><br>
  
---

## Interface

#### Funcionalidades
- **Quiz:** escolha uma das quatro respostas para cada uma das seis perguntas.
- **Resultado parcial:** resultado parcial imediato de acertos no canto inferior da tela.
- **Resultado completo:** demonstração de acertos e erros para cada resposta selecionada ao final do game quiz, assim como pontuação gamificada através de estrelas e % de acertos.
- **Reiniciar:** possibilidade de reiniciar o game quiz ao final do preenchimento das respostas.

#### Usabilidade
- **Análise detalhada:** Ao final do quiz, os usuários recebem uma visão detalhada de suas respostas, incluindo acertos e erros, para ajudar na revisão e aprendizado.
- **Feedback imediato:** O resultado parcial é exibido em tempo real, garantindo que os usuários recebam feedback sobre seu desempenho conforme respondem às perguntas.
- **Loading inicial:** Um loading inicial é exibido durante o processo de requisição das APIs, garantindo que o usuário saiba que a aplicação está carregando e processando os dados.
- **Tratamento de erros:** Durante o processo de requisição das APIs, caso haja algum erro durante a requisição, a aplicação para e o usuário recebe a informação do erro como status.
- **Pontuação gamificada:** O sistema de pontuação com estrelas e porcentagem oferece uma forma divertida e motivacional de visualizar o desempenho.
- **Responsividade:** game quiz totalmente otimizado para funcionar em diferentes dispositivos e tamanhos de tela.
- **Reinício fácil:** os usuários podem reiniciar o quiz rapidamente para tentar novamente ou praticar mais.
  
---

## Stacks

| Desenvolvimento                      | API                                                                                       | IDE                                                  |
|--------------------------------------|-------------------------------------------------------------------------------------------|------------------------------------------------------|
| HTML                                 | [Open Trivia DB](https://opentdb.com/)                                                    | [Visual Studio Code](https://code.visualstudio.com/) |
| CSS                                  | [Fast Translate API](https://rapidapi.com/dilbarov03-wgXDPgLAAhK/api/fast-translate-api1) |                                                      |
| [JavaScript](https://javascript.com) |                                                                                           |                                                      |
| [Node.js](https://nodejs.org/pt)     |                                                                                           |                                                      |
| [Vite](https://vitejs.dev/)          |                                                                                           |                                                      |

---

## Como rodar o projeto

#### Pré-requisitos:
- Node.JS
- Configuração da Fast Translate API
<br>

#### Clone o projeto em sua máquina:

```bash
  git clone https://github.com/Fcaspirro/quiz-game.git
```
<br>

#### Configuração da API - Fast Translate API:
1. Acesse o site: <a href="https://rapidapi.com/auth/sign-up">Rapid API</a> e crie sua conta caso ainda não tenha.
2. Acesse sua conta e entre no link correspondente da <a href="https://rapidapi.com/dilbarov03-wgXDPgLAAhK/api/fast-translate-api1">Fast Translate API</a>
3. Escolha um plano e se inscreva.
4. Vá ao menu 'Apps' e adicione um novo app em 'Add New App'.
5. Em 'Authorization' copie sua API key.
6. Retorne ao link do passo 2 e clique em 'Open Playground' no menu lateral.
7. No menu de selecionar 'App' selecione o seu app criado no passo 4.
<br>

#### Configuração e visualização do projeto:

1. Abra a pasta no seu editor de códigos.
2. Instale as dependências do node.js pelo terminal:
 
```bash
  npm install
```

3. Renomeie o arquivo .env.sample para .env e substitua "SUA_API_AQUI" pela sua API key copiada anteriormente.
4. Inicie o vite com o comando pelo terminal:

```bash
  npm run dev
```

5. Divirta-se! 😄
<br>

---

<div align="center">

## 👩🏻‍💻 Autor | <i>Author</i> <br>

  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/fcaspirro">
          <img src="https://avatars.githubusercontent.com/u/89426460?v=4" width="100px;" title="Autor Fabio Caspirro" alt="Foto de Perfil do GitHub - Fabio Caspirro"/><br>
          <sub>
            <b>Fabio Caspirro</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>
 
<h4 align="center">
  Made by: Fabio Caspirro 😄 | <a href="mailto:fabio_caspirro@hotmail.com">Contato</a>
</h4>
<p align="center">
  <a href="https://www.linkedin.com/in/fabio-caspirro/">
    <img alt="Fabio Caspirro" src="https://img.shields.io/badge/LinkedIn-Fabio_Caspirro-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
