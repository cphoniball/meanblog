var _ = require('lodash');

exports.lodashTestNonEmptyObject = function(test) {
	var nonEmpty = {
		property: 'value',
		another: 'one' 
	}

	test.ok(_.isPlainObject(nonEmpty) && !_.isEmpty(nonEmpty), 'lodash verifies nonEmpty object'); 
	test.equal(_.isPlainObject({}) && !_.isEmpty({}), false, 'empty object returns false'); 	
	test.done(); 
}