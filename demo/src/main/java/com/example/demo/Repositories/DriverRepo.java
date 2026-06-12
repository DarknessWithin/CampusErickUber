package com.example.demo.Repositories;

import com.example.demo.Entity.DriverProfile;
import com.example.demo.Entity.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriverRepo extends JpaRepository<DriverProfile, Long> {

   DriverProfile findDriverProfileByPhoneNumber(String phoneNumber);
   List<DriverProfile> findByStatus(
           DriverStatus status);
}