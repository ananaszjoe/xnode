(function(){
	angular
		.module("Fruitstore")
        .config(function($routeProvider, $locationProvider){
                $locationProvider.html5Mode(true);
        	$routeProvider
        		.when('/product/:id', {
        			templateUrl: './product/productpage.html',
        			controller: 'productsController'
        		})
        		.when("/checkout", {
        			templateUrl: './checkout/checkout.html',
        			controller: 'checkoutController'
        		})
        		.when("/", {
        			templateUrl: './product/products.html',
        			controller: 'productsController'
        		})
        		.otherwise({ redirectTo: '/' });
        })
}());