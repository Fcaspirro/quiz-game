import { atualizarStatus } from '../UpdateStatus/index.module';

let traducoesPendentes = 0;
let erroOcorrido = false;

const apiKey = import.meta.env.VITE_FAST_TRANSLATE_API_KEY;

export function traduzirTexto(texto, callback, estagio) {
    traducoesPendentes++;
    atualizarStatus(estagio, "Traduzindo texto");

    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://fast-translate-api1.p.rapidapi.com/translate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'fast-translate-api1.p.rapidapi.com',
        },
        processData: false,
        data: JSON.stringify({
            "from_lang": "en",
            "to_lang": "pt",
            "text": texto
        })
    };

    $.ajax(settings)
        .done(function (response) {
            if (response.result) {
                const textoTraduzido = response.result.replace(/"/g, "'");
                callback(textoTraduzido);
            } else {
                console.error("Erro na tradução: Resposta inválida");
                atualizarStatus("Erro na tradução: Resposta inválida", "Erro");
                erroOcorrido = true; 
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            let mensagemErro = "Erro na tradução: ";
            if (jqXHR.status === 429) {
                mensagemErro = "Limite de requisições excedido. Por favor, tente novamente mais tarde!";
            } else if (jqXHR.status === 404) {
                mensagemErro = "A URL solicitada não foi encontrada. Por favor, tente novamente mais tarde!";
            } else {
                mensagemErro = "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde!";
            }
            console.error(mensagemErro, jqXHR, textStatus, errorThrown);
            atualizarStatus(mensagemErro, "Erro");
            erroOcorrido = true; 
        })
        .always(function () {
            traducoesPendentes--;
            if (traducoesPendentes === 0) {
                if (!erroOcorrido) {
                    $('#loader').hide();
                }
                erroOcorrido = false;
            }
        }
    );
}
