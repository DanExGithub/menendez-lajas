<?php

namespace Core;

/**
 * Helper para Vistas
 *
 * @author Marcelo Cuello
 */
class ViewsHelper {
    public function url($controlador=CONTROLADOR_DEFECTO,$accion=ACCION_DEFECTO){
        $urlString="index.php?controller=".$controlador."&action=".$accion;
        return $urlString;
    }
     
    //Helpers para las vistas

}
