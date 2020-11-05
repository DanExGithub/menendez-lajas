<?php

namespace Controller;

use Core\ControladorBase, Core\DBConnection;
use Model\Pais;

/**
 * Controlador de usuarios
 *
 * @author Marcelo Cuello
 */
class IndexController extends ControladorBase{
    public function __construct($viewsHelper) {
        parent::__construct($viewsHelper);
    }
    
    public function index(){
        $this->view("index");
    }
    
    public function register(){
        $this->view("register");
    }
}
