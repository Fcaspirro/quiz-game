export function updateStatus(message, stage) {
  $('#status').html(`<strong>${stage}</strong> ${message}`).css('font-size', '1.6rem');
}
