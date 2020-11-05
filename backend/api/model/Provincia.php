<?php

namespace Model;

use Core\EntidadBase;

/**
 * Provincias
 *
 * @author Marcelo Cuello
 */
class Provincia extends EntidadBase{
    private $id;
    private $idPais;
    private $provincianombre;


    public function __construct($conn) {
        parent::__construct($conn, EntidadBase::PROVINCIA);
    }
    
    public function getId() {
        return $this->id;
    }

    public function getIdPais() {
        return $this->idPais;
    }

    public function getProvincianombre() {
        return $this->provincianombre;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setIdPais($idPais) {
        $this->idPais = $idPais;
        return $this;
    }

    public function setProvincianombre($provincianombre) {
        $this->provincianombre = $provincianombre;
        return $this;
    }

    public function getByIdPais(){
        return $this->getBy("id_pais", $this->idPais);
    }
    
    
}
