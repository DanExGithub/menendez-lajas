<?php

namespace Model;

use Core\EntidadBase;

/**
 * Localidades
 *
 * @author Marcelo Cuello
 */
class Localidad extends EntidadBase{
    private $id;
    private $idProvincia;
    private $localidadnombre;


    public function __construct($conn) {
        parent::__construct($conn, EntidadBase::LOCALIDAD);
    }
    
    public function getId() {
        return $this->id;
    }

    public function getIdProvincia() {
        return $this->idProvincia;
    }

    public function getLocalidadnombre() {
        return $this->localidadnombre;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setIdProvincia($idProvincia) {
        $this->idProvincia = $idProvincia;
        return $this;
    }

    public function setLocalidadnombre($localidadnombre) {
        $this->localidadnombre = $localidadnombre;
        return $this;
    }

    
    public function getByIdProvincia(){
        return $this->getBy("id_provincia", $this->idProvincia);
    }
    
    
}
