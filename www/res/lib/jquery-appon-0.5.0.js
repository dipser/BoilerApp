/*! jQuery-Appon v0.5.0 | (c) 2014 Hermand | dipser.github.org/jquery-appon/ */

;(function( $ ){


	/*if (window.applicationCache) {
		applicationCache.addEventListener('updateready', function() {        
			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
				window.applicationCache.swapCache();
				console.log("appcache updated");
				window.location.reload();
			}
		});
	}*/


	// In Firefox kommt es häufiger zu Fehlern. (Weshalb? Fehlerhaftes Firefox-Profil?)
	try { localStorage.getItem(''); }
	catch(e){
	  if (e.name=="NS_ERROR_FILE_CORRUPTED") {
	    console.log('localStorage failure... again.');
	    localStorage.clear();
	    window.location.reload();
	  }
	}




	$.fn.appon = function(){
		$.fn.appon.prototype.init.apply(this, arguments);
		return this;
	};
	$.fn.appon.prototype = {
		'config' : null,
		'isInit' : false,
		'isDeviceReady' : false,
		'pages' : [],
		'pageshistory': [], // Stack of all called pages
		'data' : {}, // Storedata
		'iScroll' : [],
		'init' : function _init() {
			console.log('Appon ist gestartet!', arguments);
			var Appon = window['Appon'] = $.fn.appon.prototype;


			// Preloads...
			if (typeof arguments[0] !== 'undefined' && arguments[0] == 'config') {
				Appon.config = arguments[1];

				// Meta
				for (var i = 0; i < Appon.config.meta.length; i++) {
					var meta = Appon.config.meta[i];
					var metaTag = $('meta[name="'+meta.name+'"]');
					if ( metaTag.length ) {
						metaTag.attr('content', meta.content);
					} else {
						$('<meta name="'+meta.name+'" content="'+meta.content+'" />').appendTo('head');
					}
				}

				// Icons
				for (var i = 0; i < Appon.config.icons.length; i++) {
					var icon = Appon.config.icons[i];
					var iconTag = $('link[sizes="'+icon.sizes+'"][rel="'+icon.rel+'"]');
					if ( iconTag.length ) {
						iconTag.attr('href', icon.href);
					} else {
						$('<link sizes="'+icon.sizes+'" rel="'+icon.rel+'" href="'+icon.href+'" />').appendTo('head');
					}
				}

				// Startups
				for (var i = 0; i < Appon.config.startups.length; i++) {
					var startup = Appon.config.startups[i];
					var startupTag = $('link[rel="'+startup.rel+'"][media="'+startup.media+'"]');
					if ( startupTag.length ) {
						startupTag.attr('href', startup.href);
					} else {
						$('<link rel="'+startup.rel+'" media="'+startup.media+'" href="'+startup.href+'" />').appendTo('head');
					}
				}

				// Data-Sources laden
				for (var i = 0; i < Appon.config.data.length; i++) {
					var data = Appon.config.data[i];
					if ('startup' in data && data.startup) {
						Appon.Data.get(data.name);
					}
				}

				return;
			}

			// Set DeviceReady
			if (!Appon.isDeviceReady) {
				if (arguments[0]=='deviceready' || !Appon.Device.isNative()) {
					console.log('Appon Gerät ist fertig.');
					Appon.isDeviceReady = true;
				}
			}

			// Lade Skript, wenn "page" angegeben und "config" leer ist
			if (typeof arguments[0] !== 'undefined' && arguments[0].charAt(0)=='/'
				&& typeof arguments[1] === 'undefined') {
				var page = arguments[0];
				var isLoaded = ($('script[data-src="'+page+'"]').length) ? true : false;
				if (!isLoaded) {//if script not loaded yet...
					$.ajax({url:Appon.config.pagesroot+page+'.js', dataType:'text', cache:true}).done(function(data, textStatus, jqxhr) {//?_t='+(+(new Date()))
						console.log('Appon Skript ist fertig geladen.', arguments);
						//console.log( data ); // Data returned
						//console.log( textStatus ); // success
						//console.log( jqxhr.status ); // 200
						$('head').append('<script data-src="'+page+'">'+data+'</script>');
					}).fail(function(jqxhr, settings, exception){
						console.error('Appon Skript "'+Appon.config.pagesroot+page+'.js" wurde nicht geladen.', arguments);
						//$('head').append('<script data-src="'+page+'" src="'+Appon.config.pagesroot+page+'.js"></script>');
					});
				} else {
					for (var i = 0; i < Appon.pages.length; i++) {
						if (Appon.pages[i].page == page) {
							arguments[1] = Appon.pages[i].config; // Damit die if-Afrage "Seite starten" klappt
						}
					}
				}
			}

			// Seite starten, wenn "page" angegeben und "config" angegeben
			if (typeof arguments[0] !== 'undefined' && arguments[0].charAt(0)=='/'
				&& typeof arguments[1] !== 'undefined') {
				var page = arguments[0];
				var config = arguments[1];

				// Ablegen in History
				Appon.pageshistory.push(page);

				// Speichern
				var found = false;
				for (var i = 0; i < Appon.pages.length; i++) {
					if (Appon.pages[i].page == page) {
						found = true;
					}
				}
				if (!found) {
					Appon.pages.push({page:page, config:config});
				}
				//if (history.lastpage!=page) {
					
					// Skript vor der Ausgabe starten
					if ('pre' in config) config.pre();




					if (!$('section[data-page="'+page+'"]').length) {
						var html = 'html' in config ? config.html : '';
						var footerClasses = (('footer' in config && config.footer===false)
							|| ('hidden' in config.footer && config.footer.hidden) ? ' x-hidden ' : '');
						var section = $([
							'<section data-page="'+page+'">',
								'<header></header>',
								'<section>'+html+'</section>',
								'<footer></footer>',
							'</section>'
						].join(''));

						if (config.hasOwnProperty('cls')) {
							section.addClass(config.cls);
						}
						if (config.hasOwnProperty('header')) {
							if (config.header===false || ('hidden' in config.header && config.header.hidden)) {
								section.find('>header').addClass('x-hidden');
							}
							if (config.header.hasOwnProperty('html')) {
								section.find('>header').html(config.header.html);
							}
						}
						if (config.hasOwnProperty('footer')) {
							if (config.footer===false || ('hidden' in config.footer && config.footer.hidden)) {
								section.find('>footer').addClass('x-hidden');
							}
							if (config.footer.hasOwnProperty('html')) {
								section.find('>footer').html(config.footer.html);
							}
						}
						$('main>section:last').after(section[0].outerHTML);
					}



					// Allgemeines Skript nach der Ausgabe
					var q = Appon.Utils.hashSizzle().query;
					if ('run' in config) config.run(q);

					// Abschließendes Skript
					if ('post' in config) config.post();


					Appon.Internal.Scroll.refresh();



					var back = false;
					var oldpage = $('main > section.page-current').length && typeof $('main > section.page-current').data('page') !== 'undefined' ? $('main > section.page-current').data('page') : '/';
					oldpage = oldpage == '' ? '/' : oldpage;
					var newpage = page;
					oldpage = oldpage.replace(/\/index$/, '/');
					newpage = newpage.replace(/\/index$/, '/');
					// Zurück-Funktionalität nach: Vorseite (newpage == pre-oldpage)
					pre_oldpage = '';
					if ( Appon.pageshistory.length >= 3 && Appon.pageshistory[ Appon.pageshistory.length - 3 ] && (oldpage.indexOf(newpage) === 0) ) {
						pre_oldpage = Appon.pageshistory[ Appon.pageshistory.length - 3 ];
						pre_oldpage = pre_oldpage.replace(/\/index$/, '/');
						if (pre_oldpage == newpage) {
							back = true;
						}
					}
					// Zurück-Funktionalität nach: Verzeichnisstruktur
					if ( oldpage.indexOf(newpage) === 0 && oldpage != newpage ) {
					    back = true;
					}
					//console.log( oldpage +' == '+ newpage +' => '+ back );
					// TODO: if (browser-back-btn-pressed) { back = true; } // browser-back-btn-pressed

					if ($('main > section.page-startup.page-current').length) {
						$('main > section.page-current').removeClass('page-current');
						$('main > section[data-page="'+page+'"]').css({opacity:0}).addClass('page-current').transition({opacity: 1, duration: 1000});
						$('main > section.page-startup').css({left:'-100%'});

					} else {
						if ( !back ) {
							$('main > section.page-current').removeClass('page-current').css({left:"0%"}).transition({left: "-100%", opacity: 0.5, duration: 600});
							if ($('section[data-page="'+page+'"]').length) {
								$('main > section[data-page="'+page+'"]').addClass('page-current').transition({left: "100%", opacity: 1, duration: 0}).transition({left: "0%", duration: 300, easing: 'easeOutQuart'});
							}
						} else { // 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'
							$('main > section.page-current').removeClass('page-current').css({left:"0%"}).transition({left: "100%", opacity: 0.5, duration: 600});
							if ($('section[data-page="'+page+'"]').length) {
								$('main > section[data-page="'+page+'"]').addClass('page-current').transition({left: "-100%", opacity: 1, duration: 0}).transition({left: "0%", duration: 300, easing: 'easeOutQuart'});
							}
						}
					}



				//}
			}



			// Initialized
			if (!Appon.isInit) {
				console.log('Appon ist jetzt initialisiert! ');
				Appon.isInit = true;

				// main.js Skript laufen lassen


				// iScroll
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				//console.log('------------init');
				//Appon.Internal.Scroll.init();
				

				// Start Hashchange observer
				//window.aaddEventListener('hashchange', function _hashchange() {}, false);
				$(window).on('hashchange', function() {
					var page = Appon.Utils.hashSizzle().pathRaw;
					if (page == '' || page == '/') { page = '/index'; }
					console.log('Appon Hashchange', page);
					Appon.init(page);
				});//, false);
				//window.dispatchEvent(new Event('hashchange'));
				$(window).trigger('hashchange');
			}

			//return Appon; // Für Zugriff auf Utils, Device,...
		},
		'main' : function() {

		},
		'Internal' : {
			'Scroll' : {
				init : function() {
					window.setTimeout(function(){
						if ($('.scrollwrap').length) {
							$.fn.appon.prototype.iScroll = new IScroll('.scrollwrap', { mouseWheel: true, click: true, resizePolling:true, checkDOMChanges: true });
							//$.fn.appon.prototype.iScroll.refreshOnContentResize();
						}
					}, 100);
					
				},
				refresh : function(page){
					page = typeof page !== 'undefined' ? '[data-page="'+page+'"]' : ''; // Default
					window.setTimeout(function(){
						if ($(page+' .scrollwrap').length) {
							$(page+' .scrollwrap').each(function(){
								$.fn.appon.prototype.iScroll = new IScroll(this, { mouseWheel: true, click: true, resizePolling:true, checkDOMChanges: true });
							});
            			}
					}, 250);
				}
			}
		},
		'Data': {
			get: function(name, callback, refresh) {
				callback = typeof callback !== 'undefined' ? callback : function(){}; // Default
				refresh = typeof refresh !== 'undefined' ? refresh : false; // Default
				for (var i in config.data) {
					var data = config.data[i];
					if (name == data.name) {
						var notset = (name in window || name in localStorage) ? false : true;
						if (refresh || notset) { // New-Data
							$.ajax(data.load).done(function(responsedata){
								if (data.store.toLowerCase()=='localstorage') {
									localStorage.setItem(name, JSON.stringify(responsedata));
								} else { // window/global
									window[name] = responsedata;
								}
								callback(responsedata);
							});
						} else { // Old-Data
							if (data.store.toLowerCase()=='localstorage') {
								responsedata = JSON.parse(localStorage.getItem(name));
							} else { // window/global
								responsedata = window[name];
							}
							callback(responsedata);
						}
					}
				}

			}
		},
		'Utils' : {
			isset : function _isset(variable, key) {
				if ( typeof variable === 'object' ) { return variable.hasOwnProperty(key); }
				return ( typeof variable !== 'undefined' && variable );
			},
			hashSizzle : function _hashSizzle(hash){
				var hash = typeof hash !== 'undefined' ? hash : window.location.hash;
				var splitRegExp = new RegExp('#([^#\\?\\n]*)\\??(.*)');
				var split = hash.match(splitRegExp);
				var pathRaw = (split && split[1]!==null ? split[1] : '');
				var queryRaw = (split && split[2]!==null ? split[2] : '');
				var path = pathRaw.split('/').splice(1);
				var query = {};
				var querySplit = queryRaw.split('&');
				for (var q in querySplit) {
					var qSplit = querySplit[q].split('=');
					query[qSplit[0]] = (qSplit.length==2) ? qSplit[1] : '';
				}
				return {
					'path' : path,
					'query' : query,
					'pathRaw' : pathRaw,
					'queryRaw' : queryRaw
				};
			},
			addScheme: function _addScheme(url, scheme) {
				scheme = typeof scheme !== 'undefined' ? scheme : 'http://'; // Default
				if (url.match(/^(https?|ftp|tel|mailto)/i) || url.length == 0) {
					return url;
				}
				return scheme + url;
			}
		},
		'Device' : {
			isNative : function _isNative() {return false;
				return (document.URL.match(/(https?:\/\/)(localhost)?/) != null);
			},
			isAndroid : function() {
				return /Android/i.test(navigator.userAgent);
			},
			isBlackBerry : function() {
				return /BlackBerry/i.test(navigator.userAgent);
			},
			isiOS : function() {
				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
			},
			isWindows : function() {
				return /IEMobile/i.test(navigator.userAgent);
			}
		}
	};
	$.fn.appon.prototype.init.prototype = $.fn.appon;






	$(function(){
		setTimeout(function(){
			$(document).appon('docready');
		}, 0); // Simuliere Laden
	});
	//document.addEventListener("deviceready", function x(){ $(document).appon('deviceready'); }, false);
})( jQuery );