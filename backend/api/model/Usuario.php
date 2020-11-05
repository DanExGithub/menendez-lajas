<?php

namespace Model;

use Core\EntidadBase;

/**
 * Usuarios del sistema
 *
 * @author Marcelo Cuello
 */
class Usuario extends EntidadBase{
    var $id;
    var $nombre;
    var $apellido;
    var $email;
    var $password;
    var $tel;
    var $id_localidad;
    var $foto;
    var $bio;
    var $admin;
    var $certified;
    var $estado;    
    
    public function __construct($conn) {
        parent::__construct($conn, parent::USUARIO);
    }
    
    public function add(){
        $query="INSERT INTO ".$this->table." (nombre,apellido,email,password,tel,id_localidad,foto,bio)
                VALUES('".$this->nombre."',
                       '".$this->apellido."',
                       '".$this->email."',
                       '".$this->password."',
                       '".$this->tel."',
                       '".$this->id_localidad."',
                       '".$this->foto."',
                       '".$this->bio."');";
        
        return $this->conn->query_array($query, __file__, __line__);
    }
    
    public function getByLogIn(){
        $query = "select * from ".$this->table." where email = '".$this->email."' and password = '".$this->password."';";
        return $this->conn->query_array($query, __file__, __line__);
    }
    
    public function getId() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function getTel() {
        return $this->tel;
    }

    public function getId_localidad() {
        return $this->id_localidad;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getFoto() {
        return $this->foto;
    }

    public function getBio() {
        return $this->bio;
    }

    public function getAdmin() {
        return $this->admin;
    }

    public function getCertified() {
        return $this->certified;
    }

    public function getEstado() {
        return $this->estado;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
        return $this;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
        return $this;
    }

    public function setEmail($email) {
        $this->email = $email;
        return $this;
    }

    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    public function setTel($tel) {
        $this->tel = $tel;
        return $this;
    }

    public function setId_localidad($id_localidad) {
        $this->id_localidad = $id_localidad;
        return $this;
    }

    public function setFoto($foto) {
        $this->foto = $foto;
        return $this;
    }

    public function setBio($bio) {
        $this->bio = $bio;
        return $this;
    }

    public function setAdmin($admin) {
        $this->admin = $admin;
        return $this;
    }

    public function setCertified($certified) {
        $this->certified = $certified;
        return $this;
    }

    public function setEstado($estado) {
        $this->estado = $estado;
        return $this;
    }


}
