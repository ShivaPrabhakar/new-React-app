var promisify = require('es6-promisify');

Function.prototype.$promisify = function () {
	var f = promisify.promisify(this);
	return f.apply(null, arguments);
}