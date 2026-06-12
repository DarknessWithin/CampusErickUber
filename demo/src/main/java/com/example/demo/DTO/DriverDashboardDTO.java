package com.example.demo.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverDashboardDTO {

    private Long driverId;

    private Long totalRides;
    private Long completedRides;
    private Long activeRides;
    private Long cancelledRides;

    private Double averageRating;
}