<?php

/**
 * Descripción: Servicio para las operaciones solicitadas desde frontend.
 */
require '../../vendor/autoload.php';
use Core\DBConnection;
use Model\Provincia;

$data = json_decode(file_get_contents("php://input"));

function getProvinciasByPais($idPais){
    $provincia = new Provincia(DBConnection::getInstance());
    return json_encode($provincia
            ->setIdPais($idPais)
            ->getByIdPais());
}


switch ($data->operacion) {
	case 'getProvinciasByPais':{
		echo getProvinciasByPais($data->pais);
		}break;
	default:
		# code...
		break;
}

?>