<?php

namespace Core;

/**
 * Consultas básicas para cualquier tabla
 *
 * @author Marcelo Cuello
 */
class EntidadBase {
    var $table;
    var $conn;
    
    const USUARIO = 'public.usuario';
    const PAIS = 'public.pais';
    const PROVINCIA = 'public.provincia';
    const LOCALIDAD = 'public.localidad';
    
    public function __construct($conn,$table) {
        $this->table = $table;
        $this->conn = $conn;
    }
    
    public function getAll(){
        $query = "select * from ".$this->table."";
        return $this->conn->query_array($query, __file__, __line__);
    }
    
    public function getById($id){
        $query = "select * from ".$this->table." where id=".$id;
        return $this->conn->query_array($query, __file__, __line__);
    }
    
    public function getBy($column,$value){
        $query = "select * from ".$this->table." where ".$column."=".$value;
        return $this->conn->query_array($query, __file__, __line__);
    }
}
