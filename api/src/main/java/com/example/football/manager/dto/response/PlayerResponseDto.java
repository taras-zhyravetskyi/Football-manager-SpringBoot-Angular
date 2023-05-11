package com.example.football.manager.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class PlayerResponseDto {
    private Long id;
    private String name;
    private BigDecimal age;
    private BigDecimal monthsOfExperience;
    private Long teamId;
    private String teamName;
}
