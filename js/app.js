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
	.when("/event/:name",{
		templateUrl: "views/event.html",
		controller:"eventManager"
	})
	.otherwise({
		redirectTo: "/"
	})
}]);

app.controller('registerUserManager', ['$scope','$http',function ($scope,$http){
	$scope.message = "";
	$scope.addNewUser = function(add){
		$http.post("php/registerUser.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
		});
	};   
}]);

app.controller('registerEventManager', ['$scope','$http','$sessionStorage','$location', function ($scope,$http, $sessionStorage,$location){
	
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	if(!$scope.user){
		$location.url("/");
	}
	$scope.message = "";
	
	$scope.addNewEvent = function(add){
		$http.post("php/registerEvent.php",{'user': $sessionStorage.UserConnected.username, 'name': $scope.event.name, 'description': $scope.event.description, 'price': $scope.event.price, 'places': $scope.event.places})
		.success(function(data, status, headers, config){
			$scope.message = data;
		});
	};   
}]);

app.controller('loginManager', ['$scope','$http', '$sessionStorage', '$location', function ($scope,$http,$sessionStorage, $location){
	$scope.message = "";
	$scope.login = function(){
		$http.post("php/login.php",{'username': $scope.user.username, 'password': $scope.user.password})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if(data == "true"){
				$sessionStorage.UserConnected = {"username": $scope.user.username};
				$location.url("/");
			}
		});
	};   
}]);

app.controller('dataManager',['$scope','$http','$sessionStorage', function($scope,$http, $sessionStorage){

	$http.get("php/getEventsSQL.php").success (function (data){
		$scope.events = data;
	});
}]);

app.controller('eventManager',['$scope','$http','$sessionStorage','$routeParams', function($scope,$http, $sessionStorage,$routeParams){
	
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	$scope.eventName = $routeParams.name;

	$http.get("php/getEventsSQL.php").success (function (data){
		$scope.events = data;
	});

	$scope.checkIfSuscribed = function(){
		$http.post("php/checkIfSubscribed.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success (function (data){
			$scope.isSuscribed = data;
		});	
	}

	$scope.checkIfHasPlaces = function(){
		$http.post("php/checkIfHasPlaces.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success (function (data){
			$scope.prueba2 = data;
			$scope.hasPlaces = data.hasPlaces;
		});	
	}

	$scope.checkIfHasPlaces();
	$scope.checkIfSuscribed();

	$scope.showButton = function(organizer, unsub){

		if(unsub){
			if($scope.user == organizer || !$scope.user || !$scope.isSuscribed)
				return true;
			else
				return false;
		}
		else if($scope.user == organizer || !$scope.user || $scope.isSuscribed || !$scope.hasPlaces)
			return false;
		else
			return true;
		
	}

	$scope.subscribe = function(){
		$http.post("php/subscribe.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success(function(data, status, headers, config){
			$scope.message = data;
			$scope.checkIfHasPlaces();
			$scope.checkIfSuscribed();
		});
	}

	$scope.unsubscribe = function(){
		$http.post("php/unsubscribe.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success(function(data, status, headers, config){
			$scope.message = data;
			$scope.checkIfHasPlaces();
			$scope.checkIfSuscribed();
		});
	}
}]);

app.controller('HeaderManager', ['$scope', '$sessionStorage', function($scope, $sessionStorage){
	$scope.checkIfLogged = function(){
		if($sessionStorage.UserConnected)
			$scope.user = $sessionStorage.UserConnected.username; 
		else
			$scope.user = false;

		return $scope.user;
	}

	$scope.logout = function(){
		delete $sessionStorage.UserConnected;
	}

	$scope.checkIfLogged();
}]);

app.directive("evtHeader", function(){
	return {
		restrict: "E",
		templateUrl: "views/headerDirective.html"
	}
});



