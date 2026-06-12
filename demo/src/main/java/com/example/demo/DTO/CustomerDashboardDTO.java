package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDashboardDTO {

    private String customerId;

    private Long totalRides;

    private Long completedRides;

    private Long cancelledRides;

    private Long activeRides;
}