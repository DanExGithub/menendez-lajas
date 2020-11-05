<!DOCTYPE html>
<html ng-app="userApp">
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
	<!-- Include AngularJS library -->
        <script src="lib/angularjs/angular.min.js"></script>
        <script src="lib/angularjs/angular-file-upload.min.js"></script>
	<!-- Include Bootstrap Javascript -->
        <script src="vendor/twitter/bootstrap/dist/js/bootstrap.min.js"></script>	
</head>
<body>
    <!-- Page Content -->
    <div class="container" ng-controller="UserCtrl" ng-cloak>
        <div class="row">
            <div class="col-lg-12 section-title">
                <p class="title">Registrarse</p>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                
                <form name="register" class="form-container" id="register" ng-submit="registerUser(user,uploadedFile)">
                    <!-- File Uploader -->
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <div class="custom-file">
                            <label class="label" for="foto">Subir foto</label>
                            <input type="file" class="form-control-file" name="foto" id="foto" nv-file-select uploader="uploader">
                        </div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <div ng-repeat="item in uploader.queue">
                            <span><img id="fotoimg" src="upload/{{item.file.name}}" height="100"></span>
                        </div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" ng-model="user.nombre" autofocus required>
                        <div class="form-group"><p class="text-danger" ng-show="register.nombre.$invalid && register.nombre.$dirty">Campo Nombre es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="apellido">Apellido</label>
                        <input type="text" class="form-control" name="apellido" id="apellido" ng-model="user.apellido" autofocus required>
                        <div class="form-group"><p class="text-danger" ng-show="register.apellido.$invalid && register.apellido.$dirty">Campo Apellido es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" name="email" id="email" ng-model="user.email" autofocus required>
                        <div class="form-group"><p class="text-danger" ng-show="register.email.$invalid && register.email.$dirty">Campo Email es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" name="password" id="password" ng-model="user.password" autofocus required>
                        <div class="form-group"><p class="text-danger" ng-show="register.password.$invalid && register.password.$dirty">Campo Contraseña es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="tel">Teléfono</label>
                        <input type="number" class="form-control" name="tel" id="tel" ng-model="user.tel" autofocus required>
                        <div class="form-group"><p class="text-danger" ng-show="register.tel.$invalid && register.tel.$dirty">Campo Teléfono es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="pais">País</label>
                        <select class="custom-select form-control" name="pais" id="pais" ng-options="option.paisnombre for option in paises track by option.id" ng-model="user.pais" ng-change="getProvinciasByPais(user.pais.id)" autofocus required>
                            <option value="">{{paisPrimerOpcion}}</option>
                        </select>
                        <div class="form-group"><p class="text-danger" ng-show="register.pais.$invalid && register.pais.$dirty">Campo País es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="provincia">Provincia</label>
                        <select class="custom-select form-control" name="provincia" id="provincia" ng-options="option.provincianombre for option in provincias track by option.id" ng-model="user.provincia" ng-change="getLocalidadesByProvincia(user.provincia.id)" autofocus required>
                            <option value="">{{provinciaPrimerOpcion}}</option>
                        </select>
                        <div class="form-group"><p class="text-danger" ng-show="register.provincia.$invalid && register.provincia.$dirty">Campo Provincia es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="localidad">Localidad</label>
                        <select class="custom-select form-control" name="localidad" id="localidad" ng-options="option.localidadnombre for option in localidades track by option.id" ng-model="user.localidad" autofocus required>
                            <option value="">{{localidadPrimerOpcion}}</option>
                        </select>
                        <div class="form-group"><p class="text-danger" ng-show="register.localidad.$invalid && register.localidad.$dirty">Campo Localidad es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <label for="bio">Bio</label>
                        <textarea class="form-control" rows="3" ng-model="user.bio" name="bio" id="bio" autofocus required></textarea>
                        <div class="form-group"><p class="text-danger" ng-show="register.bio.$invalid && register.bio.$dirty">Campo Bio es obligatorio!</p></div>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <button class="btn btn-primary form-button"  ng-disabled="register.$invalid">Enviar datos</button>
                    </div>
                    <div class="mx-auto col-sm-12 col-md-10 col-lg-6 form-group">
                        <p class="text-danger d-none" id="photo-error">Debe subir una foto.</p>
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
    <script src="js/angular-script.js"></script>
    <script src="js/services/AJAX-usuarios-service.js"></script>
    <script src="js/controllers/usuarios-ctrl.js"></script>
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
