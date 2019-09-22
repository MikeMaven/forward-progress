export default function previewTextGenerator(note) {
  if (note.body !== null) {
    let parsedText = note.body.replace(/<[^>]*>?/gm, '').substring(0, 30);
    if (parsedText.length > 29) {
      parsedText += '...';
    }
    var date = new Date(note.createdAt);
    const parsedDate =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    return parsedDate + ' - ' + parsedText;
  } else {
    return null;
  }
}
