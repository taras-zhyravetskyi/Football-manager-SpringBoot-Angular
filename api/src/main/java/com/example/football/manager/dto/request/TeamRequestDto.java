package com.example.football.manager.dto.request;

import java.math.BigDecimal;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class TeamRequestDto {
    @NotBlank
    @Size(min = 2)
    private String name;
    @NotBlank
    @Size(min = 2)
    private String country;
    @NotBlank
    private String city;
    @NotNull
    @Max(100)
    @Min(0)
    private BigDecimal commissionRate;
    @NotNull
    @Min(0)
    private BigDecimal accountBalance;
}
