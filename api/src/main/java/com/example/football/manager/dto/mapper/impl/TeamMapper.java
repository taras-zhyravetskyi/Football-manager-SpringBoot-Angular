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
    public TeamResponseDto toDto(Team team) {
        TeamResponseDto dto = new TeamResponseDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setCountry(team.getCountry());
        dto.setCity(team.getCity());
        dto.setAccountBalance(team.getAccountBalance());
        dto.setCommissionRate(team.getCommissionRate());
        if (team.getPlayers() != null) {
            team.getPlayers().stream()
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
