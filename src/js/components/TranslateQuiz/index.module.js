import { updateStatus } from '../UpdateStatus/index.module';

let translationsPending = 0;
let noteError = false;

const apiKey = import.meta.env.VITE_FAST_TRANSLATE_API_KEY;

export function textTranslate(text, callback, stage) {
    translationsPending++;
    updateStatus(stage, "Traduzindo texto");

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
            "text": text
        })
    };

    $.ajax(settings)
        .done(function (response) {
            if (response.result) {
                const translatedText = response.result.replace(/"/g, "'");
                callback(translatedText);
            } else {
                console.error("Erro na tradução: Resposta inválida");
                updateStatus("Erro na tradução: Resposta inválida", "Erro");
                noteError = true; 
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            let errorMessage = "Erro na tradução: ";
            if (jqXHR.status === 429) {
                errorMessage = "Limite de requisições excedido. Por favor, tente novamente mais tarde!";
            } else if (jqXHR.status === 404) {
                errorMessage = "A URL solicitada não foi encontrada. Por favor, tente novamente mais tarde!";
            } else {
                errorMessage = "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde!";
            }
            console.error(errorMessage, jqXHR, textStatus, errorThrown);
            updateStatus(errorMessage, "Erro");
            noteError = true; 
        })
        .always(function () {
            translationsPending--;
            if (translationsPending === 0) {
                if (!noteError) {
                    $('#loader').hide();
                }
                noteError = false;
            }
        }
    );
}
