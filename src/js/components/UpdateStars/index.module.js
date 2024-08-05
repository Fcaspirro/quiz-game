export function atualizarEstrelas(pontuacao) {
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
