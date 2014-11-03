
$(function(){


	$(document).appon('/sonstiges/index', {
		cls: 'page-sonstiges',
		header: {
			html: [
				'<div class="head">',
					'<a href="#/index">Startseite</a>',
					//...
				'</div>'
			].join(''),
			height: '60px'
		},
		footer: false,
		html: [
			'<div class="body">',
				'<h1>Sonstiges</h1>',
				'<a href="#/sonstiges/Impressum">Impressum</a>',
				//...
			'</div>'
		].join(''),
		run: function($GET){
			console.log('Sonstiges aufgerufen.');

		}
	});

	
});