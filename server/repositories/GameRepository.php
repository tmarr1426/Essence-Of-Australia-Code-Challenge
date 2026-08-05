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


    public function getGames(
    ?int $userId = null
)
{

    $query = "
        SELECT
            games.id,
            games.title,
            games.user_id,

            COUNT(votes.id) AS vote_count
    ";


    if ($userId !== null) {
        $query .= ",
            MAX(
                CASE
                    WHEN votes.user_id = ?
                    THEN 1
                    ELSE 0
                END
            ) AS userVoted
        ";
    }


    $query .= "
        FROM games

        LEFT JOIN votes
        ON games.id = votes.game_id

        GROUP BY games.id,
        games.title,
        games.user_id

        ORDER BY vote_count DESC
    ";


    $stmt = $this->db->prepare($query);


    if ($userId !== null) {

        $stmt->execute([
            $userId
        ]);

    } else {

        $stmt->execute();

    }


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