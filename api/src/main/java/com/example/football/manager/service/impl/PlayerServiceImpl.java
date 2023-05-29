package com.example.football.manager.service.impl;

import com.example.football.manager.model.Player;
import com.example.football.manager.model.Team;
import com.example.football.manager.repository.PlayerRepository;
import com.example.football.manager.service.PlayerService;
import com.example.football.manager.service.TeamService;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PlayerServiceImpl implements PlayerService {
    private static final BigDecimal TRANSFER_COST_COEFFICIENT = BigDecimal.valueOf(100_000);
    private static final BigDecimal PERCENTAGE_COEFFICIENT = BigDecimal.valueOf(100);
    private final PlayerRepository playerRepository;
    private final TeamService teamService;

    @Override
    public Player findById(Long id) {
        return playerRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Can`t find player by id " + id));
    }

    @Override
    public Player save(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public void delete(Long id) {
        playerRepository.deleteById(id);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    @Override
    public Player transferPlayer(Long playerId, Long teamToId) {
        Team teamTo = teamService.findById(teamToId);
        Player player = findById(playerId);
        Team teamFrom = teamService.findById(player.getTeam().getId());

        BigDecimal transferCost = calculateTransferCost(player);
        BigDecimal commission = calculateCommission(transferCost, teamFrom);
        BigDecimal totalAmount = transferCost.add(commission);

        updateAccountBalances(teamFrom, teamTo, totalAmount);
        Player updatedPlayer = updatePlayerTeam(player, teamTo);

        return updatedPlayer;
    }

    private BigDecimal calculateTransferCost(Player player) {
        return player.getMonthsOfExperience()
                .multiply(TRANSFER_COST_COEFFICIENT)
                .divide(player.getAge(), RoundingMode.HALF_UP);
    }

    private BigDecimal calculateCommission(BigDecimal transferCost, Team teamFrom) {
        return teamFrom.getCommissionRate()
                .multiply(transferCost)
                .divide(PERCENTAGE_COEFFICIENT, RoundingMode.HALF_UP);
    }

    private void updateAccountBalances(Team teamFrom, Team teamTo, BigDecimal totalAmount) {
        if (teamTo.getAccountBalance().compareTo(totalAmount) < 0) {
            throw new RuntimeException(
                    String.format("Team %s has not enough money to provide a transfer",
                            teamTo.getName()));
        }
        teamTo.setAccountBalance(teamTo.getAccountBalance().subtract(totalAmount));
        teamFrom.setAccountBalance(teamFrom.getAccountBalance().add(totalAmount));
        teamService.save(teamTo);
        teamService.save(teamFrom);
    }

    private Player updatePlayerTeam(Player player, Team teamTo) {
        player.setTeam(teamTo);
        return save(player);
    }
}
