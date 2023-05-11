package com.example.football.manager.service;

import com.example.football.manager.model.Player;
import java.util.List;

public interface PlayerService {
    Player findById(Long id);

    Player save(Player player);

    void delete(Long id);

    List<Player> findAll();

    String transferPlayer(Long teamIdTo, Long playerId);
}
