<?php

require_once __DIR__ . "/../database/Database.php";


class GameRepository
{

    private PDO $db;


    public function __construct()
    {
        $this->db = Database::connect();
    }


    public function createGame(string $name)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO games(title)
             VALUES (?)"
        );

        return $stmt->execute([
            $name
        ]);
    }


    public function getGames()
    {
        $stmt = $this->db->query(
            "SELECT *
             FROM games
             ORDER BY created_at DESC"
        );

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function searchGames(string $term)
    {
        $stmt = $this->db->prepare(
            "SELECT *
             FROM games
             WHERE title LIKE ?"
        );

        $stmt->execute([
            "%" . $term . "%"
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function removeGame(int $id)
    {
        $stmt = $this->db->prepare(
            "DELETE FROM games
             WHERE id = ?"
        );

        return $stmt->execute([
            $id
        ]);
    }

    public function createVote(
    int $gameId,
    int $userId
)
{

    $query = "
        INSERT INTO votes
        (
            game_id,
            user_id
        )
        VALUES (?, ?)
    ";


    $stmt = $this->db->prepare($query);


    $stmt->execute([
        $gameId,
        $userId
    ]);

}

}