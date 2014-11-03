
$(function(){


	$(document).appon('/index', {
		cls: 'page-index',
		header: {
			html: [
				'<div class="head">',
					//...
				'</div>'
			].join(''),
			height: '60px'
		},
		footer: false,
		html: [
			'<div class="body">',
				'<h1>Startseite</h1>',
				'<a href="#/sonstiges/index">Sonstiges</a>',
				//...
			'</div>'
		].join(''),
		run: function($GET){
			console.log('Index aufgerufen.');
		}
	});

	
});