var app = angular.module('dataEvents',['ngRoute', 'ngStorage']);//en el array inyectamos dependencias

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/events.html",
		controller: "dataManager"
	})
	.when("/register",{
		templateUrl: "views/registerUser.html",
		controller: "registerManager"
	})
	.when("/login", {
		templateUrl: "views/login.html",
		controller: "loginManager"
	})
	.otherwise({
		redirectTo: "/"
	})
}]);

app.controller('registerManager',function ($scope,$http){
	$scope.message = "";
	$scope.addNewUser = function(add){
		$http.post("register.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
		});
	};   
});

app.controller('loginManager',function ($scope,$http,$sessionStorage){
	$scope.message = "";
	return $scope.login = function(){
		$http.post("login.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if(data == "true"){
				$sessionStorage.UserConnected = {"username": $scope.user.username};
			}
		});
	};   
});
app.controller('dataManager',['$scope','$http', function($scope,$http){

	$http.get("getDataSQL.php").success (function (data){
		$scope.users = data;
	});
}]);


