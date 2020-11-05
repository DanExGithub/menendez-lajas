/** Módulo para servicios PHP invocados con AJAX */
app.service('AJAXUserService', ['$http', function($http) {
    
    // Provincias por pais
    this.getPaises = function() {
        return $http.post('api/services/paises-service.php',{
            "operacion":"getPaises"
        });
    };
        
    // Provincias por pais
    this.getProvinciasByPais = function(idPais) {
        return $http.post('api/services/provincias-service.php',{
            "operacion":"getProvinciasByPais",
            "pais":idPais
        });
    };
    
    // Provincias por pais
    this.getLocalidadesByProvincia = function(idProvincia) {
        return $http.post('api/services/localidades-service.php',{
            "operacion":"getLocalidadesByPais",
            "provincia":idProvincia
        });
    };
    
    // Registrar un usuario
    this.registerUser = function(user,foto) {
        //debugger;
        return $http.post('api/services/usuarios-service.php',{
            "operacion":"registerUser",
            "nombre":user.nombre,
            "apellido":user.apellido,
            "email":user.email,
            "password":user.password,
            "tel":user.tel,
            "localidad":user.localidad.id,
            "foto":foto,
            "bio":user.bio
        });
    };

}]);