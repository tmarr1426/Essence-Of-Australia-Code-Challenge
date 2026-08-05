<?php

require_once __DIR__ . "/../database/Database.php";


class ActionRepository
{

    private PDO $db;


    public function __construct()
    {
        $this->db = Database::connect();
    }



    public function hasActionToday(
        int $userId,
        string $actionType
    ): bool {

        $query = "
            SELECT COUNT(*)
            FROM user_actions
            WHERE user_id = ?
            AND action_type = ?
            AND DATE(created_at) = CURDATE()
        ";


        $stmt = $this->db->prepare($query);


        $stmt->execute([
            $userId,
            $actionType
        ]);


        return $stmt->fetchColumn() > 0;

    }



    public function createAction(
    int $userId,
    string $actionType
): void {

    $query = "
        INSERT INTO user_actions
        (
            user_id,
            action_type
        )
        VALUES (?, ?)
    ";


    $stmt = $this->db->prepare($query);


    $stmt->execute([
        $userId,
        $actionType
    ]);


    // echo json_encode([
    //     "inserted" => true,
    //     "id" => $this->db->lastInsertId(),
    //     "user_id" => $userId,
    //     "action" => $actionType
    // ]);

    exit;

}

}