package com.example.demo.Service;

import com.example.demo.DTO.RatingDTO;
import com.example.demo.DTO.RideUpdateDTO;
import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.Rating;
import com.example.demo.Entity.Ride;
import com.example.demo.Entity.RideStatus;
import com.example.demo.Repositories.RatingRepo;
import com.example.demo.Repositories.RideRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepo ratingRepo;
    private final RideRepo rideRepo;
    private final SimpMessagingTemplate messagingTemplate;
    public RatingService(
            RatingRepo ratingRepo,
            RideRepo rideRepo,
            SimpMessagingTemplate messagingTemplate) {

        this.ratingRepo = ratingRepo;
        this.rideRepo = rideRepo;
        this.messagingTemplate = messagingTemplate;
    }
    public ResponseEntity<?> submitRating(
            RatingDTO dto) {

        Ride ride =
                rideRepo.findById(dto.getRideId())
                        .orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }

        if (ride.getStatus() != RideStatus.COMPLETED) {
            return ResponseEntity.badRequest()
                    .body("Ride not completed");
        }

        Rating rating = new Rating();

        rating.setRide(ride);

        rating.setDriver(
                ride.getDriver());

        rating.setStars(
                dto.getStars());

        rating.setFeedback(
                dto.getFeedback());
        if(ratingRepo.findByRide(ride) != null){
            return ResponseEntity.badRequest()
                    .body("Ride already rated");
        }
        ratingRepo.save(rating);
        messagingTemplate.convertAndSend(
                "/topic/rides",
                new RideUpdateDTO(
                        ride.getRideId(),
                        "Rating Submitted",
                        "RATED"
                )
        );
        return ResponseEntity.ok(
                "Rating submitted");
    }
    public Double getAverageRating(
            DriverProfile driver) {

        List<Rating> ratings =
                ratingRepo.findByDriver(driver);

        if(ratings.isEmpty())
            return 0.0;

        double sum = 0;

        for(Rating r : ratings){
            sum += r.getStars();
        }

        return sum / ratings.size();
    }
}