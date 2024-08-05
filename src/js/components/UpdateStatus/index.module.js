export function atualizarStatus(mensagem, estagio) {
  $('#status').html(`<strong>${estagio}</strong> ${mensagem}`).css('font-size', '1.6rem');
}
