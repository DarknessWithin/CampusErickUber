package com.example.demo.Controller;

import com.example.demo.DTO.RatingDTO;
import com.example.demo.DTO.RideRequestDTO;
import com.example.demo.Entity.CustomerProfile;
import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.Ride;
import com.example.demo.Service.CustomerService;
import com.example.demo.Service.DriverService;
import com.example.demo.Service.RatingService;
import com.example.demo.Service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AllOpsController {

    DriverService driverService;
    CustomerService customerService;
    RideService rideService;
    RatingService ratingService;

    public AllOpsController(
            CustomerService customerService,
            DriverService driverService,
            RideService rideService,
            RatingService ratingService) {

        this.customerService = customerService;
        this.driverService = driverService;
        this.rideService = rideService;
        this.ratingService = ratingService;
    }
        @PostMapping("/register/customer")
    public ResponseEntity<?> registerCustomer(
            @RequestBody CustomerProfile profile) {

        return customerService.registerCustomer(profile);
    }

    @PostMapping("/login/customer")
    public ResponseEntity<?> loginCustomer(
            @RequestBody CustomerProfile profile) {

        return customerService.loginCustomer(profile);
    }

    @PostMapping("/register/driver")
    public ResponseEntity<?> registerDriver(
            @RequestBody DriverProfile profile) {

        return driverService.registerDriver(profile);
    }

    @PostMapping("/login/driver")
    public ResponseEntity<?> loginDriver(
            @RequestBody DriverProfile profile) {

        return driverService.loginDriver(profile);
    }

    @PostMapping("/ride/request")
    public ResponseEntity<?> requestRide(
            @RequestBody RideRequestDTO dto) {

        return rideService.requestRide(dto);
    }
    @PostMapping("/ride/{rideId}/accept/{driverId}")
    public ResponseEntity<?> acceptRide(
            @PathVariable Long rideId,
            @PathVariable Long driverId) {

        return rideService.acceptRide(rideId, driverId);
    }
    @GetMapping("/ride/pending")
    public List<Ride> pendingRides() {
        return rideService.getPendingRides();
    }
    @PostMapping("/ride/{rideId}/start")
    public ResponseEntity<?> startRide(
            @PathVariable Long rideId) {

        return rideService.startRide(rideId);
    }
    @PostMapping("/ride/{rideId}/complete")
    public ResponseEntity<?> completeRide(
            @PathVariable Long rideId) {

        return rideService.completeRide(rideId);
    }
    @PostMapping("/ride/{rideId}/cancel")
    public ResponseEntity<?> cancelRide(
            @PathVariable Long rideId) {

        return rideService.cancelRide(rideId);
    }
    @GetMapping("/drivers/available")
    public List<DriverProfile> availableDrivers() {

        return driverService.availableDrivers();
    }
    @PostMapping("/rating/submit")
    public ResponseEntity<?> submitRating(
            @RequestBody RatingDTO dto) {

        return ratingService.submitRating(dto);
    }
    @PutMapping("/driver/{driverId}/online")
    public ResponseEntity<?> goOnline(
            @PathVariable Long driverId) {

        return driverService.goOnline(driverId);
    }
    @PutMapping("/driver/{driverId}/offline")
    public ResponseEntity<?> goOffline(
            @PathVariable Long driverId) {

        return driverService.goOffline(driverId);
    }
    @GetMapping("/driver/{driverId}/dashboard")
    public ResponseEntity<?> dashboard(
            @PathVariable Long driverId) {

        return driverService.getDashboard(driverId);
    }
    @GetMapping("/driver/{driverId}/rides")
    public List<Ride> rideHistory(
            @PathVariable Long driverId) {

        return driverService.rideHistory(driverId);
    }
    @GetMapping("/driver/{driverId}/stats")
    public Map<String, Long> stats(@PathVariable Long driverId) {
        return rideService.getDriverStats(driverId);
    }

    @GetMapping("/customer/{customerId}/rides")
    public List<Ride> customerRideHistory(
            @PathVariable String customerId){

        return rideService.customerRideHistory(customerId);
    }
    @GetMapping("/ride/{rideId}")
    public ResponseEntity<?> getRide(
            @PathVariable Long rideId) {

        return rideService.getRide(rideId);
    }
    @GetMapping("/customer/{customerId}/dashboard")
    public ResponseEntity<?> customerDashboard(
            @PathVariable String customerId) {

        return customerService.getDashboard(customerId);
    }
    @GetMapping("/customer/{customerId}/active-ride")
    public ResponseEntity<?> activeRide(
            @PathVariable String customerId) {

        return customerService.activeRide(customerId);
    }

}