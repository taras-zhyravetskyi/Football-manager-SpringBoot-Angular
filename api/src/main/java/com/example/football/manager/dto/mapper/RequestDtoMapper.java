package com.example.football.manager.dto.mapper;

public interface RequestDtoMapper<D, M> {
    M toModel(D dto);
}
