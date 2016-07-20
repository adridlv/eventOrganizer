<!DOCTYPE html>
<html lang="en" ng-app= "dataEvents">
<head>
	<meta charset="UTF-8">
	<title>Event Organizer</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/ng-file-upload.css">
	<link rel="stylesheet" href="css/stylesheet.css">
</head>
<body>
	<header ng-controller="HeaderManager">
		<evt-header></evt-header>
	</header>

	<main>
		<div class="container" ng-view>

		</div>
	</main>

	<footer>
		<evt-footer></evt-footer>
	</footer>
	<script src="js/jquery-2.2.4.min.js"></script>
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.min.js"></script>
	<script src="js/ngStorage.min.js"></script>
	<script src="js/ng-file-upload-shim.min.js"></script>
	<script src="js/ng-file-upload.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/app.js"></script>
</body>
</html>



