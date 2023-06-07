package com.example.football.manager.controller;

import com.example.football.manager.dto.mapper.RequestDtoMapper;
import com.example.football.manager.dto.mapper.ResponseDtoMapper;
import com.example.football.manager.dto.request.TeamRequestDto;
import com.example.football.manager.dto.response.TeamResponseDto;
import com.example.football.manager.model.Team;
import com.example.football.manager.service.TeamService;
import java.util.List;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teams")
@AllArgsConstructor
public class TeamController {
    private final TeamService teamService;
    private final RequestDtoMapper<TeamRequestDto, Team> requestMapper;
    private final ResponseDtoMapper<TeamResponseDto, Team> responseMapper;

    @PostMapping
    public TeamResponseDto save(@Valid @RequestBody TeamRequestDto teamRequestDto) {
        Team team = teamService.save(requestMapper.toModel(teamRequestDto));
        return responseMapper.toDto(team);
    }

    @GetMapping("/{id}")
    public TeamResponseDto findById(@PathVariable Long id) {
        return responseMapper.toDto(teamService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        teamService.delete(id);
    }

    @PutMapping("/{id}")
    public TeamResponseDto update(
            @Valid @RequestBody TeamRequestDto teamRequestDto,
            @PathVariable Long id
    ) {
        Team team = requestMapper.toModel(teamRequestDto);
        team.setId(id);
        return responseMapper.toDto(teamService.save(team));
    }

    @GetMapping
    public List<TeamResponseDto> findAll() {
        return teamService.findAll().stream()
                .map(responseMapper::toDto)
                .toList();
    }
}
