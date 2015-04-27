(function(){
	angular
		.module("Fruitstore")
		.run(
			function($rootScope, $location) {
				$rootScope.location = $location;
		        $rootScope.cart = {};
		        $rootScope.cart.holds = 0;
		        $rootScope.cart.total = 0;
			}
		);
}());