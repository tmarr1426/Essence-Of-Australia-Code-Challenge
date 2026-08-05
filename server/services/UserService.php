<?php

require_once __DIR__ . "/../repositories/UserRepository.php";


class UserService
{

    private UserRepository $repository;


    public function __construct()
    {
        $this->repository = new UserRepository();
    }


    public function register(
    string $username,
    string $email,
    string $password
)
{

    $existingUser = $this->repository->findByEmail($email);


    if ($existingUser) {

        throw new Exception(
            "Email already exists"
        );

    }


    $passwordHash = password_hash(
        $password,
        PASSWORD_BCRYPT
    );


    $userId = $this->repository->createUser(
        $username,
        $email,
        $passwordHash
    );


    return [
        "id" => $userId,
        "username" => $username,
        "email" => $email
    ];

}



    public function login(
        string $email,
        string $password
    )
    {

        $user = $this->repository->findByEmail($email);


        if (
            !$user ||
            !password_verify(
                $password,
                $user["password_hash"]
            )
        ) {

            throw new Exception(
                "Invalid credentials"
            );

        }


        return [
            "id" => $user["id"],
            "username" => $user["username"],
            "email" => $user["email"]
        ];

    }

}