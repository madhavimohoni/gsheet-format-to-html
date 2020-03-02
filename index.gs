/**
 * Converts formatting of the range to HTML.
 *
 * @param {range} input Formatted range.
 * @return Corresponding text with HTML tags.
 * @customfunction
 */
function getHtmlFromCell(range) {

  var prevFormat;
  var richText = range.getRichText();
  var runs = richText.getRuns();
  var html = "";

  for (var i = 0; i < runs.length; i++) {

    var run = runs[i];
    var text = run.getText();
    var style = run.getTextStyle();
    var currFormat = {
      b: style.isBold(),
      i: style.isItalic(),
      u: style.isUnderline(),
      s: isStrikethrough()
    };

    // Setting tags
    for (var tag in currFormat) {

      // Closing tag
      if (prevFormat !== undefined && prevFormat[tag] && !currFormat[tag]) {
        html += "</" + tag + ">";
      }

      // Opening tag
      if ((prevFormat === undefined || !prevFormat[tag]) && currFormat[tag]) {
        text = "<" + tag + ">" + text;
      }

      // Last run 
      if (currFormat[tag] && i == runs.length - 1) {
        text += "</" + tag + ">";
      }
    }

    html += text;
    prevFormat = currFormat;
  }

  return html;
}