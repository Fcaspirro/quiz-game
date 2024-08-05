import { atualizarStatus } from '../UpdateStatus/index.module';

export function pegarPerguntas(callback) {
  $('#loader').show();
  atualizarStatus("Buscando perguntas e respostas", "Aguardando resposta da API");

  $.ajax({
    url: "https://opentdb.com/api.php?amount=6&category=11&type=multiple",
    type: "GET",
    dataType: "json",
    success: function (data) {
        if (data.response_code === 0) {
          callback(data.results);
        } else {
          let mensagemErro = '';
          switch (data.response_code) {
            case 1:
              mensagemErro = "Não foram encontrados resultados. A API não possui perguntas suficientes para sua consulta.";
            break;
            case 2:
              mensagemErro = "Parâmetro inválido. Argumentos passados não são válidos.";
            break;
            case 3:
              mensagemErro = "Token não encontrado. O token da sessão não existe.";
            break;
            case 4:
              mensagemErro = "Token vazio. O token da sessão retornou todas as perguntas possíveis para a consulta. É necessário redefinir o token.";
            break;
            case 5:
              mensagemErro = "Limite de taxa excedido. Muitas requisições foram feitas. Cada IP só pode acessar a API uma vez a cada 5 segundos.";
            break;
            default:
              mensagemErro = "Erro desconhecido. Verifique a documentação da API.";
            break;
            }
          atualizarStatus(mensagemErro, "Erro na requisição");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        atualizarStatus("Houve um erro inesperado. Por favor, tente novamente mais tarde!", "Erro inesperado");
        console.log("Erro na requisição:", jqXHR, textStatus, errorThrown);
      }
  });
}
