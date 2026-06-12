package com.example.demo.Repositories;

import com.example.demo.Entity.CustomerProfile;
import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.Ride;
import com.example.demo.Entity.RideStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RideRepo extends JpaRepository<Ride, Long> {

    List<Ride> findByStatus(RideStatus status);
    List<Ride> findByDriver(DriverProfile driver);
    List<Ride> findByCustomer(CustomerProfile customer);
    Long countByCustomer(CustomerProfile customer);

    Long countByCustomerAndStatus(
            CustomerProfile customer,
            RideStatus status);
    Ride findFirstByCustomerAndStatusIn(
            CustomerProfile customer,
            List<RideStatus> statuses);
    long countByDriver(DriverProfile driver);

    long countByDriverAndStatus(DriverProfile driver, RideStatus status);

    long countByDriver_Id(Long driverId);

    long countByDriver_IdAndStatus(Long driverId, RideStatus rideStatus);
}