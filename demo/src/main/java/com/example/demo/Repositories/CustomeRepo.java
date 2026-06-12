package com.example.demo.Repositories;

import com.example.demo.Entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomeRepo extends JpaRepository<CustomerProfile, String> {

    CustomerProfile findCustomerProfileByEmail(String email);
}