<?php

/**
 * Descripción: Servicio para las operaciones solicitadas desde frontend.
 */
require '../../vendor/autoload.php';
use Core\DBConnection;
use Model\Usuario;

$data = json_decode(file_get_contents("php://input"));

function registerUser($nombre,$apellido,$email,$password,$tel,$id_localidad,$foto,$bio){
    $result = (new Usuario(DBConnection::getInstance()))
            ->setNombre($nombre)
            ->setApellido($apellido)
            ->setEmail($email)
            ->setPassword($password)
            ->setTel($tel)
            ->setId_localidad($id_localidad)
            ->setFoto($foto)
            ->setBio($bio)
            ->add();
    
    ($result) ? 'ok' : 'error';
}

function getUserByLogIn($jsnDatos){
    $usr = (new Usuario(DBConnection::getInstance()))
            ->setEmail($jsnDatos->email)
            ->setPassword(md5($jsnDatos->password))
            ->getByLogIn();
    
    if (count($usr)){
        $strStatus = 1;
        $strMessage = "Validación Exitosa";
    }else{
        $strStatus = 0;
        $strMessage = "Error de autenticación";
    }
    
    $arrResult = array(
        "status"    =>  $strStatus,
        "message"   =>  $strMessage
    );
    
    return json_encode($arrResult);
}

switch ($data->operacion) {
	case 'registerUser':{
		echo registerUser($data->nombre,$data->apellido,$data->email,md5($data->password),$data->tel,$data->localidad,$data->foto,$data->bio);
		}break;
	case 'getUserByLogIn':
		echo getUserByLogIn($data->jsonDatos);
                break;
	default:
		# code...
		break;
}

?>