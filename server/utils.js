exports.isNonEmptyObject = function(obj) {
	return typeof(obj) === 'object' && obj !== {};
};