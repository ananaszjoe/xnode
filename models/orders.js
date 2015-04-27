var mongoose = require('mongoose');

var schema = {
	name: String,
	email: String,
	address: String,
	zip: String,
	town: String,
	cardnr: Number,
	expmm: Number,
	expyy: Number,
	cvv: Number,
	comment: String,
}

var Orders = mongoose.model('Orders', schema);

module.exports = Orders;