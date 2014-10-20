var hashSizzle = function(hash){
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
		'path': path,
		'query': query,
		'pathRaw': pathRaw,
		'queryRaw': queryRaw
	};
};