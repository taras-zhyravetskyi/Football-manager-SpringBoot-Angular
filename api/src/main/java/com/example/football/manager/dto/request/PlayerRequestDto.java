package com.example.football.manager.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PlayerRequestDto {
    @NotBlank
    private String name;
    @Min(value = 15)
    private BigDecimal age;
    @Min(value = 0)
    private BigDecimal monthsOfExperience;
    private Long teamId;
}
