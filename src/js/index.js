import { shuffle } from './components/ShuffleQuestionsAndAnswers/index.module';
import { getQuestionsAndAnswers } from './components/ConsultQuiz/index.module';
import { textTranslate } from './components/TranslateQuiz/index.module';
import { updateStars } from './components/UpdateStars/index.module';
import { updateStatus } from './components/UpdateStatus/index.module';

$(function() {
    let hitCounters = 0;
    let totalQuestions = 6;
    let questionsWithAnswers = {};
    let chosenAnswers = [];

    function startQuiz(questions) {
        updateStatus("Buscando perguntas e respostas..", "Iniciando Quiz..");
        let questionsContainer = $('#questions-container');
        let answeredQuestions = 0;

        questions.forEach(function (eachQuestion, index) {
            textTranslate(eachQuestion.question, function (translatedQuestion) {
                let rightAnswer = eachQuestion.correct_answer;
        
                textTranslate(rightAnswer, function (correctAnswerTranslated) {
                    let aswers = eachQuestion.incorrect_answers;
                    aswers.push(rightAnswer);
                    aswers = shuffle(aswers);
        
                    let optionsHtml = '';
                    let translationRemaining = aswers.length;
                    aswers.forEach(function (answer) {
                        textTranslate(answer, function (translatedAnswer) {
                            optionsHtml += '<fieldset>' + 
                                '<input type="radio" name="option' + index + '" value="' + translatedAnswer + '"> ' + 
                                '<span>' + translatedAnswer + '</span>' + 
                                '</fieldset>';
        
                            translationRemaining--;
                            if (translationRemaining === 0) {
                                questionsContainer.append(
                                    '<div class="question" data-index="' + index + '">' +
                                    '<h3>' + translatedQuestion + '</h3>' +
                                    '<form class="options">' + optionsHtml + '</form>' +
                                    '</div>'
                                );
        
                                questionsWithAnswers[translatedQuestion] = {
                                    question: translatedQuestion,
                                    rightAnswer: correctAnswerTranslated,
                                    answers: aswers.map(answer => {
                                        return {
                                            text: answer,
                                            translate: answer === rightAnswer ? correctAnswerTranslated : answer,
                                            correct: answer === rightAnswer
                                        };
                                    })
                                };
        
                                $('.question').last().find('input[value="' + correctAnswerTranslated + '"]').prop('checked', false);
        
                                $('.options').last().on('change', function () {
                                    $(this).find('input[type="radio"]').prop('disabled', true);
                                    answeredQuestions++;
                                    if (answeredQuestions === totalQuestions) {
                                        $('#check-result').show();
                                        $('.restart-quiz').show();
                                    }
                                    let chosenAnswer = $(this).find('input[type="radio"]:checked').val();
                                    chosenAnswers.push(chosenAnswer);
                                    if (chosenAnswer === correctAnswerTranslated) {
                                        hitCounters++;
                                        $('#hits').text(hitCounters);
                                    }
                                });
                            }
                        }, "Traduzindo resposta para pt-BR..");
                    });
                }, "Traduzindo resposta correta para pt-BR..");
            }, "Traduzindo pergunta para pt-BR..");
        });

        $('#check-result').on('click', function () {
            let templateHtml = '';
            let score = Math.round((hitCounters / totalQuestions) * 100);

            chosenAnswers.forEach((chosenAnswer, index) => {
                let translatedQuestion = Object.keys(questionsWithAnswers)[index];
                let infoQuestion = questionsWithAnswers[translatedQuestion];

                templateHtml += '<div class="question" data-index="' + index + '">' +
                    '<h5>' + translatedQuestion + '</h5>' +
                    '<h5 class="modal_answer">Resposta correta: ' + infoQuestion.rightAnswer + '</h5>' +
                    '<h5 class="modal_answer">Resposta escolhida: ' + (chosenAnswer === infoQuestion.rightAnswer ? '<span class="icon">&#10004;&#65039;</span>' : '<span class="icon">&#10060;</span>') + ' ' + (chosenAnswer ? chosenAnswer : 'Não respondida') + '</h5>' +
                    '</div>';
            });

            if (score <= 25) {
                $('#percentage-hits').css("color", "#ef4444");
            } else if (score <= 50) {
                $('#percentage-hits').css("color", "#f97316");
            } else if (score <= 75) {
                $('#percentage-hits').css("color", "#facc15");
            } else {
                $('#percentage-hits').css("color", "#a3e635");
            }

            updateStars(score);
            $('#percentage-hits').html(score + '% <span style="color: #f5f5f4; font-weight: bold;">/ 100%</span>');
            $('#result-body').html(templateHtml);
            $('#check-result').modal('show');
        });

        $('.restart-quiz').on('click', function () {
            hitCounters = 0;
            chosenAnswers = [];
            questionsWithAnswers = {};
            $('#questions-container').empty();
            $('#check-result').hide();
            $('.restart-quiz').hide();
            $('#check-result').hide();
            $('#result-body').empty();
            $('.blocker').hide();
            $('#hits').text(hitCounters);
            getQuestionsAndAnswers(startQuiz);
        });
    }

    getQuestionsAndAnswers(startQuiz);
});
