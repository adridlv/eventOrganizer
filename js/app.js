var app = angular.module('dataEvents',['ngRoute', 'ngStorage']);//en el array inyectamos dependencias

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/events.html",
		controller: "dataManager"
	})
	.when("/register-user",{
		templateUrl: "views/registerUser.html",
		controller: "registerUserManager"
	})
	.when("/login", {
		templateUrl: "views/login.html",
		controller: "loginManager"
	})
	.when("/register-event",{
		templateUrl: "views/registerEvent.html",
		controller: "registerEventManager"
	})
	.otherwise({
		redirectTo: "/"
	})
}]);

app.controller('registerUserManager',function ($scope,$http){
	$scope.message = "";
	$scope.addNewUser = function(add){
		$http.post("php/registerUser.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
		});
	};   
});

app.controller('registerEventManager',function ($scope,$http){
	$scope.message = "";
	$scope.addNewEvent = function(add){
		$http.post("php/registerEvent.php",{'name': $scope.event.name, 'description': $scope.event.description, 'price': $scope.event.price, 'places': $scope.event.places})
		.success(function(data, status, headers, config){
			$scope.message = data;
		});
	};   
});

app.controller('loginManager',function ($scope,$http,$sessionStorage){
	$scope.message = "";
	return $scope.login = function(){
		$http.post("php/login.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if(data == "true"){
				$sessionStorage.UserConnected = {"username": $scope.user.username};
			}
		});
	};   
});
app.controller('dataManager',['$scope','$http', function($scope,$http){

	$http.get("php/getDataSQL.php").success (function (data){
		$scope.users = data;
	});
}]);


