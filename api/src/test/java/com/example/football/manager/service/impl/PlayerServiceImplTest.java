package com.example.football.manager.service.impl;

import com.example.football.manager.model.Player;
import com.example.football.manager.model.Team;
import com.example.football.manager.repository.PlayerRepository;
import com.example.football.manager.service.PlayerService;
import com.example.football.manager.service.TeamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlayerServiceImplTest {

    @InjectMocks
    PlayerServiceImpl playerService;

    @Mock
    PlayerRepository playerRepository;

    @Mock
    TeamService teamService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindById() {
        Long id = 1L;
        Player player = new Player();
        player.setId(id);
        when(playerRepository.findById(id)).thenReturn(Optional.of(player));

        Player found = playerService.findById(id);

        assertEquals(player, found);
        verify(playerRepository, times(1)).findById(id);
    }

    @Test
    public void testSave() {
        Player player = new Player();
        when(playerRepository.save(player)).thenReturn(player);

        Player saved = playerService.save(player);

        assertEquals(player, saved);
        verify(playerRepository, times(1)).save(player);
    }

    /*@Test
    public void testTransferPlayer_Ok() {
        Long playerId = 1L, teamToId = 2L, teamFromId = 3L;
        Player player = new Player();
        player.setId(playerId);
        Team teamTo = new Team();
        teamTo.setId(teamToId);
        teamTo.setAccountBalance(BigDecimal.valueOf(200000));
        Team teamFrom = new Team();
        teamFrom.setId(teamFromId);
        teamFrom.setAccountBalance(BigDecimal.valueOf(100000));
        player.setTeam(teamFrom);

        when(playerRepository.findById(playerId)).thenReturn(Optional.of(player));
        when(teamService.findById(teamToId)).thenReturn(teamTo);
        when(teamService.findById(teamFromId)).thenReturn(teamFrom);
        when(playerRepository.save(any(Player.class))).thenAnswer(i -> i.getArgument(0));
        when(teamService.save(any(Team.class))).thenAnswer(i -> i.getArgument(0));

        Player transferredPlayer = playerService.transferPlayer(playerId, teamToId);

        assertEquals(teamTo, transferredPlayer.getTeam());
        assertTrue(teamFrom.getAccountBalance().compareTo(BigDecimal.valueOf(300000)) == 0);
        assertTrue(teamTo.getAccountBalance().compareTo(BigDecimal.valueOf(100000)) == 0);
    }

    @Test
    public void testTransferPlayerNotEnoughBalance_NotOk() {
        Long playerId = 1L, teamToId = 2L, teamFromId = 3L;
        Player player = new Player();
        player.setId(playerId);
        Team teamTo = new Team();
        teamTo.setId(teamToId);
        teamTo.setAccountBalance(BigDecimal.valueOf(100000));
        Team teamFrom = new Team();
        teamFrom.setId(teamFromId);
        teamFrom.setAccountBalance(BigDecimal.valueOf(100000));
        player.setTeam(teamFrom);

        when(playerRepository.findById(playerId)).thenReturn(Optional.of(player));
        when(teamService.findById(teamToId)).thenReturn(teamTo);
        when(teamService.findById(teamFromId)).thenReturn(teamFrom);

        assertThrows(RuntimeException.class, () -> playerService.transferPlayer(playerId, teamToId));
    }*/

    @Test
    public void testTransferPlayerPlayerNotFound_NotOk() {
        Long playerId = 1L, teamToId = 2L;
        when(playerRepository.findById(playerId)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> playerService.transferPlayer(playerId, teamToId));
    }
}
