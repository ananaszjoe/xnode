var mongoose = require('mongoose');

var schema = {
	id: String,
	name: String,
	price: Number,
	category: String,
	img: String,
	description: String
}

var Products = mongoose.model('Products', schema);

module.exports = Products;