<?php

require_once __DIR__ . "/../database/Database.php";


class UserRepository
{

    private PDO $db;


    public function __construct()
    {
        $this->db = Database::connect();
    }


    public function createUser(
    string $username,
    string $email,
    string $passwordHash
)
{

    $stmt = $this->db->prepare(
        "INSERT INTO users
        (
            username,
            email,
            password_hash
        )
        VALUES (?, ?, ?)"
    );


    $stmt->execute([
        $username,
        $email,
        $passwordHash
    ]);


    return $this->db->lastInsertId();

}



    public function findByEmail(
        string $email
    )
    {

        $stmt = $this->db->prepare(
            "SELECT *
             FROM users
             WHERE email = ?"
        );


        $stmt->execute([
            $email
        ]);


        return $stmt->fetch(
            PDO::FETCH_ASSOC
        );

    }

public function createAction(
    int $userId,
    string $actionType
)
{

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

}

}