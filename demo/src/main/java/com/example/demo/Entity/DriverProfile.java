package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="drivers")
@Getter
@Setter
public class DriverProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String phoneNumber;

    private String password;

    private String vehicleNumber;

    private String vehicleType;

    private boolean verified;

    @Enumerated(EnumType.STRING)
    private DriverStatus status;
}