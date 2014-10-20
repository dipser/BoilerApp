var app = { route:{}, routes:{}, data:{}, lastHash:null, init:function(){} };


var hashSizzle = function(hash){
	var splitRegExp = new RegExp('#([^#\\?\\n]*)\\??(.*)');
	var split = hash.match(splitRegExp);
	var pathRaw = (split[1]!==null ? split[1] : '');
	var queryRaw = (split[2]!==null ? split[2] : '');
	var path = pathRaw.split('/').splice(1);
	var query = {};
	var querySplit = queryRaw.split('&');
	for (var q in querySplit) {
		var qSplit = querySplit[q].split('=');
		query[qSplit[0]] = (qSplit.length==2) ? qSplit[1] : '';
	}
	return {
		'path': path,
		'query': query,
		'pathRaw': pathRaw,
		'queryRaw': queryRaw
	};
};

var jsonRequired = [{'source':['1','2']}];
var jsonSyncRequire = function(source) { // Optional fn
	for (var i in jsonRequired) {
	   if (jsonRequired[i].source=='source') {
	       return jsonRequired[i].source;
	   }
	}
	var fn = (typeof arguments[1] == 'function') ? arguments[1] : function(data) {};
	$.ajax({url:source, async:false, type:'get', dataType:'json', success:function(data){
		jsonRequired[source] = data;
		fn();
	}});
	return jsonRequired[source];
};

var noteString = function(note) {
	note = note.toFixed(1).split('.');
	note = note[0] +','+ note[1];
	return note;
};



var iscroll = null;
$(function(){
	console.log('jQueryReady');
	
	//$('body').append('<div class="scrollable" style="display:none;""></div>');
	setTimeout(function() { iscroll = new IScroll('.scrollable'); }, 100);
	//setTimeout(function() { scrollable.refresh(); }, 0);
	


$('html, body').on('touchmove', function(e){
  e.preventDefault();           
});


document.body.addEventListener('touchmove', function(e){
    //if(!$(e.target).hasClass("scrollable")) {
       e.preventDefault();
    //}
});


/*
function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }

             //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //           screenX, screenY, clientX, clientY, ctrlKey, 
    //           altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                              first.screenX, first.screenY, 
                              first.clientX, first.clientY, false, 
                              false, false, false, 0/*left*//*, null);

                                                                                 first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() 
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
}
*/

	var onHashChange = function() {
		var hash = location.hash;
		console.log('HashChange: '+ hash);

		var result = [];
		if (hash.substr(0,1)!='#') {
			hash = '#/';
		}
		result = hashSizzle(hash);
		console.log('Running view: '+ result.pathRaw +' Argument&Methods: '+ result.queryRaw);

		var b = false;
		for (var r in app.routes) {
			if (r == result.pathRaw) {
				b = true;
			}
		}

		if (b) {
			(app.routes[result.pathRaw].fn)();
		}
	};

	
	var onDeviceReady = function() {
		console.log('DeviceReady');
		window.addEventListener("hashchange", onHashChange, false);
		window.dispatchEvent(new Event('hashchange'));
		app.init();
	};
	document.addEventListener('deviceready', onDeviceReady, false);
	





});


//localStorage.setItem("hochschuleJSON", 'res/data/hs_emden-leer.json');
// localStorage.getItem("vorname");
// localStorage.removeItem("key");
// delete localstorage['key']
// localStorage.clear();
// localStorage.length
// localStorage.setItem("myKey", JSON.stringify(myObject));
// JSON.parse(localStorage.getItem("myKey"));

app.data.hochschulJSON = 'res/data/hs_emden-leer.json';
app.data.hochschulData = jsonSyncRequire(app.data.hochschulJSON); // Über select einstellbar

var userData = {
	'module': {
		"2021": {"id": 2021, "note": 2.3}, // GP1
		"2121": {"id": 2121, "note": 1.3}, // GP2
		"2051": {"id": 2051, "note": 2.3}, // MD1
		"2091": {"id": 2091, "note": 2.0}, // MD2
		"2071": {"id": 2071, "note": 4.0} // RF
	}
};


app.route.fnU = function() {
	console.log('fnU');
	var template = ''
		+ '<div>'
		+ '  <div class="left">{{left}}</div>'
		+ '  <div class="title">{{title}}</div>'
		+ '  <div class="right">{{right}}</div>'
		+ '</div>';
	var data = {
		'left': '',
		'title': 'Curriculum',
		'right': ''
	};
	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#head').html(output);

	var template = ''
		+ '<div id="curriculumOverview" class="u-hochschule scrollable">'
		+ '  <div class="select-wrap">'
		+ '    <select>'
		+ '      <option value="">Deine Hochschule...</option>'
		+ '      {{#hochschulen}}<option value="{{json}}">{{name}}</option>{{/hochschulen}}'
		+ '    </select>'
		+ '  <div>'
		+ '  <a href="#/U?popup=hsfehlt">Deine Hochschule fehlt?</a>'
		+ '</div>';
	var data = jsonSyncRequire('res/data/hochschulen.json');
	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#main').html(output);

	setTimeout(function() { iscroll.refresh(); }, 100);
};


app.route.fnL = function() {
	console.log('fnL');
	var template = ''
		+ '<div>'
		+ '  <div class="left">{{left}}</div>'
		+ '  <div class="title">{{title}}</div>'
		+ '  <div class="right">{{right}}</div>'
		+ '</div>';
	var data = {
		'left': '',
		'title': 'Curriculiste',
		'right': ''
	};
	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#head').html(output);

	var template = ''
		+ '<div class="scrollable"><ul id="curriculumList" class="blur-4">'
		+ '  {{#module}}<li class="modul-{{id}} {{bestanden}}"><div><span class="kuerzel">{{kuerzel}}</span><span class="name">{{name}}</span><span class="note">{{note}}</span></div></li>{{/module}}'
		+ '</ul></div>';
	var hochschule = app.data.hochschulData;
	for (var a in hochschule.module) {
		var hm = hochschule.module[a];
		hm.note = '';
		hm.bestanden = '';
		if (hm.id in userData.module) {
			hm.note = noteString(userData.module[hm.id].note);
			hm.bestanden = 'bestanden';
		}
		hochschule.module[a] = hm;
	}data = hochschule;console.log(data);
	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#main').html(output);

	//$('#main').on('swipe', function(){console.log(1);});

	setTimeout(function() { iscroll.refresh(); }, 100);



};

app.route.fnT = function() {
	console.log('fnT');
	var template = ''
		+ '<div>'
		+ '  <div class="left">{{left}}</div>'
		+ '  <div class="title">{{title}}</div>'
		+ '  <div class="right">{{right}}</div>'
		+ '</div>';
	var data = {
		'left': '',
		'title': 'Curricutab',
		'right': ''
	};


	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#head').html(output);


	var hochschule = app.data.hochschulData;

	var data = {};
	data.semester = [];
	for (var a in hochschule.module) { // Sort semester
		// Sort curriculumOrder
		var hm = hochschule.module[a];

		hm.note = '-';
		hm.bestanden = '';
		if (hm.id in userData.module) {
			hm.note = noteString(userData.module[hm.id].note);
			hm.bestanden = 'bestanden';
		}

		// semester in newObj
		if (!(hm.semester-1 in data.semester))
			data.semester[hm.semester-1] = [];

		if (!('order' in data.semester[hm.semester-1]))
			data.semester[hm.semester-1].order = [];

		data.semester[hm.semester-1].order.push(hm);

	}
	//console.log(data);

/*
	semester: Array[7]
		1: Object
			1: Object
				curriculumOrder: 1
				id: "2021"
				kuerzel: "GP1"
*/


	var template = ''
		+ '<div id="curriculumTable" class="semesters">'
		+ '  {{#semester}}'
		+ '    <div class="module">'
		+ '      {{#order}}'
		+ '        <div class="span-{{curriculumSpan}}"><div class="modul {{bestanden}}"><span class="kuerzel">{{kuerzel}}</span><span class="note">{{note}}</span></div></div>'
		+ '      {{/order}}'
		+ '    </div>'
		+ '  {{/semester}}'
		+ '</div>';

	var template = ''
		+ '<div id="curriculumTable" class="semesters scrollable">'
		+ '  {{#semester}}'
		+ '    <div class="module">'
		+ '      {{#order}}'
		+ '        <div class="span-{{curriculumSpan}}"><div class="modul {{bestanden}}">'
		+ '          <div class="fw"><div class="flip-container" ontouchstart="this.classList.toggle(\'hover\');"><div class="flipper"><div class="fff"><div class="fff2"><span class="kuerzel front">{{kuerzel}}</span><span class="note back">{{note}}</span></div></div></div></div></div>'
		+ '        </div></div>'
		+ '      {{/order}}'
		+ '    </div>'
		+ '  {{/semester}}'
		+ '</div>';

	var cTemplate = Hogan.compile(template);
	data.semester.hasItems = function() { console.log('order' in this);return 'order' in this; };
	var output = cTemplate.render(data);
	$('#main').html(output);

	setTimeout(function() { iscroll.refresh(); }, 100);

};


app.routes = {
	'/': { 'fn': app.route.fnU },
	'/L': { 'fn': app.route.fnL },
	'/T': { 'fn': app.route.fnT }
};

app.init = function() {

	app.data.hochschule = jsonSyncRequire('res/data/hs_emden-leer.json');

	// Menu
	var template = ''
		+ '<ul>'
		+ '  {{#menu}}<li class="{{class}}"><a href="#{{route}}"><span class="icon"></span><span class="label">{{label}}</span></a></li>{{/menu}}'
		+ '</ul>';
	var data = {
		'menu': [
			{
				//'icon': '../img/settings9.svg',
				'label': 'Übersicht',
				'route': '/',
				'class': 'u'
			},
			{
				//'icon': 'http://localhost:8000/www/res/img/list23.svg',
				'label': 'Liste',
				'route': '/L',
				'class': 'l'
			},
			{
				//'icon': '../img/table18.svg',
				'label': 'Tabelle',
				'route': '/T',
				'class': 't'
			}
		]
	};
	var cTemplate = Hogan.compile(template);
	var output = cTemplate.render(data);
	$('#menu').html(output);

	$('#menu a').on('click', function(){
		$('#menu a').removeClass('active');
		$('#menu a').parent().removeClass('active');
		$(this).addClass('active');
		$(this).parent().addClass('active');
	});


	var currentRoute = hashSizzle(location.hash).pathRaw;
	for (var i in data.menu) {
		var m = data.menu[i];
		if (m.route == currentRoute) {
			$('#menu .'+ m.class +' a').trigger('click');
		}
	}

};


