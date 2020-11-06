<?php

/**
 * Descripción: Servicio para las operaciones solicitadas desde frontend.
 */
require '../../vendor/autoload.php';

require '../mail.php';

//use Core\DBConnection;
//use Model\Usuario;

$data = json_decode(file_get_contents("php://input"));

function sendMail($nombre,$apellido,$email,$mensaje){
    $from = "sebastian.menendez@menendezlajas.com.ar";
    $to = "ventas@menendezlajas.com.ar";
    $from_name = "Web";
    $body = "Nombre: $nombre<br>
            Apellido: $apellido<br>
            Email: $email<br>
            Mensaje: $mensaje<br>";
    $asunto = 'Contacto Web';
    
    $resultSendEmail = enviar_email($from,$from_name,trim($to),$body,$asunto);

    if ($resultSendEmail===true){
        $strStatus = 1;
        $strMessage = "Los datos se enviaron exitosamente";
    }else{
        $strStatus = 0;
        $strMessage = "Error en envío de datos. Vuelva a intentar en unos minutos";
    }
    
    $arrResult = array(
        "status"      =>  $strStatus,
        "message"     =>  $strMessage,
        "errorServer" =>  $resultSendEmail
    );
    
    return json_encode($arrResult);
    
    /*$result = (new Usuario(DBConnection::getInstance()))
            ->setNombre($nombre)
            ->setApellido($apellido)
            ->setEmail($email)
            ->setPassword($password)
            ->setTel($tel)
            ->setId_localidad($id_localidad)
            ->setFoto($foto)
            ->setBio($bio)
            ->add();
    
    ($result) ? 'ok' : 'error';*/
}

function getUserByLogIn($jsnDatos){
    $usr = (new Usuario(DBConnection::getInstance()))
            ->setEmail($jsnDatos->email)
            ->setPassword(md5($jsnDatos->password))
            ->getByLogIn();
    
    if (count($usr)){
        $strStatus = 1;
        $strMessage = "Los datos se enviaron exitosamente.";
    }else{
        $strStatus = 0;
        $strMessage = "Error en envío de datos. Vuelva a intentar en unos minutos.";
    }
    
    $arrResult = array(
        "status"    =>  $strStatus,
        "message"   =>  $strMessage
    );
    
    return json_encode($arrResult);
}

switch ($data->operacion) {
	case 'sendContactoData':{
		echo sendMail($data->jsonDatos->nombre,$data->jsonDatos->apellido,$data->jsonDatos->email,$data->jsonDatos->mensaje);
		}break;
	default:
		# code...
		break;
}

?>