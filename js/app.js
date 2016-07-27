var app = angular.module('dataEvents', ['ngRoute', 'ngStorage', 'ngFileUpload']);//en el array inyectamos dependencias

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl: "views/events.html",
		controller: "homeManager"
	})
	.when("/users",{
		templateUrl: "views/users.html",
		controller: "usersManager"
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
		controller: "eventManager"
	})
	.when("/edit/user/:name",{
		templateUrl: "views/editUser.html",
		controller: "editUserManager"
	})
	.when("/my-events",{
		templateUrl: "views/events.html",
		controller: "eventManager"
	})
	.when("/subbed-events",{
		templateUrl: "views/events.html",
		controller: "subbedEventsManager"
	})
	.when("/user/:name",{
		templateUrl: "views/userProfile.html",
		controller: "userProfileManager"
	})
	.when("/edit/event/:name",{
		templateUrl: "views/editEvent.html",
		controller: "editEventManager"
	})
	.otherwise({
		redirectTo: "/"
	})
}]);

app.controller('registerUserManager', ['$scope','$http','$sessionStorage', '$location','Upload', function ($scope,$http,$sessionStorage,$location, Upload){
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	if($scope.user){
		$location.url("/");
	}

	$scope.upload = function (file, name, type) {
		Upload.upload({
			url: 'php/uploadImage.php', 
			method: 'POST',
			file: file,
			data: {
				'textname': name,
				'type': type
			}
		})
	};

	$scope.message = "";

	$scope.addNewUser = function(add){
		$http.post("php/registerUser.php",{
			'username': $scope.user.username, 
			'password': $scope.user.password,
			'fname': $scope.user.fname,
			'lname': $scope.user.lname,
			'email': $scope.user.email,
			'image': $scope.fileuser.name,
			'image_background':$scope.filebckg.name
		})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if($scope.message){
				$scope.upload($scope.fileuser, $scope.user.username, "user");
				$scope.upload($scope.filebckg, $scope.user.username, "user_bckg");
				$location.path("/");
			}
		});
	};   
}]);

app.controller('registerEventManager', ['$scope','$http','$sessionStorage','$location','Upload', function ($scope,$http, $sessionStorage,$location, Upload){
	
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	if(!$scope.user){
		$location.url("/");
	}
	$scope.message = "";
	

	$scope.upload = function (file, name, type) {
		Upload.upload({
			url: 'php/uploadImage.php', 
			method: 'POST',
			file: file,
			data: {
				'textname': name,
				'type': type
			}
		})
	};

	$scope.addNewEvent = function(add){
		$http.post("php/registerEvent.php",
		{
			'user': $sessionStorage.UserConnected.username, 
			'name': $scope.event.name, 
			'description': $scope.event.description, 
			'price': $scope.event.price, 
			'places': $scope.event.places,
			'category':$scope.event.category, 
			'image':$scope.file.name, 
			'imagebckg':$scope.filebckg.name
		})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if($scope.message == true){
				$scope.upload($scope.file, $scope.event.name, "img");
				$scope.upload($scope.filebckg, $scope.event.name,"bckg");
				$location.path("/");
			}
		});
	};
}]);



app.controller('loginManager', ['$scope','$http', '$sessionStorage', '$location', function ($scope,$http,$sessionStorage, $location){
	
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	if($scope.user){
		$location.url("/");
	}

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

app.controller('homeManager',['$scope','$http', function($scope,$http){
	$http.post("php/getSQL.php",{'table': 'events', 'typeQuery': 'simple', 'user':""})
	.success (function (data){
		$scope.events = data;
	});
}]);

app.controller('usersManager',['$scope','$http','$sessionStorage',function($scope,$http,$sessionStorage){
	if($sessionStorage.UserConnected){
		$scope.user = $sessionStorage.UserConnected.username;
	}
	else
		$scope.user = false;
	
	$http.post("php/getSQL.php",{'table': 'users', 'typeQuery': 'simple', 'user':""})
	.success (function (data){
		$scope.users = data;
	});
}]);

app.controller('editUserManager',['$scope','$http','$sessionStorage','$routeParams','Upload','$location', function($scope,$http, $sessionStorage,$routeParams,Upload,$location){

	if($sessionStorage.UserConnected){
		$scope.userStorage = $sessionStorage.UserConnected.username;
	}
	else
		$scope.userStorage = false;

	$scope.name = $routeParams.name;
	
	if($scope.userStorage != $scope.name){
		$location.url("/");
	}
	
	$http.post("php/getSQL.php",{'table': 'users', 'typeQuery': 'simple', 'user':""})
	.success (function (data){
		$scope.users = data;
	});

	$scope.upload = function (file, name, type) {
		Upload.upload({
			url: 'php/uploadImage.php', 
			method: 'POST',
			file: file,
			data: {
				'textname': name,
				'type': type
			}
		})
	};

	$scope.message = "";

	$scope.update = function(password,fname,lname,email,fileuser,filebckg){
		var fileName;
		var filebckgName;

		if(!fileuser)
			fileName = "empty";
		else
			fileName = fileuser.name;

		if(!filebckg)
			filebckgName = "empty";
		else
			filebckgName = filebckg.name;

		$http.post("php/updateUser.php",{
			'username': $scope.name, 
			'password': password,
			'fname': fname,
			'lname': lname,
			'email': email,
			'image': fileName,
			'image_background':filebckgName
		})
		.success(function(data, status, headers, config){

			if(fileuser){
				$scope.upload(fileuser, $scope.name, "user");
				console.log("hecho");
			}
			if(filebckg)
				$scope.upload(filebckg, $scope.name, "user_bckg");

			$location.path("/");
		});
	};   
	

}]);

app.controller('userProfileManager',['$scope','$http','$sessionStorage','$routeParams', function($scope,$http, $sessionStorage,$routeParams){
	if($sessionStorage.UserConnected){
		$scope.user = $sessionStorage.UserConnected.username;
	}
	else
		$scope.user = false;
	/*
	if($scope.user != $scope.name){
		$location.url("/");
	}
	*/

	$scope.name = $routeParams.name;
	

	$http.post("php/getSQL.php",{'table': 'users', 'typeQuery': 'simple', 'user':""})
	.success (function (data){
		$scope.users = data;
	});

	$scope.checkIfFollowing = function(){
		$http.post("php/checkIfFollowing.php",{'user': $scope.user, 'user_following': $scope.name})
		.success (function (data){
			$scope.isFollowing = data;
		});	
	}

	$scope.checkIfFollowing();

	$scope.followUser = function(){
		$http.post("php/followUser.php",{'user': $scope.user, 'user_following': $scope.name})
		.success (function (data){
			$scope.message = data;
			$scope.checkIfFollowing();
		});	
	}

	$scope.unfollowUser = function(){
		$http.post("php/unfollowUser.php",{'user': $scope.user, 'user_following': $scope.name})
		.success (function (data){
			$scope.checkIfFollowing();
		});	
	}

	$scope.showButton = function(unfollow){
		if(unfollow){
			if($scope.user == $scope.name || !$scope.user || !$scope.isFollowing)
				return true;
			else
				return false;
		}else{
			if($scope.user == $scope.name || !$scope.user || $scope.isFollowing){
				return false;
			}
			else
				return true;
		}
	}

	

}]);

app.controller('subbedEventsManager',['$scope','$http','$sessionStorage', function($scope,$http, $sessionStorage){
	if($sessionStorage.UserConnected){
		$scope.user = $sessionStorage.UserConnected.username;
	}

	$http.post("php/getSQL.php",{'table': 'events', 'typeQuery': 'subbedEvents', 'user': $scope.user})
	.success (function (data){
		$scope.events = data;
	});
}]);


app.controller('myEventsManager',['$scope','$http','$sessionStorage', function($scope,$http, $sessionStorage){
	if($sessionStorage.UserConnected){
		$scope.user = $sessionStorage.UserConnected.username;
	}
	else
		$scope.user = false;

	if(!$scope.user){
		$location.url("/");
	}

	$http.post("php/getSQL.php",{'table': 'events', 'typeQuery': 'simple', 'user': $scope.user})
	.success (function (data){
		$scope.events = data;
	});
}]);

app.controller('eventManager',['$scope','$http','$sessionStorage','$routeParams','Upload','$location', function($scope,$http, $sessionStorage,$routeParams, Upload, $location){
	

	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	$scope.eventName = $routeParams.name;

	if($location.path() === "/my-events"){
		$scope.userFilter = $scope.user;
	}

	$http.post("php/getSQL.php",{'table': 'events', 'typeQuery': 'simple','user': $scope.user})
	.success (function (data){
		$scope.events = data;
	});

	if($scope.user){
		$http.post("php/getSQL.php",{
			'table': 'events',
			'typeQuery': 'getFollowingUsers',
			'user': $scope.user, 
			'eventName': $scope.eventName
		})
		.success (function (data){
			$scope.followingUsers = data;
		});

		$http.post("php/getSQL.php",{
			'table': 'events',
			'typeQuery': 'getUnknownUsers',
			'user': $scope.user, 
			'eventName': $scope.eventName
		})
		.success (function (data){
			$scope.unknownUsers = data;
		});
	}

	$scope.checkIfSuscribed = function(){
		$http.post("php/checkIfSubscribed.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success (function (data){
			$scope.isSuscribed = data;
		});	
	}

	$scope.checkIfHasPlaces = function(){
		$http.post("php/checkIfHasPlaces.php",{'event_name': $scope.eventName, 'user_name': $scope.user})
		.success (function (data){
			$scope.places = data;
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

	$scope.upload = function (file, name, type) {
		Upload.upload({
			url: 'php/uploadImage.php', 
			method: 'POST',
			file: file,
			data: {
				'textname': name,
				'type': type
			}
		})
	};

	$scope.update = function(description,price,places,category, file, filebckg){
		var fileName;
		var filebckgName;

		if(!file)
			fileName = "empty";
		else
			fileName = file.name;

		if(!filebckg)
			filebckgName = "empty";
		else
			filebckgName = filebckg.name;

		$http.post("php/updateEvent.php",{
			'user': $scope.user,
			'name': $scope.eventName,
			'description': description,
			'price': price,
			'places': places,
			'category':category,
			'file': fileName,
			'filebckg': filebckgName
		})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if(file){
				$scope.upload(file, $scope.eventName, "img");
			}
			if(filebckg){
				$scope.upload(filebckg, $scope.eventName,"bckg");
			}
			$location.path("/");
		});
	}
}]);

app.controller('editEventManager',['$scope','$http','$sessionStorage','$routeParams','Upload', function($scope,$http, $sessionStorage,$routeParams, Upload){
	
	if($sessionStorage.UserConnected)
		$scope.user = $sessionStorage.UserConnected.username; 
	else
		$scope.user = false;

	$scope.eventName = $routeParams.name;

	$http.post("php/getSQL.php",{'table': 'events', 'typeQuery': 'simple','user': $scope.user})
	.success (function (data){
		$scope.events = data;
	});

	$scope.upload = function (file, name, type) {
		Upload.upload({
			url: 'php/uploadImage.php', 
			method: 'POST',
			file: file,
			data: {
				'textname': name,
				'type': type
			}
		})
	};

	$scope.update = function(description,price,places,category, file, filebckg){
		var fileName;
		var filebckgName;

		if(!file)
			fileName = "empty";
		else
			fileName = file.name;

		if(!filebckg)
			filebckgName = "empty";
		else
			filebckgName = filebckg.name;

		$http.post("php/updateEvent.php",{
			'user': $scope.user,
			'name': $scope.eventName,
			'description': description,
			'price': price,
			'places': places,
			'category':category,
			'file': fileName,
			'filebckg': filebckgName
		})
		.success(function(data, status, headers, config){
			$scope.message = data;
			if(file){
				$scope.upload(file, $scope.eventName, "img");
			}
			if(filebckg){
				$scope.upload(filebckg, $scope.eventName,"bckg");
			}
		});
	}
}]);

app.controller('HeaderManager', ['$scope', '$sessionStorage','$location', function($scope, $sessionStorage, $location){
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};

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







