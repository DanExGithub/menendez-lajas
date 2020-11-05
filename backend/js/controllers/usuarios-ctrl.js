app.controller("UserCtrl",['$scope','$http', 'AJAXUserService', 'FileUploader', function($scope,$http,AJAXUserService,FileUploader){

var uploader = $scope.uploader = new FileUploader({
    url: 'api/services/upload-service.php',
    autoUpload: true
});

// FILTERS

uploader.filters.push({
    name: 'customFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
    }
});

// CALLBACKS

uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
};
uploader.onAfterAddingFile = function(fileItem) {
    console.info('onAfterAddingFile', fileItem);
};
uploader.onAfterAddingAll = function(addedFileItems) {
    console.info('onAfterAddingAll', addedFileItems);
};
uploader.onBeforeUploadItem = function(item) {
    console.info('onBeforeUploadItem', item);
};
uploader.onProgressItem = function(fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
};
uploader.onProgressAll = function(progress) {
    console.info('onProgressAll', progress);
};
uploader.onSuccessItem = function(fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
};
uploader.onErrorItem = function(fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
};
uploader.onCancelItem = function(fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
};
uploader.onCompleteItem = function(fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
};
uploader.onCompleteAll = function() {
    //debugger;
    console.info('onCompleteAll');
    $scope.uploadedFile = true;
    $('#fotoimg').attr('src','upload/'+$scope.uploader.queue[0].file.name)    
};

console.info('uploader', uploader);

// --------------------------------------------------> Funciones de inicialización

/**
 * Función de inicialización
 */
function init(){
    $scope.paisPrimerOpcion="Cargando...";
    $scope.provinciaPrimerOpcion="Seleccione...";
    $scope.localidadPrimerOpcion="Seleccione...";
    $scope.getPaises();
    $scope.uploadedFile = false;
}

/**
* Obtener datos de paises
*/
$scope.getPaises = function() {
    AJAXUserService.getPaises()
            .then( function(response){
                $scope.paises = response.data;
                $scope.paisPrimerOpcion = "Seleccione...";
            });
};

/**
* Obtener datos de provincias
*/
$scope.getProvinciasByPais = function(idPais) {
    if (idPais!==undefined){
        $scope.provinciaPrimerOpcion = "Cargando...";
        AJAXUserService.getProvinciasByPais(idPais)
                .then( function(response){
                    $scope.provincias = response.data;
                    $scope.provinciaPrimerOpcion = "Seleccione...";
                });
    }else{
        $scope.provincias = {};
    }
};

/**
* Obtener datos de localidades
*/
$scope.getLocalidadesByProvincia = function(idProvincia) {
    if (idProvincia!==undefined){
        $scope.localidadPrimerOpcion = "Cargando...";
        AJAXUserService.getLocalidadesByProvincia(idProvincia)
                .then( function(response){
                    $scope.localidades = response.data;
                    $scope.localidadPrimerOpcion = "Seleccione...";
                });
    }else{
        $scope.localidades = {};
    }
};

$scope.registerUser = function(register,uploadedFile){
    //debugger;
    if (!uploadedFile){
        $('#photo-error').removeClass('d-none').addClass('d-block');
    }else{
        $('#photo-error').removeClass('d-block').addClass('d-none');
        AJAXUserService.registerUser(register,$('#fotoimg').attr('src'))
            .then( function(response){
                
            },function(response){
                
            });
    }
}

// -------------------------------------------------------------------------------

init();

}]);