<?php

class Database {
    private $servername = "localhost";
    private $username = "root";
    private $password = ""; // Por defecto en XAMPP
    private $database = "trabajo2";
    public $conn;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);

        if ($this->conn->connect_error) {
            die(json_encode(["error" => "Error de conexión a la base de datos: " . $this->conn->connect_error]));
        }
    }

    public function executeQuery($query, $params = [], $types = "") {
        $stmt = $this->conn->prepare($query);
        if ($types && $params) {
            $stmt->bind_param($types, ...$params);
        }
        $stmt->execute();
        return $stmt;
    }

    public function close() {
        $this->conn->close();
    }
}