package com.example.football.manager.dto.mapper.impl;

import com.example.football.manager.dto.mapper.RequestDtoMapper;
import com.example.football.manager.dto.mapper.ResponseDtoMapper;
import com.example.football.manager.dto.request.TeamRequestDto;
import com.example.football.manager.dto.response.PlayerResponseDtoName;
import com.example.football.manager.dto.response.TeamResponseDto;
import com.example.football.manager.model.Team;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TeamMapper implements
        RequestDtoMapper<TeamRequestDto, Team>,
        ResponseDtoMapper<TeamResponseDto, Team> {

    @Override
    public Team toModel(TeamRequestDto dto) {
        Team team = new Team();
        team.setName(dto.getName());
        team.setCountry(dto.getCountry());
        team.setCity(dto.getCity());
        team.setCommissionRate(dto.getCommissionRate());
        team.setAccountBalance(dto.getAccountBalance());
        return team;
    }

    @Override
    public TeamResponseDto toDto(Team model) {
        TeamResponseDto dto = new TeamResponseDto();
        dto.setId(model.getId());
        dto.setName(model.getName());
        dto.setCountry(model.getCountry());
        dto.setCity(model.getCity());
        dto.setAccountBalance(model.getAccountBalance());
        dto.setCommissionRate(model.getCommissionRate());
        /*dto.setPlayerIds(model.getPlayers().stream()
                .map(Player::getId)
                .toList());
        dto.setPlayerNames(model.getPlayers().stream()
                .map(Player::getName)
                .toList());*/
        if (model.getPlayers() != null) {
            model.getPlayers().stream()
                    .forEach(p -> {
                        PlayerResponseDtoName playerDto = new PlayerResponseDtoName();
                        playerDto.setId(p.getId());
                        playerDto.setName(p.getName());
                        dto.getPlayers().add(playerDto);
                    });
        }
        return dto;
    }
}
