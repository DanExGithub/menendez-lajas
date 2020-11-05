<?php

namespace Model;

use Core\EntidadBase;

/**
 * Paises
 *
 * @author Marcelo Cuello
 */
class Pais extends EntidadBase{
    public function __construct($conn) {
        parent::__construct($conn, EntidadBase::PAIS);
    }
    
    
}
