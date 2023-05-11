package com.example.football.manager.dto.mapper.impl;

import com.example.football.manager.dto.mapper.RequestDtoMapper;
import com.example.football.manager.dto.mapper.ResponseDtoMapper;
import com.example.football.manager.dto.request.PlayerRequestDto;
import com.example.football.manager.dto.response.PlayerResponseDto;
import com.example.football.manager.model.Player;
import com.example.football.manager.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PlayerMapper implements
        RequestDtoMapper<PlayerRequestDto, Player>,
        ResponseDtoMapper<PlayerResponseDto, Player> {
    private final TeamService teamService;

    @Override
    public Player toModel(PlayerRequestDto dto) {
        Player player = new Player();
        player.setAge(dto.getAge());
        player.setName(dto.getName());
        player.setMonthsOfExperience(dto.getMonthsOfExperience());
        player.setTeam(teamService.findById(dto.getTeamId()));
        return player;
    }

    @Override
    public PlayerResponseDto toDto(Player model) {
        PlayerResponseDto dto = new PlayerResponseDto();
        dto.setId(model.getId());
        dto.setAge(model.getAge());
        dto.setName(model.getName());
        dto.setMonthsOfExperience(model.getMonthsOfExperience());
        dto.setTeamId(
                model.getTeam() == null ? null : model.getTeam().getId());
        dto.setTeamName(
                model.getTeam() == null ? null : model.getTeam().getName()
        );
        return dto;
    }
}
