package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideRequestDTO {

    private String customerId;
    private String pickupLocation;
    private String destination;

}
