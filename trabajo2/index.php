<?php
require_once 'controllers.php';

// Configuración de encabezados
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Obtenemos el método HTTP y los datos enviados
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
$taskController = new TaskController();

// Rutas y lógica
switch ($method) {
    case 'POST': // Crear tarea
        echo json_encode($taskController->createTask($input));
        break;

    case 'GET': // Obtener tareas (todas o por ID)
        $id = isset($_GET['id']) ? intval($_GET['id']) : null;
        if ($id) {
            echo json_encode($taskController->getTasks($id));
        } else {
            echo json_encode($taskController->getAllTasks());
        }
        break;

    case 'PUT': // Actualizar tarea
        echo json_encode($taskController->updateTask($input));
        break;

    case 'DELETE': // Eliminar tarea
        if (isset($input['ID'])) {
            echo json_encode($taskController->deleteTask($input['ID']));
        } else {
            echo json_encode(["error" => "ID no proporcionado para eliminar"]);
        }
        break;

    default:
        echo json_encode(["error" => "Método HTTP no soportado"]);
        break;
}
