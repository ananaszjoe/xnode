var mongoose = require('mongoose');

var schema = {
	id: String,
	name: String
}

var Categories = mongoose.model('Categories', schema);

module.exports = Categories;