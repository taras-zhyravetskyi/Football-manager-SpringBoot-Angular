package com.example.football.manager.dto.mapper;

public interface ResponseDtoMapper<D, M> {
    D toDto(M model);
}
