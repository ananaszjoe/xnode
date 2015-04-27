(function() {
    angular
        .module("Fruitstore.Cart", [])
        .controller("cartController", cartController)
        .directive("cart", cartDirective)

    function cartController($scope, $rootScope) {
        $scope.cart = $rootScope.cart;

        if ($rootScope.location.path() == '/checkout') {
            $scope.cartTitle = "Order Summary";
        } else {
            $scope.cartTitle = "Cart";
        }


        console.log($scope.cart);

        $scope.cartReduce = function(id) {
            console.log("reduce:" + id);
            $rootScope.cart[id].amount--;

            // also adjust product amount..
            for (key in $scope.products) {
                if ($scope.products[key].id == id) {
                    $scope.products[key].amount--;
                };
            }
            $rootScope.cart[id].total = $rootScope.cart[id].total - $rootScope.cart[id].price;
            $rootScope.cart.holds--;
            $rootScope.cart.total = $rootScope.cart.total - $rootScope.cart[id].price;
            if ($rootScope.cart[id].amount < 1) {
                console.log("ran out");
                delete $rootScope.cart[id];
            };
        }

        $scope.cartIncrease = function(id) {
            console.log("increase:" + id);
            $rootScope.cart[id].amount++;

            // also adjust product amount..
            for (key in $scope.products) {
                if ($scope.products[key].id == id) {
                    $scope.products[key].amount++;
                };
            }
            $rootScope.cart[id].total = $rootScope.cart[id].total + $rootScope.cart[id].price;
            $rootScope.cart.holds++;
            $rootScope.cart.total = $rootScope.cart.total + $rootScope.cart[id].price;
        }

    }

    function cartDirective() {
        return {
            restrict: "E",
            controller: cartController,
            templateUrl: "cart/cart.html"
        }
    }
}());