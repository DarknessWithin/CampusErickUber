package com.example.demo.Service;

import com.example.demo.DTO.RideRequestDTO;
import com.example.demo.DTO.RideUpdateDTO;
import com.example.demo.Entity.*;
import com.example.demo.Repositories.CustomeRepo;
import com.example.demo.Repositories.DriverRepo;
import com.example.demo.Repositories.RideRepo;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RideService {

    private final RideRepo rideRepo;
    private final DriverRepo driverRepo;
    private final CustomeRepo customerRepo;
    private final SimpMessagingTemplate messagingTemplate;
    public RideService(
            RideRepo rideRepo,
            DriverRepo driverRepo,
            CustomeRepo customerRepo,
            SimpMessagingTemplate messagingTemplate) {

        this.rideRepo = rideRepo;
        this.driverRepo = driverRepo;
        this.customerRepo = customerRepo;
        this.messagingTemplate = messagingTemplate;
    }
    public ResponseEntity<?> requestRide(RideRequestDTO dto) {

        CustomerProfile customer =
                customerRepo.findById(dto.getCustomerId())
                        .orElse(null);

        if(customer == null){
            return ResponseEntity.notFound().build();
        }

        Ride ride = new Ride();

        ride.setCustomer(customer);
        ride.setPickupLocation(dto.getPickupLocation());
        ride.setDestination(dto.getDestination());
        ride.setStatus(RideStatus.REQUESTED);
        ride.setCreatedAt(LocalDateTime.now());

        rideRepo.save(ride);
        messagingTemplate.convertAndSend(
                "/topic/rides",
                new RideUpdateDTO(
                        ride.getRideId(),
                        "New Ride Requested",
                        ride.getStatus().name()
                )
        );
        return ResponseEntity.ok(ride);
    }
    @Transactional
    public ResponseEntity<?> acceptRide(Long rideId, Long driverId) {

        Ride ride = rideRepo.findById(rideId)
                .orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }
        if (ride.getStatus() != RideStatus.REQUESTED) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Ride already accepted");
        }

        DriverProfile driver = driverRepo.findById(driverId)
                .orElse(null);
        driver.setStatus(DriverStatus.BUSY);
        driverRepo.save(driver);
        ride.setDriver(driver);
        ride.setStatus(RideStatus.ACCEPTED);

        rideRepo.saveAndFlush(ride);
        TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronization() {

                    @Override
                    public void afterCommit() {

                        messagingTemplate.convertAndSend(
                                "/topic/rides",
                                new RideUpdateDTO(
                                        ride.getRideId(),
                                        "Ride Accepted",
                                        ride.getStatus().name()
                                )
                        );

                        messagingTemplate.convertAndSend(
                                "/topic/pending-rides",
                                "refresh"
                        );
                    }
                }
        );

        return ResponseEntity.ok(ride);
    }
    public List<Ride> getPendingRides() {
        return rideRepo.findByStatus(RideStatus.REQUESTED);
    }
    public ResponseEntity<?> startRide(Long rideId) {

        Ride ride = rideRepo.findById(rideId).orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }

        if (ride.getStatus() != RideStatus.ACCEPTED) {
            return ResponseEntity.badRequest()
                    .body("Ride must be ACCEPTED first");
        }

        ride.setStatus(RideStatus.IN_PROGRESS);

        rideRepo.save(ride);
        messagingTemplate.convertAndSend(
                "/topic/rides",
                new RideUpdateDTO(
                        ride.getRideId(),
                        "Ride Started",
                        ride.getStatus().name()
                )
        );
        return ResponseEntity.ok("Ride started");
    }
    public List<Ride> customerRideHistory(String customerId){

        CustomerProfile customer =
                customerRepo.findById(customerId)
                        .orElse(null);

        if(customer == null){
            return List.of();
        }

        return rideRepo.findByCustomer(customer);
    }
    public ResponseEntity<?> completeRide(Long rideId) {

        Ride ride = rideRepo.findById(rideId).orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }

        if (ride.getStatus() != RideStatus.IN_PROGRESS) {
            return ResponseEntity.badRequest()
                    .body("Ride is not in progress");
        }

        ride.setStatus(RideStatus.COMPLETED);

        DriverProfile driver = ride.getDriver();

        if (driver != null) {
            driver.setStatus(DriverStatus.ONLINE);
            driverRepo.save(driver);
        }

        rideRepo.save(ride);
        messagingTemplate.convertAndSend(
                "/topic/rides",
                new RideUpdateDTO(
                        ride.getRideId(),
                        "Ride Completed",
                        ride.getStatus().name()
                )
        );
        return ResponseEntity.ok("Ride completed");
    }
    public ResponseEntity<?> cancelRide(Long rideId) {

        Ride ride = rideRepo.findById(rideId).orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }

        if (ride.getStatus() == RideStatus.COMPLETED) {
            return ResponseEntity.badRequest()
                    .body("Completed ride cannot be cancelled");
        }

        if (ride.getStatus() == RideStatus.CANCELLED) {
            return ResponseEntity.badRequest()
                    .body("Ride already cancelled");
        }

        DriverProfile driver = ride.getDriver();

        if (driver != null) {
            driver.setStatus(DriverStatus.ONLINE);
            driverRepo.save(driver);
        }

        ride.setStatus(RideStatus.CANCELLED);

        rideRepo.save(ride);
        messagingTemplate.convertAndSend(
                "/topic/rides",
                new RideUpdateDTO(
                        ride.getRideId(),
                        "Ride Cancelled",
                        ride.getStatus().name()
                )
        );
        return ResponseEntity.ok("Ride cancelled");
    }
    public Map<String, Long> getDriverStats(Long driverId) {

        long total = rideRepo.countByDriver_Id(driverId);
        long active = rideRepo.countByDriver_IdAndStatus(driverId, RideStatus.IN_PROGRESS);

        Map<String, Long> map = new HashMap<>();
        map.put("totalRides", total);
        map.put("activeRides", active);

        return map;
    }
    public ResponseEntity<?> getRide(Long rideId) {

        Ride ride =
                rideRepo.findById(rideId)
                        .orElse(null);

        if (ride == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ride);
    }

}