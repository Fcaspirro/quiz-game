export function updateStars(score) {
  const stars = $('.score-stars img');
  const fullStar = 'assets/svg/star-fill.svg';
  const halfStar = 'assets/svg/star-half.svg';
  const emptyStar= 'assets/svg/star-outline.svg';
  const totalStars = stars.length;
  const scoreForEachStar = 100 / totalStars;

  stars.removeClass('show-stars');

  for (let i = 0; i < totalStars; i++) {
    let inferiorLimitScore = scoreForEachStar * i;
    let upperLimitScore = scoreForEachStar * (i + 1);
    let percentageStar = (score - inferiorLimitScore) / scoreForEachStar;

    if (score >= upperLimitScore) {
      stars.eq(i).attr('src', fullStar);
    } else if (percentageStar >= 0.75) {
      stars.eq(i).attr('src', fullStar);
    } else if (percentageStar >= 0.25) {
      stars.eq(i).attr('src', halfStar);
    } else {
      stars.eq(i).attr('src', emptyStar);
    }
  }

  setTimeout(function() {
    stars.addClass('show-stars');
  }, 100);
}
