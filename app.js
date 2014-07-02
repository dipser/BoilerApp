// forEach fÃ¼r document.querySelectorAll('.class')
// Beispiel: document.querySelectorAll('.class').forEach(function(e){  });
// Quelle: https://gist.github.com/DavidBruant/1016007
NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;


document.onreadystatechange = function () {


};
