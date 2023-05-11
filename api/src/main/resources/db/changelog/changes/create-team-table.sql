--liquibase formatted sql
--changeset <taras.zhyravetskyi>:<create-team-table>

CREATE TABLE IF NOT EXISTS teams (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       country VARCHAR(255) NOT NULL,
                       city VARCHAR(255) NOT NULL,
                       commission_rate DECIMAL(19,4) NOT NULL,
                       account_balance DECIMAL(19,2) NOT NULL
);

-- rollback DROP TABLE IF EXISTS teams;
