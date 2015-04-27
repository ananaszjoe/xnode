(function(){
    angular
    	.module("Fruitstore.Products", ["Fruitstore.Cart"])
        .controller("productsController", productsController)
        .directive("product", productDirective)
      
   function productsController($rootScope, $scope, productsService, cartService, $routeParams) {


        var modelProduct = function(productArray){
            $scope.product = productArray[0];
        }

        productsService.getOneProduct($routeParams.id)
            .then(function(data){
                $scope.singleProduct = data;
            });

        productsService.getProducts().then(function(data){
            $scope.products = data;
        });

        productsService.getCategories().then(function(data){
            $scope.categories = data;
        });

        $scope.categoryFilter = {};

        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    // There is at least one checkbox checked
                    return false;
                }
            }

            // No checkbox was found to be checked
            return true;
        }

        $scope.filterByCategory = function (product) {
            // Display the product if
            // console.log(product);
            return $scope.categoryFilter[product.category] || noFilter($scope.categoryFilter);
        };

    	$scope.addToCart = function(product) {
            cartService.addToCart(product);
    		product.amount++;

            $scope.cart = $rootScope.cart;

    	}
    }

   
    // productController.$inject = ["$scope"];

    function productDirective() {
    	return {
    		restrict: "E",
 			templateUrl: "product/product.html"
    	}
    }

}());