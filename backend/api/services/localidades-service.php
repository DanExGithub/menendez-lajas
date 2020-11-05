<?php

/**
 * Descripción: Servicio para las operaciones solicitadas desde frontend.
 */
require '../../vendor/autoload.php';
use Core\DBConnection;
use Model\Localidad;

$data = json_decode(file_get_contents("php://input"));

function getLocalidadesByPais($idProvincia){
    $localidad = new Localidad(DBConnection::getInstance());
    return json_encode($localidad
            ->setIdProvincia($idProvincia)
            ->getByIdProvincia());
}


switch ($data->operacion) {
	case 'getLocalidadesByPais':{
		echo getLocalidadesByPais($data->provincia);
		}break;
	default:
		# code...
		break;
}

?>