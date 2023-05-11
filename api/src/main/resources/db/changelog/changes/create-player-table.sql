--liquibase formatted sql
--changeset <taras.zhyravetskyi>:<create-player-table>

CREATE TABLE players (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         age DECIMAL(19,4) NOT NULL,
                         months_of_experience DECIMAL(19,4) NOT NULL,
                         team_id BIGINT,
                         FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- rollback DROP TABLE IF EXISTS teams;
