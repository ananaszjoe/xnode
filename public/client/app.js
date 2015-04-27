(function(){
    'use strict';
    angular
        .module("Fruitstore", [
        	"ngRoute",
            "Fruitstore.Products",
            "Fruitstore.Cart",
            "Fruitstore.Checkout"
      	])
}());