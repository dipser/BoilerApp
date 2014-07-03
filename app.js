// forEach fÃ¼r document.querySelectorAll('.class')
// Beispiel: document.querySelectorAll('.class').forEach(function(e){  });
// Quelle: https://gist.github.com/DavidBruant/1016007
// https://coderwall.com/p/jcmzxw
NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;



// Open link (Cordova-InAppBrowser-Plugin needed)
window.openInAppBrowser = function(uri) {
  window.open(encodeURI(uri), '_blank', 'location=yes,closebuttoncaption=Fertig,enableViewportScale=yes');
};


// WebApp: Links im externen Browser Ã¶ffnen
// http://stackoverflow.com/questions/7930001/force-link-to-open-in-mobile-safari-from-a-web-app-with-javascript#answer-8833025
// <div id="foz" data-href="http://www.google.fi">Google</div>
window.openInBrowserLinkListener = function(id) {
  document.getElementById( id ).addEventListener("click", function(evt) {
      var a = document.createElement('a');
      a.setAttribute("href", this.getAttribute("data-href"));
      a.setAttribute("target", "_blank");
      var dispatch = document.createEvent("HTMLEvents");
      dispatch.initEvent("click", true, true);
      a.dispatchEvent(dispatch);
  }, false);
};



document.onreadystatechange = function () {


};
