(function(){
angular
	.module('Admin', [])
	.factory("productService", productService)
	.factory("categoryService", categoryService)
	.controller('appController', appController)
	.directive('products', productsDirective)
	.directive('categories', categoriesDirective)
	.directive('addproduct', addProductDirective)
	.directive('addcategory', addCategoryDirective)
	.directive('editproduct', editProductDirective)
	.directive('editcategory', editCategoryDirective);
	
	var slug = function(str) { // credit: http://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
		var to   = "aaaaaeeeeeiiiiooooouuuunc------";
		for (var i=0, l=from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		return str;
	};


	function productService($http){
		function getProducts(){
			return $http.get("/api/products").then(function(result){
				return result.data;
			});
		}

		return {
			getProducts: getProducts
		}
	}

	function categoryService ($http) {
		function getCategories(){
			return $http.get("/api/categories").then(function(result){
				return result.data;
			});
		}

		return {
			getCategories: getCategories
		}
	}

	function appController ($scope, $http, productService, categoryService) {
		console.log("helloo world");
		$scope.show = "products";


		// Get data
		productService.getProducts().then(function(data){
		    $scope.products = data;
		});
		categoryService.getCategories().then(function(data){
		    $scope.categories = data;
		});

		// Methods
		$scope.setShow = function(param) {
			$scope.show = param;
		}

		$scope.addProduct = function (product) {
			product.id = slug(product.name);

			// add to db
			var response = $http.post("/api/product", product).then(function(result){
				// add to scope
				$scope.products.push(result.data);
    				return result.data;
    			});

			// display products
			$scope.show = "products";
		}


		$scope.editProductItem = {};
		$scope.editProduct = function (product) {
			$scope.editProductItem = product;
			$scope.show = "editProduct";
		}

		$scope.saveProduct = function (product) {
			// edit in db
			var response = $http.put("api/product/" + product._id, product).then(function(result){
				// edit in scope
				for (var i = 0; i < $scope.products.length; i++) {
					if ($scope.products[i]._id == product._id) {
						$scope.products[i] = product;
					};
				}
				return result.data;
			});

			// display products
			$scope.show = "products";
		}

		$scope.deleteProduct = function (product) {
			console.log("id:" + product._id);

			// delete from db
			var response = $http.delete("/api/product/" + product._id).then(function(result){
    				return result.data;
    			});
			// delete from scope
			for (var i = 0; i < $scope.products.length; i++) {
				if($scope.products[i]._id == product._id) {
					$scope.products.splice(i, 1);
				}
			};
		}

		$scope.addCategory = function (category) {
			category.id = slug(category.name);
			console.log("category", category);

			// add to db
			var response = $http.post("/api/category", category).then(function(result){
				// add to scope
				$scope.categories.push(result.data);
    				return result.data;
    			});

			// display categories
			$scope.show = "categories";
		}


		$scope.editCategoryItem = {};
		$scope.editCategory = function (category) {
			$scope.editCategoryItem = category;
			$scope.show = "editCategory";
		}

		$scope.saveCategory = function (category) {
			// edit in db
			var response = $http.put("api/category/" + category._id, category).then(function(result){
				// edit in scope
				for (var i = 0; i < $scope.categories.length; i++) {
					if ($scope.categories[i]._id == category._id) {
						$scope.categories[i] = category;
					};
				}
				return result.data;
			});

			// display products
			$scope.show = "categories";
		}


		$scope.deleteCategory = function (category) {
			console.log("id:" + category._id);

			// delete from db
			var response = $http.delete("/api/category/" + category._id).then(function(result){
    				return result.data;
    			});

			// delete from scope
			console.log($scope.categories);
			for (var i = 0 ; i < $scope.categories.length; i++) {
				if($scope.categories[i]._id == category._id) {
					$scope.categories.splice(i, 1);
					console.log($scope.categories);
				}
			};
		}

    	console.log("products:", $scope.products);

	}

	function productsDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/products.html"}
    }
	function categoriesDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/categories.html"}
    }
	function addProductDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/add-product.html"}
    }
	function addCategoryDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/add-category.html"}
    }
	function editProductDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/edit-product.html"}
    }
	function editCategoryDirective() {
    	return {restrict: "E", templateUrl: "admin/directives/edit-category.html"}
    }

}());