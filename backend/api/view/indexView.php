<!DOCTYPE html>
<html ng-app="loginApp">
<head>
	<title>RapiBnB - Usuarios</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
        <!-- Include Bootstrap CSS -->
	<link rel="stylesheet" type="text/css" href="vendor/twitter/bootstrap/dist/css/bootstrap.min.css">
	<!-- Include main CSS -->
        <link rel="stylesheet" type="text/css" href="css/main.css">
	<!-- Include jQuery library -->
        <script src="vendor/components/jquery/jquery.min.js"></script>
        <script src="lib/jquery.validate.js"></script>
	<!-- Include AngularJS library -->
        <script src="lib/angularjs/angular.min.js"></script>
        <script src="lib/angularjs/angular-validate.min.js"></script>
	<!-- Include Bootstrap Javascript -->
        <script src="vendor/twitter/bootstrap/dist/js/bootstrap.min.js"></script>	
</head>
<body>
    <!-- Page Content -->
    <div class="container" ng-controller="LogInCtrl" ng-cloak>
        <div class="row">
            <div class="col-lg-12 section-title">
                <p class="title">Log in</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                
                <form name="login" class="form-container" id="register" ng-submit="loginUser(login)" ng-validate="validationOptions" novalidate>
                    <!-- File Uploader -->
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" name="email" id="email" ng-model="user.email">
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" name="password" id="password" ng-model="user.password">
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <button class="btn btn-primary form-button" type="submit">Ingresar</button>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <p class="text-danger">{{loginError}}</p>
                    </div>
                </form>
                </div>
        </div>

        <!-- Footer -->
        <footer class=" py-2 bg-light">
            <div class="container">
                <p class="m-0 text-center">Made by Marcelo Cuello</p>
            </div>
        </footer>
    </div>
    <!-- Bootstrap core JavaScript -->
    <script src="js/angular.login.js"></script>
    <script>
    // Disable form submissions if there are invalid fields
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
    </script>
</body>
</html>
