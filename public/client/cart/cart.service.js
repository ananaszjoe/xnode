(function(){

function cartService($http, $rootScope) {

    	function addToCart(product){
            if ($rootScope.cart[product.id]) {
                console.log("if");
                var item = $rootScope.cart[product.id];
                item.amount++;
                item.total = (item.amount * product.price);
                // item.total = 11;
            } else {
                console.log("else");
                $rootScope.cart[product.id] = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    amount: 1,
                    total: product.price
                }
            }
            $rootScope.cart.total = $rootScope.cart.total + product.price;
            $rootScope.cart.holds++;

        }


        return {
            addToCart: addToCart
        }
    }

angular
	.module("Fruitstore")
	.factory("cartService", cartService); 

}());