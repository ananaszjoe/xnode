(function(){

function productsService($http) {

        function getOneProduct(param) {
            return $http.get("/api/product/" + param).then(function(result){
                var singleProduct = result.data.data;
                return singleProduct;
            })
        }

    	function getProducts() {
    		return $http.get("/api/products").then(function(result){
                return result.data;
    		})
    	}

    	function getCategories() {
    		return $http.get("/api/categories").then(function(result){
    			return result.data;
    		})
    	}

    	return {
            getOneProduct: getOneProduct,
    		getProducts: getProducts,
    		getCategories: getCategories
    	}
    }
angular
	.module("Fruitstore")
	.factory("productsService", productsService); 

}());