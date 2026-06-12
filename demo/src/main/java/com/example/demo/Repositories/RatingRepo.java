package com.example.demo.Repositories;

import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.Rating;
import com.example.demo.Entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RatingRepo extends JpaRepository<Rating,Long> {

    List<Rating> findByDriver(DriverProfile driver);
    @Query("SELECT AVG(r.stars) FROM Rating r WHERE r.driver.id = ?1")
    Double averageRating(Long driverId);
    Rating findByRide(Ride ride);
}
