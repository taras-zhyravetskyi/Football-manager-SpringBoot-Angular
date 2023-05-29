package com.example.football.manager.controller;

import com.example.football.manager.dto.mapper.RequestDtoMapper;
import com.example.football.manager.dto.mapper.ResponseDtoMapper;
import com.example.football.manager.dto.request.PlayerRequestDto;
import com.example.football.manager.dto.response.PlayerResponseDto;
import com.example.football.manager.model.Player;
import com.example.football.manager.service.PlayerService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/players")
public class PlayerController {
    private final PlayerService playerService;
    private final RequestDtoMapper<PlayerRequestDto, Player> requestMapper;
    private final ResponseDtoMapper<PlayerResponseDto, Player> responseMapper;

    @GetMapping("/transfer/{playerId}/team/{teamToId}")
    public PlayerResponseDto transferPlayer(
            @PathVariable Long playerId,
            @PathVariable Long teamToId
    ) {
        return responseMapper.toDto(
                playerService.transferPlayer(playerId, teamToId));
    }

    @PostMapping
    public PlayerResponseDto save(@Valid @RequestBody PlayerRequestDto playerRequestDto) {
        Player player = playerService.save(requestMapper.toModel(playerRequestDto));
        return responseMapper.toDto(player);
    }

    @GetMapping("/{id}")
    public PlayerResponseDto findById(@PathVariable Long id) {
        return responseMapper.toDto(playerService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        playerService.delete(id);
    }

    @PutMapping("/{id}")
    public PlayerResponseDto update(
            @Valid @RequestBody PlayerRequestDto playerRequestDto,
            @PathVariable Long id
    ) {
        Player player = requestMapper.toModel(playerRequestDto);
        player.setId(id);
        return responseMapper.toDto(playerService.save(player));
    }

    @GetMapping
    public List<PlayerResponseDto> findAll() {
        return playerService.findAll().stream()
                .map(responseMapper::toDto)
                .toList();
    }
}
