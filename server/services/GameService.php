<?php

require_once __DIR__ . "/ApiClient.php";

class GameService
{
    private ApiClient $client;

    public function __construct()
    {
        $this->client = new ApiClient();
    }


    public function getGames()
    {
        return $this->client->post("/games/list");
    }


    public function searchGames(string $query)
    {
        return $this->client->post(
            "/games/search",
            [
                "query" => $query
            ]
        );
    }


    public function addGame(string $name)
    {
        return $this->client->post(
            "/games/add",
            [
                "name" => $name
            ]
        );
    }


    public function vote(int $id)
    {
        return $this->client->post(
            "/games/vote",
            [
                "id" => $id
            ]
        );
    }

    public function removeGame(int $id)
    {
        return $this->client->post(
            "/games/remove",
            [
                "id" => $id
            ]
        );
    }

}