# RideFlow 🚖

RideFlow is a full-stack ride booking platform inspired by applications like Uber and Ola. It provides separate portals for Customers and Drivers, real-time ride updates using WebSockets, ride management, driver analytics, and ride ratings.

---

# Features

## Customer Features

- Customer Registration
- Customer Login
- Request a Ride
- View Ride History
- Track Latest Ride Status
- Real-time Ride Updates
- Rate Completed Rides
- Dashboard Analytics
  - Total Rides
  - Completed Rides
  - Active Rides
  - Cancelled Rides
- Secure Logout

---

## Driver Features

- Driver Registration
- Driver Login
- Go Online / Offline
- Accept Pending Ride Requests
- Start Ride
- Complete Ride
- Cancel Ride
- View Assigned Rides
- Real-time Ride Updates
- Driver Dashboard Analytics
  - Total Rides
  - Completed Rides
  - Active Rides
  - Average Rating
- Automatic Offline Status on Logout

---

## Real-Time Functionality

RideFlow uses WebSockets (STOMP + SockJS) for live updates.

Updates include:

- New ride requests
- Ride acceptance
- Ride start
- Ride completion
- Ride cancellation
- Dashboard refreshes

---

# Tech Stack

## Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Spring WebSocket
- Hibernate
- MySQL

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- STOMP.js
- SockJS

## Database

- MySQL

---

# Project Structure

```text
RideFlow
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── websocket
│   └── security
│
├── frontend
│   ├── pages
│   │   ├── customer
│   │   └── driver
│   │
│   ├── components
│   ├── layouts
│   ├── services
│   └── api
│
└── database
```

---

# Database Entities

## Customer

```java
Customer
{
    Long userId;
    String name;
    String email;
    String phoneNumber;
    String password;
}
```

## Driver

```java
Driver
{
    Long id;
    String name;
    String phoneNumber;
    String password;
    String vehicleNumber;
    String vehicleType;
    DriverStatus status;
}
```

## Ride

```java
Ride
{
    Long rideId;
    Customer customer;
    Driver driver;
    String pickupLocation;
    String destination;
    RideStatus status;
    LocalDateTime createdAt;
}
```

## Rating

```java
Rating
{
    Long id;
    Ride ride;
    Driver driver;
    Integer stars;
    String feedback;
}
```

---

# Ride Lifecycle

```text
REQUESTED
     ↓
ACCEPTED
     ↓
IN_PROGRESS
     ↓
COMPLETED
```

or

```text
REQUESTED
     ↓
ACCEPTED
     ↓
CANCELLED
```

or

```text
REQUESTED
     ↓
CANCELLED
```

---

# REST APIs

## Authentication

### Customer Registration

```http
POST /register/customer
```

### Customer Login

```http
POST /login/customer
```

### Driver Registration

```http
POST /register/driver
```

### Driver Login

```http
POST /login/driver
```

---

## Ride APIs

### Request Ride

```http
POST /ride/request
```

### Accept Ride

```http
POST /ride/{rideId}/accept/{driverId}
```

### Start Ride

```http
POST /ride/{rideId}/start
```

### Complete Ride

```http
POST /ride/{rideId}/complete
```

### Cancel Ride

```http
POST /ride/{rideId}/cancel
```

### Get Pending Rides

```http
GET /ride/pending
```

---

## Dashboard APIs

### Customer Dashboard

```http
GET /customer/{id}/dashboard
```

### Driver Dashboard

```http
GET /driver/{id}/dashboard
```

---

## Rating APIs

### Submit Rating

```http
POST /rating/submit
```

---

# Installation

## Backend

Clone repository:

```bash
git clone <repository-url>
```

Navigate to backend:

```bash
cd backend
```

Configure MySQL in:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rideflow
spring.datasource.username=root
spring.datasource.password=password
```

Run application:

```bash
./mvnw spring-boot:run
```

Backend starts on:

```text
http://localhost:8080
```

---

## Frontend

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm run dev
```

Frontend starts on:

```text
http://localhost:5173
```

---

# WebSocket Endpoint

```text
ws://localhost:8080/ws
```

Topics:

```text
/topic/rides
/topic/pending-rides
```

---

# Screens

### Landing Page

- Customer Portal
- Driver Portal

### Customer Dashboard

- Ride Analytics
- Latest Ride Tracking
- Request Ride
- My Rides

### Driver Dashboard

- Driver Analytics
- Online/Offline Status
- Pending Rides
- My Rides

### Ride Rating Page

- Star Rating
- Feedback Submission

---

# Future Improvements

- JWT Authentication
- Role-Based Security
- Google Maps Integration
- Live Driver Location Tracking
- Fare Calculation
- Driver Earnings Dashboard
- Customer Profile Management
- Driver Profile Management
- Ride Search and Filters
- Push Notifications
- Admin Panel
- Deployment to Cloud

---

# Learning Outcomes

This project demonstrates:

- Spring Boot REST API Development
- React Frontend Development
- MySQL Database Design
- JPA/Hibernate Relationships
- WebSocket Communication
- Real-Time Systems
- State Management
- Full Stack Integration
- Client-Server Architecture

---

# Author

Tanishq Sharma

Built as a Full Stack Java + React college project demonstrating real-time ride booking and management functionality.
