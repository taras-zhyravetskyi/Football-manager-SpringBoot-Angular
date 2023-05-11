package com.example.football.manager.service;

import com.example.football.manager.model.Team;
import java.util.List;

public interface TeamService {
    Team findById(Long id);

    Team save(Team team);

    void delete(Long id);

    List<Team> findAll();
}
