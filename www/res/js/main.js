


// http://samo.werfenweng.org/app/appdata.php?i=angebote
// http://samo.stockwerk-net.de/app/appdata.php?i=ausfluege

// Setup
var config = {
	pagesroot: 'pages', // Kein Slash am Ende
	meta: [
		{ name:'viewport', content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' },
		//{ name:'viewport', content:'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
		//{ name:'viewport', content:'initial-scale=1' },
		{ name:'mobile-web-app-capable', content:'yes' }, // Run in full-screen mode.
		{ name:'apple-mobile-web-app-capable', content:'yes' }, // Run in full-screen mode.
		//{ name:'apple-mobile-web-app-status-bar-style', content:'default' },
		//{ name:'apple-mobile-web-app-status-bar-style', content:'black' }, // Make the status bar black with white text.
		//{ name:'apple-mobile-web-app-status-bar-style', content:'black-translucent' },
		{ name:'apple-mobile-web-app-status-bar-style', content:'black-translucent' },
		//{ name:'msapplication-navbutton-color', content:'' },
		//{ name:'theme-color', content:'#0000ff' },
		{ name:'apple-mobile-web-app-title', content:'SHORT-TITLE' },
		{ name:'format-detection', content:'telephone=no' }, // Disable phone number detection.
		{ name:'apple-touch-fullscreen', content:'yes' }
	],
	icons: [ // WebApp-Icons => <link href="/res/img/icons/apple-touch-icon-152x152.png" sizes="152x152" rel="apple-touch-icon" />
		// rel="apple-touch-icon-precomposed" => remove "-precomposed" if you want ios to add effects
		{ href: "res/img/icons/500x500.png", sizes: "500x500", rel: "apple-touch-icon" }, // ???
		{ href: "res/img/icons/152x152.png", sizes: "152x152", rel: "apple-touch-icon" }, // iOS 7 iPad (retina)
		{ href: "res/img/icons/144x144.png", sizes: "144x144", rel: "apple-touch-icon" }, // iOS 6 iPad (retina)
		{ href: "res/img/icons/120x120.png", sizes: "120x120", rel: "apple-touch-icon" }, // iOS 7 iPhone (retina)
		{ href: "res/img/icons/114x114.png", sizes: "114x114", rel: "apple-touch-icon" }, // iOS 6 iPhone (retina)
		{ href: "res/img/icons/76x76.png", sizes: "76x76", rel: "apple-touch-icon" }, // iOS 7 iPad
		{ href: "res/img/icons/72x72.png", sizes: "72x72", rel: "apple-touch-icon" }, // iOS 6 iPad
		{ href: "res/img/icons/57x57.png", sizes: "57x57", rel: "apple-touch-icon" }, // iOS 6 iPhone
		{ href: "res/img/icons/50x50.png", sizes: "50x50", rel: "apple-touch-icon" } // ?ipad?
		// Android?
		//<link rel="icon" sizes="192x192" href="nice-highres.png"> 
	],
	startups: [ // WebApp-Startup => <link href="/static/images/apple-touch-startup-image-640x1096.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
		{ href: "res/img/startup/1536x2008.png", media: "(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" }, // iOS 6 & 7 iPad (retina, portrait)
		{ href: "res/img/startup/1496x2048.png", media: "(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" }, // iOS 6 & 7 iPad (retina, landscape)
		{ href: "res/img/startup/768x1004.png", media: "(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)", rel: "apple-touch-startup-image" }, // iOS 6 iPad (portrait)
		{ href: "res/img/startup/748x1024.png", media: "(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)", rel: "apple-touch-startup-image" }, // iOS 6 iPad (landscape)
		{ href: "res/img/startup/640x1096.png", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" }, // iOS 6 & 7 iPhone 5
		{ href: "res/img/startup/640x920.png", media: "(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" }, // iOS 6 & 7 iPhone (retina)
		{ href: "res/img/startup/320x460.png", media: "(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)", rel: "apple-touch-startup-image" } // iOS 6 iPhone
		// Android?
	],
	data: [ // model-store-data
		{
			name:'angebote',
			store: 'localstorage',//'window',//'localstorage',
			load: { url:(navigator.onLine)?'http://samo.werfenweng.org/app/appdata.php?i=angebote':'data/angebote.json', async:false, type:'GET', dataType:'json', cache:true },//isLocal:true
			startup: true // load on startup
		}/*,
		{
			name: 'sonstiges',
			store: 'window', // window/global oder localstorage
			load: { url:'data/sonstiges.json', async:false, type:'GET', dataType:'json' },
			startup: true // load on startup
		}*/
	],

	// App specific code by user:
	appdataurl: 'http://m.domain.de/app/appdata.php'
};


$(function(){


	// Konfiguration setzen.
	$(document).appon('config', config);


	//window.addEventListener("online", isOnline, false);
	//window.addEventListener("offline", isOffline, false);
	// navigator.onLine
	


});

