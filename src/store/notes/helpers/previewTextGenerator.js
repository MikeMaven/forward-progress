export default function previewTextGenerator(note, type) {
  let maxLength;
  if (type === 'note') {
    maxLength = 30;
  } else if (type === 'blog') {
    maxLength = 60;
  }

  if (note.body !== null) {
    let parsedText = note.body
      .replace(/<[^>]*>?/gm, '')
      .substring(0, maxLength);
    if (parsedText.length > maxLength - 1) {
      parsedText += '...';
    }
    if (type === 'note') {
      var date = new Date(note.createdAt);
      const parsedDate =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      return parsedDate + ' - ' + parsedText;
    } else if (type === 'blog') {
      return parsedText;
    }
  } else {
    return null;
  }
}
