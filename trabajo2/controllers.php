<?php
//codigo controlador
require_once 'bd_configuration.php';

class TaskController {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function createTask($data) {
        if (!isset($data['NAME']) || !isset($data['DETAILS'])) {
            return ["error" => "Parámetros NAME y DETAILS son obligatorios"];
        }

        $query = "INSERT INTO Task (NAME, DETAILS, STATE, DCREATION, DEND) VALUES (?, ?, 'V', CURDATE(), NULL)";
        $params = [$data['NAME'], $data['DETAILS']];
        $this->db->executeQuery($query, $params, "ss");

        return ["message" => "Tarea creada exitosamente"];
    }

    public function getAllTasks() {
        $query = "SELECT * FROM Task";
        $result = $this->db->executeQuery($query);
        $tasks = $result->get_result()->fetch_all(MYSQLI_ASSOC);
    
        // Convertimos las fechas al formato esperado por la interfaz Task
        foreach ($tasks as &$task) {
            $task['DCREATION'] = date('Y-m-d', strtotime($task['DCREATION']));
            $task['DEND'] = $task['DEND'] ? date('Y-m-d', strtotime($task['DEND'])) : null;
        }
    
        return $tasks;
    }

    public function getTasks($id = null) {
        if ($id) {
            $query = "SELECT * FROM Task WHERE ID = ?";
            $result = $this->db->executeQuery($query, [$id], "i");
            return $result->get_result()->fetch_assoc();
        } else {
            $query = "SELECT * FROM Task";
            $result = $this->db->executeQuery($query);
            return $result->get_result()->fetch_all(MYSQLI_ASSOC);
        }
    }

    public function updateTask($data) {
        $query = "UPDATE Task SET NAME = ?, DETAILS = ?, STATE = ?, DCREATION = ?, DEND = ? WHERE ID = ?";
        $params = [$data['NAME'], $data['DETAILS'], $data['STATE'], $data['DCREATION'], $data['DEND'], $data['ID']];
        $this->db->executeQuery($query, $params, "sssssi");
        return ["message" => "Tarea actualizada exitosamente"];
    }

    public function deleteTask($id) {
        $query = "DELETE FROM Task WHERE ID = ?";
        $this->db->executeQuery($query, [$id], "i");
        return ["message" => "Tarea eliminada exitosamente"];
    }
}
