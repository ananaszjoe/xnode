(function(){
    angular
    	.module("Fruitstore.Checkout", [])
        .controller("checkoutController", checkoutController)

    function checkoutController($http, $rootScope, $scope, productsService) {
    	$scope.cart = $rootScope.cart;
    	$scope.purchaseForm = {};

    	$scope.purchaseForm.submitTheForm = function(item, event) {
	        console.log("submitting");
	        var formResult = {
	        	name: $scope.purchaseForm.name,
	        	email: $scope.purchaseForm.email,
	        	address: $scope.purchaseForm.address,
	        	zip: $scope.purchaseForm.zip,
	        	town: $scope.purchaseForm.town,
	        	cardnr: $scope.purchaseForm.cardnr,
	        	expmm: $scope.purchaseForm.expmm,
	        	expyy: $scope.purchaseForm.expyy,
	        	cvv: $scope.purchaseForm.cvv,
	        	comment: $scope.purchaseForm.comment,
	        	order: $scope.cart
	        };
	        console.log(formResult);

	        // add to db
			var response = $http.post("/api/order", formResult).then(function(result){
				return result.data;
			});
	    }

    }
}());