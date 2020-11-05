<?php

/**
 * Descripción: Servicio para las operaciones solicitadas desde frontend.
 */
require '../../vendor/autoload.php';
use Core\DBConnection;
use Model\Pais;

$data = json_decode(file_get_contents("php://input"));

function getPaises(){
    $paises = new Pais(DBConnection::getInstance());
    return json_encode($paises->getAll());
}


switch ($data->operacion) {
	case 'getPaises':{
		echo getPaises();
		}break;
	default:
		# code...
		break;
}

?>