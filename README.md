# Football Manager

Football Manager is a web application designed to manage football teams and players. The project is developed using Java 17, Spring Boot 2.7.11 and Angular.

## Features

- Basic CRUD operations for teams and players, following REST style.
- Player transfer operation from one team to another.
- Display a list of teams with basic information (team name, city, country, etc.).
- Display a list of all players with basic information (name, start date of career, team, etc.).
- Access detailed information about a team and its players, with the ability to edit team data.
- Access detailed information about a player, with the ability to edit player data and conduct transfer operations.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- JDK 17 or later
- Node.js 14 or later
- Angular CLI
- Docker and Docker Compose

### Installation

1. Clone the repository:

```
git clone https://github.com/taras-zhyravetskyi/Football-manager-SpringBoot-Angular.git
```

2. Build and run the project using Docker Compose in project directory:

```
docker-compose up --build
```

The application will be available at http://localhost:4200/.

## Usage

- To view the list of teams, navigate to the home page.
- To add a new team, click on the "Add Team" button and fill in the required fields.
- To delete a team, click on the "Delete" button next to the corresponding team.
- To view the list of players, click on the "Players" link in the navigation bar.
- To add a new player, click on the "Add Player" button and fill in the required fields.
- To delete a player, click on the "Delete" button next to the corresponding player.
- To view detailed information about a team, click on the team's name.
- To edit a team's information, click on the "Edit" button on the team details page.
- To view detailed information about a player, click on the player's name in the list of players or on the team details page.
- To edit a player's information, click on the "Edit" button on the player details page.
- To transfer a player, select the destination team and click on the "Transfer" button.

## Video Presentation
You can check how the app work in this video presentation:
https://www.loom.com/share/4414b81190124e6a98eec3bb168ddf68