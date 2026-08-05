<?php

require_once __DIR__ . "/ApiClient.php";
require_once __DIR__ . "/../repositories/GameRepository.php";
// require_once __DIR__ . "/../repositories/UserRepository.php";
require_once __DIR__ . "/ActionService.php";


class GameService
{

    private ApiClient $client;
    private GameRepository $repository;
    // private UserRepository $userRepository;
    private ActionService $actionService;

    public function __construct()
    {

        $this->client = new ApiClient();

        $this->repository = new GameRepository();

        //$this->userRepository = new UserRepository();

        $this->actionService = new ActionService();

    }


    /**
     * Add a game
     * Sends to external API and saves locally
     */
    public function addGame(
    string $name,
    int $userId
)
{

    if (
        $this->actionService->hasActionToday(
            $userId,
            "add_game"
        )
    ) {

        throw new Exception(
            "You can only add one game per day"
        );

    }

// Add gmae to external API
    $apiResponse = $this->client->post(
        "/games/add",
        [
            "name" => $name
        ]
    );

// Save locally
    $this->repository->createGame(
        $name,
        $userId
    );

// Record user action
    $this->actionService->createAction(
        $userId,
        "add_game"
    );


    return $apiResponse;

}



    /**
     * Get all games
     */
    public function getGames(
    ?int $userId = null
)
{
    return $this->repository->getGames(
        $userId
    );
}



    /**
     * Search games
     */
    public function searchGames(string $term)
    {
        return $this->repository->searchGames($term);
    }



    /**
     * Vote for a game
     */
    public function vote(
    int $gameId,
    int $userId
)
{

    if (
        $this->actionService->hasActionToday(
            $userId,
            "vote"
        )
    ) {

        throw new Exception(
            "You can only vote once per day"
        );

    }


    // Send vote to external API
    $response = $this->client->post(
        "/games/vote",
        [
            "id" => $gameId
        ]
    );


    // Save vote locally
    $this->repository->createVote(
        $gameId,
        $userId
    );


    // Record user action
    $this->actionService->createAction(
        $userId,
        "vote"
    );


    return $response;

}

public function removeVote(
    int $gameId,
    int $userId
)
{

    $this->repository->removeVote(
        $gameId,
        $userId
    );


    $this->repository->decrementVoteCount(
        $gameId
    );


    return [
        "message" => "Vote removed"
    ];

}



    /**
     * Remove a game
     */
    public function removeGame(int $id)
    {

        // Remove from external API
        $apiResponse = $this->client->post(
            "/games/remove",
            [
                "id" => $id
            ]
        );


        // Remove from local database
        $this->repository->removeGame(
            $id
        );


        return $apiResponse;

    }

}