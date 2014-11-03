
$(function(){


	//$.fn.site('/impress', {
	$(document).appon('/sonstiges/impressum', {
		cls: 'page-impressum',
		header: {
			html: [
				'<div class="head">',
					'<a href="#/index">Startseite</a>',
					//..
				'</div>'
			].join(''),
			height: '60px'
		},
		footer: false,
		html: [
			'<div class="body">',
				'<div class="scrollwrap"><div class="scroll">',
					'<div class="text">',
						'<h1>Impressum</h1>',
						//...
					'</div>',
				'</div></div>',
			'</div>'
		].join(''),
		pre: function() { console.log('pre() Impressum'); },
		post: function() { console.log('post'); },
		run: function($GET) {
			console.log('Impressum aufgerufen.');

		}
	});

	
});