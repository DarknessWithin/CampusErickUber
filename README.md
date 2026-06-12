<div align="center">

# 🚖 RideFlow

### A Full-Stack Real-Time Ride Booking Platform

*Inspired by Uber & Ola — Built for learning, designed for scale.*

![Java](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Entities](#-database-entities)
- [Ride Lifecycle](#-ride-lifecycle)
- [REST APIs](#-rest-apis)
- [WebSocket](#-websocket)
- [Installation](#-installation)
- [Screens](#-screens)
- [Future Improvements](#-future-improvements)
- [Authors](#-authors)

---

## 🌟 Overview

**RideFlow** is a full-stack ride booking platform with separate portals for **Customers** and **Drivers**. It features real-time ride updates powered by WebSockets, comprehensive ride management, driver analytics, and a rating system — all built as a college project to demonstrate full-stack Java + React development.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👤 Customer Portal

- ✅ Customer Registration & Login
- ✅ Request a Ride
- ✅ View Ride History
- ✅ Track Latest Ride Status
- ✅ Real-time Ride Updates
- ✅ Rate Completed Rides
- ✅ Secure Logout

**Dashboard Analytics:**
- 📊 Total Rides
- ✔️ Completed Rides
- 🔄 Active Rides
- ❌ Cancelled Rides

</td>
<td width="50%">

### 🚗 Driver Portal

- ✅ Driver Registration & Login
- ✅ Go Online / Offline
- ✅ Accept Pending Ride Requests
- ✅ Start / Complete / Cancel Ride
- ✅ View Assigned Rides
- ✅ Real-time Ride Updates
- ✅ Automatic Offline on Logout

**Dashboard Analytics:**
- 📊 Total Rides
- ✔️ Completed Rides
- 🔄 Active Rides
- ⭐ Average Rating

</td>
</tr>
</table>

### ⚡ Real-Time Functionality

RideFlow uses **WebSockets (STOMP + SockJS)** for live updates across the platform:

| Event | Description |
|---|---|
| 🆕 New Ride Request | Broadcast to all online drivers |
| ✔️ Ride Accepted | Customer notified immediately |
| 🚀 Ride Started | Status update pushed live |
| 🏁 Ride Completed | Triggers rating prompt |
| ❌ Ride Cancelled | Both parties notified |
| 📊 Dashboard Refresh | Live stats update |

---

## 🛠 Tech Stack

<table>
<tr>
<th>Layer</th>
<th>Technology</th>
</tr>
<tr>
<td><b>Backend Language</b></td>
<td>Java 17</td>
</tr>
<tr>
<td><b>Backend Framework</b></td>
<td>Spring Boot</td>
</tr>
<tr>
<td><b>Security</b></td>
<td>Spring Security</td>
</tr>
<tr>
<td><b>Real-Time</b></td>
<td>Spring WebSocket (STOMP + SockJS)</td>
</tr>
<tr>
<td><b>ORM</b></td>
<td>Spring Data JPA + Hibernate</td>
</tr>
<tr>
<td><b>Database</b></td>
<td>MySQL</td>
</tr>
<tr>
<td><b>Frontend Framework</b></td>
<td>React</td>
</tr>
<tr>
<td><b>Routing</b></td>
<td>React Router</td>
</tr>
<tr>
<td><b>HTTP Client</b></td>
<td>Axios</td>
</tr>
<tr>
<td><b>Styling</b></td>
<td>Tailwind CSS</td>
</tr>
<tr>
<td><b>WebSocket Client</b></td>
<td>STOMP.js + SockJS</td>
</tr>
</table>

---

## 📁 Project Structure

```
RideFlow/
│
├── 📂 backend/
│   ├── controller/       # REST API Controllers
│   ├── service/          # Business Logic
│   ├── repository/       # JPA Repositories
│   ├── model/            # Entity Classes
│   ├── dto/              # Data Transfer Objects
│   ├── websocket/        # WebSocket Configuration
│   └── security/         # Spring Security Setup
│
├── 📂 frontend/
│   ├── pages/
│   │   ├── customer/     # Customer Portal Pages
│   │   └── driver/       # Driver Portal Pages
│   ├── components/       # Reusable UI Components
│   ├── layouts/          # Page Layout Wrappers
│   ├── services/         # Business Logic Services
│   └── api/              # Axios API Calls
│
└── 📂 database/          # SQL Scripts & Schema
```

---

## 🗄 Database Entities

<details>
<summary><b>Customer</b></summary>

```java
Customer {
    Long   userId;
    String name;
    String email;
    String phoneNumber;
    String password;
}
```
</details>

<details>
<summary><b>Driver</b></summary>

```java
Driver {
    Long         id;
    String       name;
    String       phoneNumber;
    String       password;
    String       vehicleNumber;
    String       vehicleType;
    DriverStatus status;
}
```
</details>

<details>
<summary><b>Ride</b></summary>

```java
Ride {
    Long          rideId;
    Customer      customer;
    Driver        driver;
    String        pickupLocation;
    String        destination;
    RideStatus    status;
    LocalDateTime createdAt;
}
```
</details>

<details>
<summary><b>Rating</b></summary>

```java
Rating {
    Long    id;
    Ride    ride;
    Driver  driver;
    Integer stars;
    String  feedback;
}
```
</details>

---

## 🔄 Ride Lifecycle

```
  REQUESTED ──────────────────────────────┐
      │                                   │
      ▼                                   ▼
  ACCEPTED                           CANCELLED
      │                                   ▲
      ▼                                   │
 IN_PROGRESS ────────────────────────────┘
      │
      ▼
  COMPLETED
```

| Status | Description |
|---|---|
| `REQUESTED` | Customer books a ride, awaiting driver |
| `ACCEPTED` | A driver has accepted the ride |
| `IN_PROGRESS` | Ride is currently active |
| `COMPLETED` | Ride finished successfully |
| `CANCELLED` | Ride was cancelled at any stage |

---

## 🔌 REST APIs

### 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register/customer` | Register a new customer |
| `POST` | `/login/customer` | Customer login |
| `POST` | `/register/driver` | Register a new driver |
| `POST` | `/login/driver` | Driver login |

### 🚗 Ride Management

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ride/request` | Customer requests a ride |
| `POST` | `/ride/{rideId}/accept/{driverId}` | Driver accepts a ride |
| `POST` | `/ride/{rideId}/start` | Driver starts the ride |
| `POST` | `/ride/{rideId}/complete` | Driver completes the ride |
| `POST` | `/ride/{rideId}/cancel` | Cancel a ride |
| `GET` | `/ride/pending` | Fetch all pending rides |

### 📊 Dashboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/customer/{id}/dashboard` | Customer analytics |
| `GET` | `/driver/{id}/dashboard` | Driver analytics |

### ⭐ Ratings

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/rating/submit` | Submit a ride rating |

---

## 🌐 WebSocket

**Endpoint:**
```
ws://localhost:8080/ws
```

**Topics:**

| Topic | Purpose |
|---|---|
| `/topic/rides` | General ride status updates |
| `/topic/pending-rides` | New pending ride broadcasts to drivers |

---

## 🚀 Installation

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

---

### Backend Setup

**1. Clone the repository:**
```bash
git clone <repository-url>
cd backend
```

**2. Configure MySQL in `application.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rideflow
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

**3. Run the application:**
```bash
./mvnw spring-boot:run
```

> Backend starts at **http://localhost:8080**

---

### Frontend Setup

**1. Navigate to frontend:**
```bash
cd frontend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the dev server:**
```bash
npm run dev
```

> Frontend starts at **http://localhost:5173**

---

## 🖥 Screens

| Screen | Description |
|---|---|
| **Landing Page** | Choose Customer or Driver portal |
| **Customer Dashboard** | Analytics, ride tracking, request & history |
| **Driver Dashboard** | Stats, online toggle, pending & assigned rides |
| **Ride Rating Page** | Star rating and feedback submission |

---

## 🔮 Future Improvements

- [ ] JWT Authentication & Role-Based Security
- [ ] Google Maps Integration
- [ ] Live Driver Location Tracking
- [ ] Fare Calculation Engine
- [ ] Driver Earnings Dashboard
- [ ] Customer & Driver Profile Management
- [ ] Ride Search and Filters
- [ ] Push Notifications
- [ ] Admin Panel
- [ ] Cloud Deployment

---

## 📚 Learning Outcomes

This project demonstrates:

> Spring Boot REST API · React Frontend · MySQL Design · JPA/Hibernate Relationships · WebSocket Communication · Real-Time Systems · State Management · Full Stack Integration · Client-Server Architecture

---

## 👨‍💻 Authors

<table>
<tr>
<td align="center">
<b>Tanishq Sharma</b>
</td>
<td align="center">
<b>Anuj Singh</b>
</td>
</tr>
</table>

*Built as a Full Stack Java + React college project demonstrating real-time ride booking and management functionality.*

---

<div align="center">

Made with ❤️ using Spring Boot & React

</div>
