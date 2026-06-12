package com.example.demo.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RideUpdateDTO {

    private Long rideId;

    private String message;

    private String status;
}