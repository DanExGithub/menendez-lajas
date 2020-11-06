<?php
/**
 * Funcionalidad para la gestión de correo electrónico. 
 * @package        Mail
 * @copyright      Intercomgi 
 * @version		   14/06/2004
 */

// Si versión actual de PHP es mayor o igual la versión de PHP por configuración para phpmailer
require_once '../../lib/phpmailer/PHPMailerAutoload.php';

/**
 * @desc     Decodifica el subject de un email, cuando trae codificación ISO..
 * @author   Martin Jensen
 * @param    string $input subject del email
 */
function decodeSubject($input)
    {
        // Remove white space between encoded-words
        $input = preg_replace('/(=\?[^?]+\?(q|b)\?[^?]*\?=)(\s)+=\?/i', '\1=?', $input);

        // For each encoded-word...
        while (preg_match('/(=\?([^?]+)\?(q|b)\?([^?]*)\?=)/i', $input, $matches)) {

            $encoded  = $matches[1];
            $charset  = $matches[2];
            $encoding = $matches[3];
            $text     = $matches[4];

            switch (strtolower($encoding)) {
                case 'b':
                    $text = base64_decode($text);
                    break;

                case 'q':
                    $text = str_replace('_', ' ', $text);
                    preg_match_all('/=([a-f0-9]{2})/i', $text, $matches);
                    foreach($matches[1] as $value)
                        $text = str_replace('='.$value, chr(hexdec($value)), $text);
                    break;
            }

            $input = str_replace($encoded, $text, $input);
        }

        return $input;
    }

/**
 * @desc     Envia un email utilizando la clase phpmailer. Retorna verdadero si se envió con éxito, falso en caso contrario.
 * @author   Ignacio Cuesta
 * @param    string $From direcci�n de email de remitente
 * @param    string $FromName nombre del remitente
 * @param    array $To arreglo con direcciones de destinatarios.
 * @param    string $body contenido del email
 * @param    string $subject asunto del email
 * @param    array $CC arreglo con direcciones de destinatarios en copia.
 */
 
function enviar_email($From,$FromName,$To,$body,$subject,$CC=array(),$BCC=array(), $att=NULL){
  //if($To=="")
  //	return false;
  
  $mail = new phpmailer();
  $mail->IsSMTP();
  $mail->Host = "mail.menendezlajas.com.ar";
  $mail->From = $From;
  $mail->FromName = $FromName;
  $mail->Timeout=30;
  $mail->IsHTML(true);
  $mail->SMTPAuth = true;
  $mail->Username = "sebastian.menendez@menendezlajas.com.ar";
  $mail->Password = "sebastian915";
  //$mail->PluginDir = MAIL_PLUGIN_DIR;
  //$mail->SMTPDebug = 4; // setup a level to enable debugging (default output: echo)
  // disable SSL Certificate verification (not secure, SSL config recommended)
  
    $mail->SMTPOptions = array(
      'ssl' => array(
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true
      )
    );
  
  
  $mail->AddAddress($To);
  if($att!=NULL)
	$mail->AddAttachment($att, $att);
  $mail->CharSet = 'utf-8';
 
  if (!empty($CC))
	  foreach ($CC as $x=>$clave){  
		  $mail->AddCC($clave);
		}
		
  if (!empty($BCC))
	  foreach ($BCC as $x=>$clave){
		  $mail->AddBCC($clave);
		}		

  $mail->Subject = $subject;
  $mail->Body = $body;
  $exito = $mail->Send();
   error_log("EnviarMail: (".$mail->ErrorInfo.")" );

  if(!$exito){
	  return $mail->ErrorInfo;
  }
  return true;
}   

?>