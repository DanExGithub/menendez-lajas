// Application module
angular.module('loginApp', ['ngValidate'])
    .factory('datosAjax', function($http) {
        return {
            getUserByLogIn: function(jsonData) {
                return $http.post('api/services/usuarios-service.php', {
                    operacion: 'getUserByLogIn',
                    jsonDatos: jsonData
                });
            }
        }
    })
    .controller('LogInCtrl', function($scope,$http,datosAjax){
        $scope.validationOptions = {
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: "required"
            },
            messages: {
                email: {
                    required: "Debe ingresar un e-mail válido",
                    email: "El email debe ser válido"
                },
                password: "Debe ingresar una contraseña"
            }
        };
        
        $scope.prepareDataToSend = function(){
            jsonData = {
                "email"    :   $scope.user.email,
                "password" :   $scope.user.password
            }
            return jsonData;
        }
        
        $scope.loginUser = function(form){
            if (form.validate()) {
                $scope.loginError = "";
                jsonData = $scope.prepareDataToSend();
                datosAjax.getUserByLogIn(jsonData).then(function(response) {
                    //debugger;
                    if (response.data.status==1){
                        $scope.loginError = response.data.message;
                    }else{
                        $scope.loginError = response.data.message;
                    }
                });
            }
        }
    });