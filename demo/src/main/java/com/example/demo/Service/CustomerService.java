package com.example.demo.Service;

import com.example.demo.DTO.CustomerDashboardDTO;
import com.example.demo.DTO.RideRequestDTO;
import com.example.demo.Entity.CustomerProfile;
import com.example.demo.Entity.Ride;
import com.example.demo.Entity.RideStatus;
import com.example.demo.Repositories.CustomeRepo;
import com.example.demo.Repositories.RideRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CustomerService {

    private final CustomeRepo repo;
    private final RideRepo rideRepo;
    public CustomerService(CustomeRepo repo,RideRepo rideRepo) {
        this.repo = repo; this.rideRepo = rideRepo;
    }

    public ResponseEntity<?> registerCustomer(CustomerProfile profile) {

        CustomerProfile existing =
                repo.findCustomerProfileByEmail(profile.getEmail());

        if (existing != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        repo.save(profile);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(profile);
    }
    public ResponseEntity<?> loginCustomer(CustomerProfile profile){

        CustomerProfile customer =
                repo.findCustomerProfileByEmail(profile.getEmail());

        if(customer == null){
            return ResponseEntity.status(404).body("User not found");
        }

        if(!customer.getPassword().equals(profile.getPassword())){
            return ResponseEntity.status(401).body("Invalid password");
        }

        return ResponseEntity.ok(customer);
    }
    public List<Ride> rideHistory(String customerId) {

        return repo.findById(customerId)
                .map(rideRepo::findByCustomer)
                .orElse(List.of());
    }
    public ResponseEntity<?> getDashboard(
            String customerId) {

        CustomerProfile customer =
                repo.findById(customerId)
                        .orElse(null);

        if(customer == null){
            return ResponseEntity.notFound().build();
        }

        CustomerDashboardDTO dto =
                new CustomerDashboardDTO();

        dto.setCustomerId(customerId);

        dto.setTotalRides(
                rideRepo.countByCustomer(customer));

        dto.setCompletedRides(
                rideRepo.countByCustomerAndStatus(
                        customer,
                        RideStatus.COMPLETED));

        dto.setCancelledRides(
                rideRepo.countByCustomerAndStatus(
                        customer,
                        RideStatus.CANCELLED));

        long active =
                rideRepo.countByCustomerAndStatus(
                        customer,
                        RideStatus.REQUESTED)
                        +
                        rideRepo.countByCustomerAndStatus(
                                customer,
                                RideStatus.ACCEPTED)
                        +
                        rideRepo.countByCustomerAndStatus(
                                customer,
                                RideStatus.IN_PROGRESS);

        dto.setActiveRides(active);

        return ResponseEntity.ok(dto);
    }
    public ResponseEntity<?> activeRide(
            String customerId) {

        CustomerProfile customer =
                repo.findById(customerId)
                        .orElse(null);

        if(customer == null){
            return ResponseEntity.notFound().build();
        }

        Ride ride =
                rideRepo.findFirstByCustomerAndStatusIn(
                        customer,
                        List.of(
                                RideStatus.REQUESTED,
                                RideStatus.ACCEPTED,
                                RideStatus.IN_PROGRESS
                        ));

        if(ride == null){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(ride);
    }
}