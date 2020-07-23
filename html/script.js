function encodePreElements() {
  var pre = document.getElementsByTagName('pre');
  for (var i = 0; i < pre.length; i++) {
    var encoded = htmlEncode(pre[i].innerHTML);
    pre[i].innerHTML = encoded;
  }
}

function htmlEncode(value) {
  var div = document.createElement('div');
  var text = document.createTextNode(value);
  div.appendChild(text);
  return div.innerHTML;
}
