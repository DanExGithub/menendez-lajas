// Application module
angular.module('menendezApp', ['ngValidate'])
    .factory('datosAjax', function($http) {
        return {
            sendContactoData: function(jsonData) {
                return $http.post('backend/api/services/contacto-service.php', {
                    operacion: 'sendContactoData',
                    jsonDatos: jsonData
                });
            }
        }
    })
    .controller('ContactoCtrl', function($scope,$http,datosAjax){
        
        $scope.validationOptions = {
            rules: {
                nombre: {
                    required: true,
                },
                apellido: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true
                },
                mensaje: "required"
            },
            messages: {
                nombre: "Debe ingresar su nombre.",
                apellido: "Debe ingresar su apellido.",
                email: {
                    required: "Debe ingresar un e-mail válido",
                    email: "El email debe ser válido"
                },
                mensaje: "Debe ingresar un mensaje"
            }
        };
        
        $scope.prepareDataToSend = function(){
            jsonData = {
                "nombre"    :   $scope.contacto.nombre,
                "apellido"    :   $scope.contacto.apellido,
                "email"    :   $scope.contacto.email,
                "mensaje"    :   $scope.contacto.mensaje
            }
            return jsonData;
        }
        
        $scope.contactoSend = function(form){
            if (form.validate()) {
                jsonData = $scope.prepareDataToSend();
                console.log(jsonData);
                datosAjax.sendContactoData(jsonData).then(function(response) {
                    $scope.loginError = response.data.message;
                });
            }
        }
    });