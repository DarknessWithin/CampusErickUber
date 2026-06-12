package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDTO {

    private Long rideId;

    private Integer stars;

    private String feedback;
}
