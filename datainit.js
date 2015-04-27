

var mongoose = require('mongoose'),
	dbname = "angular_mongodb";

var Product = mongoose.model("Product", {
	// _id: Object,
	id: String,
	name: String,
	price: Number,
	category: String,
	img: String,
	description: String
});

var Category = mongoose.model("Category", {
	// _id: Object,
	id: String,
	name: String
});

var Order = mongoose.model("Order", {
	// _id: Object,
	name: String,
	email: String,
	address: String,
	zip: String,
	town: String,
	cardnr: Number,
	expmm: Number,
	expyy: Number,
	cvv: Number,
	comment: String
});

// mongoose.connect("mongodb://tesla:Qe7ADruJetr2fU5A@ds037837.mongolab.com:37837/angular_mongodb");


var db = mongoose.connection;

exports.resetDB = function(req, res) {

	db.on("error", console.error);
	// db.once("open", deleteItems);

	deleteItems();

	function deleteItems(){
		Product.remove({}, function(err){
			if(err) console.log(err);
			insertProducts();
		});
		Category.remove({}, function(err){
			if(err) console.log(err);
			insertCats();
		});
		Order.remove({}, function(err){
			if(err) console.log(err);
			insertOrders();
		});
	}

	function insertProducts(){

		var products = [{"id":"watermelon","name":"Watermelon","price":39,"category":"watermelon","img":"images/watermelon2.jpg","description":"A large, round fruit that has hard, green skin, sweet, red, juicy flesh, and black seeds","__v":0},

	{"id":"half-watermelon","name":"Half Watermelon","price":20,"category":"watermelon","img":"images/watermelon1.jpg","description":"A large, round fruit that has hard, green skin, sweet, red, juicy flesh, and black seeds","__v":0},

	{"id":"okologisk-watermelon","name":"Okologisk Watermelon ","price":45,"category":"watermelon","img":"images/watermelon3.jpg","description":"A large, round fruit that has hard, green skin, sweet, red, juicy flesh, and black seeds","__v":0},

	{"id":"strawberry","name":"Strawberry","price":25,"category":"strawberry","img":"images/strawberry2.jpg","description":"A soft, juicy red fruit that grows on a low plant with white flowers.","__v":0},

	{"id":"chopped-strawberry","name":"Chopped Strawberry 300 gr","price":29,"category":"strawberry","img":"images/strawberry1.jpg","description":"A soft, juicy red fruit that grows on a low plant with white flowers.","__v":0},

	{"id":"okologisk-strawberry","name":"Okologisk Strawberry","price":31,"category":"strawberry","img":"images/strawberry3.jpg","description":"A soft, juicy red fruit that grows on a low plant with white flowers.","__v":0},

	{"id":"banana","name":"Banana","price":2,"category":"banana","img":"images/banana2.jpg","description":"A long curved fruit with a thick peel that is yellow when it is ripe.","__v":0},

	{"id":"sliced-banana","name":"Sliced Banana","price":2.3,"category":"banana","img":"images/banana1.jpg","description":"A long curved fruit with a thick peel that is yellow when it is ripe.","__v":0},

	{"id":"fairtrade-banana","name":"Fairtrade Banana","price":3,"category":"banana","img":"images/banana3.jpg","description":"A long curved fruit with a thick peel that is yellow when it is ripe.","__v":0},

	{"id":"pineapple","name":"Pineapple","price":14,"category":"pineapple","img":"images/pineapple2.jpg","description":"A large fruit that grows on a tropical tree and that has thick skin and very swee\t\tt, juicy, yellow flesh.","__v":0},

	{"id":"half-pineapple","name":"Half Pineapple","price":8,"category":"pineapple","img":"images/pineapple1.jpg","description":"A large fruit that grows on a tropical tree and that has thick skin and very swee\t\tt, juicy, yellow flesh.","__v":0},

	{"id":"okologisk-pineapple","name":"Okologisk Pineapple","price":19,"category":"pineapple","img":"images/pineapple3.jpg","description":"A large fruit that grows on a tropical tree and that has thick skin and very swee\t\tt, juicy, yellow flesh.","__v":0}];

			Product.create(products, function(){
				console.log("data init done 3/1");
			});

	}

	function insertCats() {
		var categories = [
			{ "id" : "pineapple", "name" : "Pineapple", "__v" : 0 },
	{ "id" : "banana", "name" : "Banana", "__v" : 0 },
	{ "id" : "watermelon", "name" : "Watermelon", "__v" : 0 },
	{ "id" : "strawberry", "name" : "Strawberry", "__v" : 0 }];
		Category.create(categories, function(){
			console.log("data init done 3/2");
		});
	}
	function insertOrders() {
		var orders = [{"name":"Mr. Default Order","email":"email@address.com","address":"Sondervang 30","zip":"8000","town":"Aarhus C","cardnr":1111222233334444,"expmm":12,"expyy":19,"cvv":555,"comment":"Proud to be the very first order in the DB!","__v":0}];
		Order.create(orders, function(){
			console.log("data init done 3/3");
		});
	}

	console.log("=====    All DB data has been reset    ======".green);
	res.send("<meta http-equiv='refresh' content='5; url=/' /><h1>All DB data has been reset</h1><h2>Redirecting in 5 sec...</h2>");
}