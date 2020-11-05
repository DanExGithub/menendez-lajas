<?php

namespace Core;

/**
 * Description of ControladorBase
 *
 * @author Marcelo Cuello
 */
class ControladorBase {
    public $viewsHelper;
    
    public function __construct($viewsHelper) {
        $this->viewsHelper=$viewsHelper;
    }


    public function view($vista,$datos=array()){
        require_once 'api/view/'.$vista.'View.php';
    }
     
    public function redirect($controlador=CONTROLADOR_DEFECTO,$accion=ACCION_DEFECTO){
        header("Location:index.php?controller=".$controlador."&action=".$accion);
    }
     
    //Métodos para los controladores

}
