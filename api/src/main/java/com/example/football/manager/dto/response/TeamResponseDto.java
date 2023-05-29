package com.example.football.manager.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class TeamResponseDto {
    private Long id;
    private String name;
    private String country;
    private String city;
    private BigDecimal commissionRate;
    private BigDecimal accountBalance;
    private List<PlayerResponseDtoName> players;

    public TeamResponseDto() {
        players = new ArrayList<PlayerResponseDtoName>();
    }
}
