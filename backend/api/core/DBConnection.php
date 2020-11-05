<?php

namespace Core;
use Config\DBConfig;

class DBConnection extends DBConfig{

    private static $link_id;
    /* ----------- */
    private static $host;
    private static $port;
    private static $database;
    private static $user;
    private static $password;
    private static $instance;
    private static $arrConnections = array(); // [[RESOURCE_ID,CONNECTION_STRING],..]

    private function __construct() {
        self::$link_id = -1;
        $this->results = array();
        $this->info = array();
    }

    public function __destruct() {
        $this->close();
    }

    public static function getInstance($strHost = parent::CNT_DB_HOST, $strDatabase = parent::CNT_DB_NAME, $strUser = parent::CNT_DB_USER, $strPassword = parent::CNT_DB_PASS, $strPort = parent::CNT_DB_PORT) {
        if (!isset(self::$instance))
            self::$instance = new DBConnection();
        self::setPGConnLink($strHost, $strDatabase, $strUser, $strPassword, $strPort);
        return self::$instance;
    }

    private static function setPGConnLink($strHost, $strDatabase, $strUser, $strPassword, $strPort) {
        $strConnString = "host=$strHost port=$strPort dbname=$strDatabase user=$strUser password=$strPassword";
        $linkID = 0;
        // Search for the $linkId on $arrConnections by the connection string
        foreach (self::$arrConnections as $key => $val) {
            if ($val[1] === $strConnString) {
                $linkID = $val[0];
                break;
            }
        }

        if ($linkID)
            self::$link_id = $linkID;
        else {
            self::$host = $strHost;
            self::$port = $strPort;
            self::$database = $strDatabase;
            self::$user = $strUser;
            self::$password = $strPassword;
            self::$link_id = -1;
            self::connect();
        }
    }

    private static function connected() {
        return self::$link_id >= 0;
    }

    private static function connect() {
        if (!self::connected()) {
            $strConnString = 'host=' . self::$host . ' port=' . self::$port . ' dbname=' . self::$database . ' user=' . self::$user . ' password=' . self::$password;
            self::$link_id = pg_connect($strConnString);
            if (!self::$link_id)
                self::error("connection failed: " . 'host=' . self::$host . ' port=' . self::$port);
            else {
                self::$arrConnections[(int) self::$link_id] = array(self::$link_id, $strConnString);
                pg_query("SET application_name = '" . parent::CNT_APP_NAME . "'");
            }
        }
    }

    private static function close() {
        foreach (self::$arrConnections as $intID) {
            $strID = $intID[0];
            pg_close($strID);
        }
        self::$link_id = -1;
    }

    function query($q, $file, $line) {
        if (!$this->connected())
            $this->error("must connect first");
        $tmp = pg_query(self::$link_id, $q);
        if (!$tmp) {
            $mensaje = "<hr>";
            $mensaje .= "<br />POSTGRES-PROBLEM : " . utf8_decode(@pg_last_error(self::$link_id));
            $mensaje .= "<br />FILE : $file : $line";
            $mensaje .= "<pre>" . $q . "</pre>";
            $mensaje .= "<hr>";
            $this->informar_error($mensaje);
            $this->close();
        }

        return $tmp;
    }

    /**
     * Devuelve un array de resultados de la consulta
     * @param   type    $q
     * @param   type    $file
     * @param   type    $line
     * @param   type    $result_type
     * @return  array   PGSQL_ASSOC, PGSQL_NUM , or PGSQL_BOTH
     */
    function query_array($q, $file, $line, $result_type = PGSQL_ASSOC) {
        $array = array();
        $tmp = $this->query($q, $file, $line);
        $n = $this->num_rows($tmp);

        for ($i = 0; $i < $n; $i++) {
            $array[$i] = $this->fetch_array($tmp, $i, $result_type);
        }
        pg_free_result($tmp);
        return $array;
    }

    function fetch_array($r, $row, $result_type = PGSQL_ASSOC) {
        return pg_fetch_array($r, $row, $result_type);
    }

    function fetch_row($r, $row) {
        return pg_fetch_row($r, $row);
    }

    function num_rows($r) {
        return pg_num_rows($r);
    }

    function result($t, $r, $c) {
        return pg_fetch_result($t, $r, $c);
    }

    function last_id($strSeqName) {
        $q = "select currval('" . $strSeqName . "');";
        $mzData = $this->query_array($q, __FILE__, __LINE__);
        return $mzData[0][0];
    }

    function lastval() {
        $q = "SELECT lastval();";
        $mzData = $this->query_array($q, __FILE__, __LINE__);
        return $mzData[0][0];
    }

}

?>
