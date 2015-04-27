// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


var Products = require('../models/products');


exports.index = function(req, res){
	res.send(200);
};

exports.api = function(req, res){
	res.end("<h1>The API</h1><ul><li><a href='/api/products'>Get JSON of all products ( via api/products)</a></li><li><a href='/api/product/watermelon'>Get JSON of a specific product (via api/product/:id)</a></li><li><a href='/api/categories'>Get JSON of all Categories</a></li><li><a href='/api/category/watermelon'>Get JSON of a specific category (via api/category/:id)</a></li><li><a href='/api/'></a></li><li><a href='/api/orders'>Get JSON of all orders</a></li></ul><p>use post, put, delete http requests for create, update and delete products or Categories at:</p><ul><li>/api/product/:id - for product</li><li>/api/category/:id - for category</li></ul><p>use post http at /api/order to save new order.</p><p>use /resetdb to reset the DB to its demo data (12 products, 4 Categories, 1 order)</p><p><a href='/'>Back to the app</a></p>");
}

exports.createProduct = function(req, res, next) {
	var id = req.body.id;

	// create new model
	var newProduct = {id: req.body.id, name: req.body.name, price: req.body.price, category: req.body.category, img: req.body.img, description: req.body.description};

	// create new document
	Products.create(newProduct, function(err, saved) {

		if (err) {
			console.log("Something went wrong during product create: ", err);
		} else {
			console.log("Product " + saved.name + " Saved!");

			// return newly inserted document
			var response = {
				_id: saved._id,
				id: saved.id,
				name: saved.name,
				category: saved.category,
				img: saved.img,
				price: saved.price,
				description: saved.description
			};
			res.json(response);
		}
	});
}

exports.products = function(req, res){
	console.log("products");
	Products.find(function(err, data){
		if(err) console.error;
		console.log(data);
		res.json(data);
	});
}

exports.readProduct = function(req, res, next){
	var id = req.params.id;
	Products.find(function(err, data){
		if(err) console.error;

		var hit = {"response": "fail"};
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].id == id) {
				var hit = {
					"response": "success",
					"data": data[i]
				};
			}
		};
		res.json(hit);
	});
}

exports.updateProduct = function(req, res, next){

	var conditions 	= { _id: req.params._id },
		options 	= { multi: true },
		update 		= { id: req.body.id, name: req.body.name, price: req.body.price, category: req.body.category, img: req.body.img, description: req.body.description};

	console.log("update package:" , update); 

	// Update the document
	Products.update(conditions, update, options, updateCallback);

	function updateCallback (err, numAffected) {
	// numAffected is the number of updated documents
		if(err){
			console.log("An error occurred during update: " + err);
		} else {
			console.log("Document(s) successfully updated: " , numAffected);
		}

		// Read the updated document and return in JSON
		var id = req.params.id;
		Products.find(function(err, data){
			if(err) console.error;

			var hit = {"response": "fail"};
			for (var i = data.length - 1; i >= 0; i--) {
				if (data[i].id == id) {
					var hit = {
						"response": "success",
						"data": data[i]
					};
				}
			};
			res.json(hit);
		});
	}


}
exports.deleteProduct = function(req, res, next){

	Products.remove({ _id: req.params._id }, function (err) {
		if (err) {
			console.log("An error occurred during delete: " + err);
		} else {
			console.log("Product '" + req.params._id + "' successfully removed!");
		}
	});
}


var Categories = require('../models/categories');

exports.createCategory = function(req, res, next){

	// create new model
	var newCategory = {id: req.body.id, name: req.body.name};

	// create new document
	Categories.create(newCategory, function(err, saved) {
	if (err) {
			console.log("Something went wrong during category create: ", err);
		} else {
			console.log("Category " + saved.name + " Saved!");

			// return newly created category
			res.json({
				_id: saved._id,
				id: saved.id,
				name: saved.name
			});
		}
	});
}





exports.categories = function(req, res, next){
	console.log("categories");
	Categories.find(function(err, data){
		if(err) console.error;
		console.log(data);
		res.json(data);
	});
}

exports.readCategory = function(req, res, next){
	var id = req.params.id;
	Categories.find(function(err, data){
		if(err) console.error;

		var hit = {"response": "fail"};
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].id == id) {
				var hit = {
					"response": "success",
					"data": data[i]
				};
			}
		};
		res.json(hit);
	});
}

exports.updateCategory = function(req, res, next){

	var conditions 	= { id: req.body.id },
		options 	= { multi: true },
		update 		= { id: req.body.id, name: req.body.name, price: req.body.price, category: req.body.category, img: req.body.img, description: req.body.description};

	console.log("update package:" , update); 

	// Update the document
	Categories.update(conditions, update, options, updateCallback);

	function updateCallback (err, numAffected) {
	// numAffected is the number of updated documents
		if(err){
			console.log("An error occurred during update: " + err);
		} else {
			console.log("Document(s) successfully updated: " , numAffected);
		}

		// Read the updated document and return in JSON
		var id = req.params.id;
		Categories.find(function(err, data){
			if(err) console.error;

			var hit = {"response": "fail"};
			for (var i = data.length - 1; i >= 0; i--) {
				if (data[i].id == id) {
					var hit = {
						"response": "success",
						"data": data[i]
					};
				}
			};
			res.json(hit);
		});
	}


}

exports.deleteCategory = function(req, res, next){
	Categories.remove({ _id: req.params._id }, function (err) {
		if (err) {
			return handleError(err);
		} else {
			console.log("Category '" + req.params._id + "' successfully removed!");
		}
	});
}


var Orders = require('../models/orders');


exports.createOrder = function(req, res, next) {
	// create new model
	var newOrder = {
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		zip: req.body.zip,
		town: req.body.town,
		cardnr: req.body.cardnr,
		expmm: req.body.expmm,
		expyy: req.body.expyy,
		cvv: req.body.cvv,
		comment: req.body.comment
	};

	// create new document
	Orders.create(newOrder, function(err, saved) {
	if (err) {
			console.log("Something went wrong during order create: ", err);
		} else {
			console.log("Order " + saved._id + " Saved!");

			// return newly created category
			res.json({
				_id: saved._id
			});
		}
	});
}

exports.orders = function(req, res, next) {
	console.log("orders");
	Orders.find(function(err, data){
		if(err) console.error;
		console.log(data);
		res.json(data);
	});
}