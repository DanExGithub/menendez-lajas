<?php

function cargarControlador($controller){
    $controlador= '\\Controller\\'.ucwords($controller).'Controller';
    
    $controllerObj=new $controlador(new \Core\ViewsHelper());
    return $controllerObj;
}
 
function cargarAccion($controllerObj,$action){
    $accion=$action;
    $controllerObj->$accion();
}
 
function lanzarAccion($controllerObj){
    if(isset($_GET["action"]) && method_exists($controllerObj, $_GET["action"])){
        cargarAccion($controllerObj, $_GET["action"]);
    }else{
        cargarAccion($controllerObj, ACCION_DEFECTO);
    }
}

