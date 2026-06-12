package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="customers")
@Getter
@Setter
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;

    private String name;

    @Column(unique = true)
    private String email;

    private String phoneNumber;

    private String password;
}