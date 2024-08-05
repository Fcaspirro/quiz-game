import { shuffle } from './components/ShuffleQuestionsAndAnswers/index.module';
import { pegarPerguntas } from './components/ConsultQuiz/index.module';
import { traduzirTexto } from './components/TranslateQuiz/index.module';
import { atualizarEstrelas } from './components/UpdateStars/index.module';
import { atualizarStatus } from './components/UpdateStatus/index.module';

$(function() {
    let contadorAcertos = 0;
    let totalPerguntas = 6;
    let perguntasComRespostas = {};
    let respostasEscolhidas = [];

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
            pegarPerguntas(iniciarQuiz);
        });
    }

    pegarPerguntas(iniciarQuiz);
});
