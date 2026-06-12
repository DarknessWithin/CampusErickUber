package com.example.demo.Service;

import com.example.demo.DTO.DriverDashboardDTO;
import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.DriverStatus;
import com.example.demo.Entity.Ride;
import com.example.demo.Entity.RideStatus;
import com.example.demo.Repositories.DriverRepo;
import com.example.demo.Repositories.RatingRepo;
import com.example.demo.Repositories.RideRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepo repo;
    private final RideRepo rideRepo;
    private final RatingRepo ratingRepo;

    public DriverService(DriverRepo repo,RideRepo rideRepo,RatingRepo ratingRepo) {
        this.repo = repo;
        this.rideRepo = rideRepo;
        this.ratingRepo = ratingRepo;
    }

    public ResponseEntity<?> registerDriver(DriverProfile profile) {

        DriverProfile existing =
                repo.findDriverProfileByPhoneNumber(
                        profile.getPhoneNumber());

        if (existing != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Phone number already registered");
        }

        repo.save(profile);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(profile);
    }

    public ResponseEntity<?> loginDriver(DriverProfile profile) {

        DriverProfile driver =
                repo.findDriverProfileByPhoneNumber(
                        profile.getPhoneNumber());

        if (driver == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Driver not found");
        }

        if (!driver.getPassword().equals(profile.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password");
        }

        return ResponseEntity.ok(driver);
    }
    public ResponseEntity<?> goOnline(Long id) {

        DriverProfile driver =
                repo.findById(id).orElse(null);

        if(driver == null)
            return ResponseEntity.notFound().build();

        driver.setStatus(DriverStatus.ONLINE);

        repo.save(driver);

        return ResponseEntity.ok("Online");
    }
    public ResponseEntity<?> goOffline(Long driverId) {

        DriverProfile driver =
                repo.findById(driverId).orElse(null);

        if (driver == null)
            return ResponseEntity.notFound().build();

        driver.setStatus(DriverStatus.OFFLINE);

        repo.save(driver);

        return ResponseEntity.ok("Driver offline");
    }
    public List<DriverProfile> availableDrivers() {

        return repo.findByStatus(
                DriverStatus.ONLINE);
    }
    public ResponseEntity<?> getDashboard(Long driverId) {

        DriverProfile driver =
                repo.findById(driverId).orElse(null);

        if(driver == null) {
            return ResponseEntity.notFound().build();
        }

        DriverDashboardDTO dto =
                new DriverDashboardDTO();

        dto.setDriverId(driverId);

        dto.setTotalRides(
                rideRepo.countByDriver(driver));

        dto.setCompletedRides(
                rideRepo.countByDriverAndStatus(
                        driver,
                        RideStatus.COMPLETED));

        dto.setActiveRides(
                rideRepo.countByDriverAndStatus(
                        driver,
                        RideStatus.IN_PROGRESS));

        dto.setCancelledRides(
                rideRepo.countByDriverAndStatus(
                        driver,
                        RideStatus.CANCELLED));

        Double avg =
                ratingRepo.averageRating(driverId);

        dto.setAverageRating(
                avg == null ? 0.0 : avg);

        return ResponseEntity.ok(dto);
    }
    public List<Ride> rideHistory(Long driverId) {

        return repo.findById(driverId)
                .map(driver -> rideRepo.findByDriver(driver))
                .orElse(List.of());
    }
}