/**
 * @author Aurel Hermand - hermand@stockwerk2.de - STOCKWERK2
 */

// Extending objects
Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};


// Clear localStorage everyday
function autoClearLocalStorage() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var today = year+''+month+''+day;
  if (localStorage.getItem('today') === null) {
      // Set localstorage timestamp
      localStorage.setItem('today', today);
  } else {
      // Clear localstorage if not today
      if (localStorage.getItem('today') != today) {
        localStorage.clear();
        localStorage.setItem('today', today);
      }
  }
}
if (navigator.onLine) { autoClearLocalStorage(); }


// Unix Zeitstempel (=ohne ms) mit der Möglichkeit Werte auf 0 zu setzen
function unix_timestamp(y, m, d, h, i, s) {
  var now = new Date();
  if (y==false) { now.setFullYear(0); }
  if (m==false) { now.setMonth(0); }
  if (d==false) { now.setDate(0); }
  if (h==false) { now.setHours(0); }
  if (i==false) { now.setMinutes(0); }
  if (s==false) { now.setSeconds(0); }
  return Math.round(now.getTime() / 1000);
}


// Open link (Cordova-InAppBrowser-Plugin needed)
window.openInAppBrowser = function(uri) {
  window.open(encodeURI(uri), '_blank', 'location=yes,closebuttoncaption=Fertig,enableViewportScale=yes');
};


// WebApp: Links im externen Browser öffnen
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



function datumFormat(datum) { // datum: 2014-07-16 => return: Mittwoch, 16. Juli 2014
  var dayString = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var monthString = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var d = datum.split('-');
  var year = d[0], month = d[1], day = d[2];
  var datumArg = new Date(parseInt(year, 10), parseInt(month, 10)-1, parseInt(day, 10));
  var datesDay = datumArg.getDay(); // 0-6

  var d = new Date();
  var today = new Date( d.getFullYear(), d.getMonth(), d.getDate() );
  var tomorrow = new Date( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
  var dayaftertomorrow = new Date( d.getFullYear(), d.getMonth(), d.getDate() + 2 );
  if (datumArg.toString() == today.toString()) { return 'Heute'; }
  if (datumArg.toString() == tomorrow.toString()) { return 'Morgen'; }
  if (datumArg.toString() == dayaftertomorrow.toString()) { return 'Übermorgen'; }

  return dayString[datesDay] +', '+ day +'. '+ monthString[parseInt(month, 10)-1] +' '+ year;
}




var isMobile = {
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};




function addScheme(url, scheme) {
  scheme = typeof scheme !== 'undefined' ? scheme : 'http://'; // Default
  if (url.match(/^(https?|ftp|tel|mailto)/i) || url.length == 0) {
    return url;
  }
  return scheme + url;
}


function closest(elem, selector) {
   var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
    while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
            return elem;
        } else {
            elem = elem.parentElement;
        }
    }
    return false;
}


/*! Tocca.js v0.0.8 || Gianluca Guarini */
// https://github.com/GianlucaGuarini/Tocca.js
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0,j=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},k=function(a){return a.targetTouches?a.targetTouches[0]:a},l=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},m=!1,n=b.SWIPE_TRESHOLD||80,o=b.TAP_TRESHOLD||200,p=b.TAP_PRECISION/2||30,q=0;i=b.JUST_ON_TOUCH_DEVICES?!0:i,j(a,i?"touchstart":"mousedown",function(a){var b=k(a);e=c=b.pageX,f=d=b.pageY,m=!0,q++,clearTimeout(g),g=setTimeout(function(){e>=c-p&&c+p>=e&&f>=d-p&&d+p>=f&&!m&&l(a.target,2===q?"dbltap":"tap",a),q=0},o)}),j(a,i?"touchend":"mouseup",function(a){var b=[],g=f-d,h=e-c;if(m=!1,-n>=h&&b.push("swiperight"),h>=n&&b.push("swipeleft"),-n>=g&&b.push("swipedown"),g>=n&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];l(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}}),j(a,i?"touchmove":"mousemove",function(a){var b=k(a);c=b.pageX,d=b.pageY})}(document,window);



// forEach für document.querySelectorAll('.class')
// Beispiel: document.querySelectorAll('.class').forEach(function(e){  });
// Quelle: https://gist.github.com/DavidBruant/1016007
NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

