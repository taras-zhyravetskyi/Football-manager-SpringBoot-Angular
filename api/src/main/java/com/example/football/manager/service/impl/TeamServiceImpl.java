package com.example.football.manager.service.impl;

import com.example.football.manager.model.Player;
import com.example.football.manager.model.Team;
import com.example.football.manager.repository.PlayerRepository;
import com.example.football.manager.repository.TeamRepository;
import com.example.football.manager.service.TeamService;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    @Override
    public Team findById(Long id) {
        return teamRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Can`t find team by id " + id));
    }

    @Override
    public Team save(Team team) {
        return teamRepository.save(team);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Team not found"));

        for (Player player : team.getPlayers()) {
            player.setTeam(null);
        }
        playerRepository.saveAll(team.getPlayers());
        teamRepository.delete(team);
    }

    @Override
    public List<Team> findAll() {
        return teamRepository.findAll();
    }
}
