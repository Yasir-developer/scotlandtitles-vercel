export default function capitalizeWords(input) {
  return input?.replace(/(?:^|\s|[-])\S/g, function (match) {
    return match?.toUpperCase();
  });
}
