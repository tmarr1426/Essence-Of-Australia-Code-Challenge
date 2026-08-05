# Game Voting Application

A full-stack game voting application that allows users to register, suggest games for an office game library, and vote on the games they would like to see added.

The application is built as a containerized full-stack application using React, TypeScript, PHP, and MySQL. The entire project can be run locally using Docker Compose.

---

## Features

### User Features

- User registration and login
- Secure password hashing
- User-specific voting
- Add new game suggestions
- View available games
- Vote for games
- Remove previously submitted votes
- Daily voting restrictions to prevent duplicate voting
- Search available games

### Game Management

- Add games with user ownership tracking
- Display games ranked by popularity
- Track vote counts
- Display user voting status
- Remove submitted games

### Backend

- REST API architecture
- PHP-based API endpoints
- MySQL database integration
- PDO prepared statements
- Foreign key relationships
- Daily action tracking

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

## Backend

- PHP 8.3
- Apache
- PDO
- REST API

## Database

- MySQL 8.0

## Development / Deployment

- Docker
- Docker Compose

---

# Application Architecture

Game Voting App

├── client
│ ├── React + TypeScript frontend
│ ├── Components
│ ├── Hooks
│ ├── Services
│ └── API communication
│
├── server
│ ├── PHP REST API
│ ├── Controllers
│ ├── Services
│ ├── Database connection
│ └── Authentication logic
│
├── database
│ └── schema.sql
│
└── docker-compose.yml


---

# Running the Application

## Requirements

Before running the application, install:

- Docker Desktop
- Docker Compose

Verify Docker is running:

```bash
docker --version
