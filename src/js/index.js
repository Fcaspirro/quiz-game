const apiKey = import.meta.env.VITE_FAST_TRANSLATE_API_KEY; //abra o arquivo '.env.sample' e renomeie-o para '.env' e insira sua API em 'SUA_API_AQUI'.

$(function() {
    let contadorAcertos = 0;
    let totalPerguntas = 6;
    let traducoesPendentes = 0;

    let perguntasComRespostas = {};
    let respostasEscolhidas = [];

    function shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    function pegar_perguntas(callback) {
        $('#loader').show();
        atualizarStatus("Buscando perguntas e respostas", "Aguardando resposta da API");
        $.ajax({
            url: "https://opentdb.com/api.php?amount=6&category=11&type=multiple",
            type: "GET",
            dataType: "json",
            success: function (data) {
                callback(data.results);
            },
            error: function () {
                console.log("Erro na requisição");
            },
        });
    }

    function atualizarStatus(mensagem, estagio) {
        $('#status').html(`<strong>${estagio}</strong> ${mensagem}`).css('font-size', '1.6rem');
    }

    function traduzirTexto(texto, callback, estagio) {
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

        $.ajax(settings).done(function (response) {
            if (response.result) {
                const textoTraduzido = response.result.replace(/"/g, "'");
                callback(textoTraduzido);
            } else {
                console.error("Erro na tradução: Resposta inválida");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Erro na tradução:", jqXHR, textStatus, errorThrown);
        }).always(function() {
            traducoesPendentes--;
            if (traducoesPendentes === 0) {
                atualizarStatus("Concluído! Divirta-se", "Tradução finalizada");
                setTimeout(function() {
                    $('#status').text('');
                    $('#loader').hide();
                }, 2000);
            }
        });
    }

    function iniciarQuiz(perguntas) {
        atualizarStatus("Buscando perguntas e respostas..", "Iniciando Quiz..");
        let perguntasContainer = $('#perguntas-container');
        let perguntasRespondidas = 0;

        perguntas.forEach(function (pergunta, index) {
            traduzirTexto(pergunta.question, function (perguntaTraduzida) {
                let respostaCorreta = pergunta.correct_answer;

                traduzirTexto(respostaCorreta, function (respostaCorretaTraduzida) {
                    let respostas = pergunta.incorrect_answers;
                    respostas.push(respostaCorreta);
                    respostas = shuffle(respostas);

                    let opcoesHtml = '';
                    let traducaoRestantes = respostas.length;
                    respostas.forEach(function (resposta) {
                        traduzirTexto(resposta, function (respostaTraduzida) {
                            opcoesHtml += '<fieldset>' + '<input type="radio" name="opcao' + index + '" value="' + respostaTraduzida + '"> ' + '<span>' + respostaTraduzida + '</span>' + '</fieldset>';

                            traducaoRestantes--;
                            if (traducaoRestantes === 0) {
                                perguntasContainer.append(
                                    '<div class="pergunta" data-indice="' + index + '">' +
                                    '<h3>' + perguntaTraduzida + '</h3>' +
                                    '<form class="opcoes">' + opcoesHtml + '</form>' +
                                    '</div>'
                                );

                                perguntasComRespostas[perguntaTraduzida] = {
                                    pergunta: perguntaTraduzida,
                                    respostaCorreta: respostaCorretaTraduzida,
                                    respostas: respostas.map(resposta => {
                                        return {
                                            texto: resposta,
                                            traducao: resposta === respostaCorreta ? respostaCorretaTraduzida : resposta,
                                            correta: resposta === respostaCorreta
                                        };
                                    })
                                };

                                $('.pergunta').last().find('input[value="' + respostaCorretaTraduzida + '"]').prop('checked', false);

                                $('.opcoes').last().on('change', function () {
                                    $(this).find('input[type="radio"]').prop('disabled', true);
                                    perguntasRespondidas++;
                                    if (perguntasRespondidas === totalPerguntas) {
                                        $('#verificarResultado').show();
                                        $('.reiniciarQuiz').show();
                                    }
                                    let respostaEscolhida = $(this).find('input[type="radio"]:checked').val();
                                    respostasEscolhidas.push(respostaEscolhida);
                                    if (respostaEscolhida === respostaCorretaTraduzida) {
                                        contadorAcertos++;
                                        $('#acertos').text(contadorAcertos);
                                    }
                                });
                            }
                        }, "Traduzindo resposta para pt-BR..");
                    });
                }, "Traduzindo resposta correta para pt-BR..");
            }, "Traduzindo pergunta para pt-BR..");
        });

        // Função para gerar pontuação das estrelas
        function atualizarEstrelas(pontuacao) {
            const estrelas = $('.pontuacao-estrelas img');
            const estrelaCheia = 'assets/svg/star-fill.svg';
            const estrelaMetade = 'assets/svg/star-half.svg';
            const estrelaVazia = 'assets/svg/star-outline.svg';
            const totalEstrelas = estrelas.length;
            const pontuacaoPorEstrela = 100 / totalEstrelas;
    
            estrelas.removeClass('aparecer-estrela');
    
            for (let i = 0; i < totalEstrelas; i++) {
                let limiteInferior = pontuacaoPorEstrela * i;
                let limiteSuperior = pontuacaoPorEstrela * (i + 1);
                let percentualEstrela = (pontuacao - limiteInferior) / pontuacaoPorEstrela;
    
                if (pontuacao >= limiteSuperior) {
                    estrelas.eq(i).attr('src', estrelaCheia);
                } else if (percentualEstrela >= 0.75) {
                    estrelas.eq(i).attr('src', estrelaCheia);
                } else if (percentualEstrela >= 0.25) {
                    estrelas.eq(i).attr('src', estrelaMetade);
                } else {
                    estrelas.eq(i).attr('src', estrelaVazia);
                }
            }
    
            setTimeout(function() {
                estrelas.addClass('aparecer-estrela');
            }, 100);
        }  

        $('#verificarResultado').on('click', function () {
            let gabaritoHtml = '';
            let pontuacao = Math.round((contadorAcertos / totalPerguntas) * 100);

            respostasEscolhidas.forEach((respostaEscolhida, indice) => {
                let perguntaTraduzida = Object.keys(perguntasComRespostas)[indice];
                let perguntaInfo = perguntasComRespostas[perguntaTraduzida];

                gabaritoHtml += '<div class="pergunta" data-indice="' + indice + '">' +
                    '<h5>' + perguntaTraduzida + '</h5>' +
                    '<h5 class="modal_resposta">Resposta correta: ' + perguntaInfo.respostaCorreta + '</h5>' +
                    '<h5 class="modal_resposta">Resposta escolhida: ' + (respostaEscolhida === perguntaInfo.respostaCorreta ? '<span class="icon">&#10004;&#65039;</span>' : '<span class="icon">&#10060;</span>') + ' ' + (respostaEscolhida ? respostaEscolhida : 'Não respondida') + '</h5>' +
                    '</div>';
            });

            if (pontuacao <= 25) {
                $('#porcentagem-acertos').css("color", "#ef4444");
            } else if (pontuacao <= 50) {
                $('#porcentagem-acertos').css("color", "#f97316");
            } else if (pontuacao <= 75) {
                $('#porcentagem-acertos').css("color", "#facc15");
            } else {
                $('#porcentagem-acertos').css("color", "#a3e635");
            }

            atualizarEstrelas(pontuacao);
            $('#porcentagem-acertos').html(pontuacao + '% <span style="color: #f5f5f4; font-weight: bold;">/ 100%</span>');
            $('#resultadoBody').html(gabaritoHtml);
            $('#resultadoModal').modal('show');
        });

        $('.reiniciarQuiz').on('click', function () {
            contadorAcertos = 0;
            respostasEscolhidas = [];
            perguntasComRespostas = {};
            $('#perguntas-container').empty();
            $('#verificarResultado').hide();
            $('.reiniciarQuiz').hide();
            $('#resultadoModal').hide();
            $('#resultadoBody').empty();
            $('.blocker').hide();
            $('#acertos').text(contadorAcertos);
            pegar_perguntas(iniciarQuiz);
        });
    }

    pegar_perguntas(iniciarQuiz);
});
