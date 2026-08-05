<?php

require_once __DIR__ . "/../repositories/ActionRepository.php";


class ActionService
{

    private ActionRepository $repository;


    public function __construct()
    {
        $this->repository = new ActionRepository();
    }


    public function hasActionToday(
        int $userId,
        string $actionType
    ): bool {

        return $this->repository->hasActionToday(
            $userId,
            $actionType
        );

    }


    public function createAction(
        int $userId,
        string $actionType
    ): void {

        $this->repository->createAction(
            $userId,
            $actionType
        );

    }

}