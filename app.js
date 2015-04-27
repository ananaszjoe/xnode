var express         = require('express'),
    path            = require('path'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    colors          = require('colors');
    databaseName    = 'angular_mongodb',
    app             = express(),
    port            = process.env.PORT || CONFIG.port;

if (typeof port === 'undefined') {
    var port = 4000;
};



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

var router  = express.Router();
var routes = require('./routes/index');


    app.use(express.static(path.join(__dirname, './public/client')));
    app.use('/admin', express.static(path.join(__dirname, './public/admin')));

mongoose.connect('mongodb://tesla:Qe7ADruJetr2fU5A@ds037837.mongolab.com:37837/angular_mongodb');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);


var resetDB = require('./datainit');

// RESET DB
router.get("/resetdb", resetDB.resetDB);

// Get info
router.get("/ok", routes.index);
router.get("/api", routes.api);
router.get('/api/products', routes.products);
router.get('/api/categories', routes.categories);
router.get('/api/orders', routes.orders);

// Create data
router.post('/api/product', routes.createProduct);
router.post('/api/category', routes.createCategory);
router.post('/api/order', routes.createOrder);

// Read / Update / Delete specific product
router.route('/api/product/:_id')
    .get(routes.readProduct)
    .put(routes.updateProduct)
    .delete(routes.deleteProduct);

// Read / Update / Delete specific category
router.route('/api/category/:_id')
    .get(routes.readCategory)
    .put(routes.updateCategory)
    .delete(routes.deleteCategory);
    
app.use('/', router);

function startServer(){
    console.log('DB is open')
    var server = app.listen(port, function() {
        var port = server.address().port;
        console.log("Listening on port " + port);
    });
}

  
module.exports = app;
