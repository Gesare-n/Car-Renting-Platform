# Car Renting Platform 


## Introduction

The Car Renting Platform is designed to provide users with a seamless experience for renting cars. Users can browse available cars, make bookings, leave reviews, receive notifications, and manage their profiles. The platform utilizes a Flask API backend and a React frontend to ensure a robust and interactive user experience.

## Table of Contents

- [Database Relationships](#database-relationships)
- [CRUD Operations](#crud-operations)
- [JWT Authentication](#jwt-authentication)
- [Validation](#validation)
- [Admin Roles](#admin-roles)
- [User Profiles](#user-profiles)
- [Forms with Validation](#forms-with-validation)
- [Client-Side Routing](#client-side-routing)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Database Relationships

- **One-to-Many**: Users can have multiple car hires. Each car hire is associated with one user.
- **Many-to-Many**: Car hires can have multiple features.

## CRUD Operations

### Users

- Registration
- Login
- Logout
- Password Reset

### Car Hires

- Create
- Read
- Update
- Delete
## JWT Authentication

- Secure authentication and authorization using JSON Web Tokens (JWT).
- JWT implementation for user registration, login, logout, and password reset functionalities.

## Validation

- Ensure unique email addresses and usernames during user registration.
- Ensure unique titles or identifiers for each car hire to avoid conflicts.

## Admin Roles

- Define roles such as admin with permissions to manage car hires, user accounts.

## User Profiles

- Allow users to create and update their profiles, including profile images if desired.

## Forms with Validation

- Implement forms with client-side validation for:
  - Car hire booking
  - User registration

## Client-Side Routing

Set up routing for different sections:

- Home page
- Car hire listings/search page
- User profile and account management
- Admin dashboard for managing car hires, users.

## Installation

### Clone the repository
1. **Clone the repository:**
   sh
   git clone https://github.com/your-username/luxoride.git

### Change into the project directory
2. **Change into the project directory:**
   sh
   cd luxoride

### Backend Setup
3. **Install the required backend dependencies:**
   sh
   pip install -r requirements.txt

### Frontend Setup
4. **Navigate to the client directory:**
   sh
   cd client

5. **Install the required frontend dependencies:**
   sh
   npm install
## Usage

### Start the backend server
1. **Start the backend server:**
   sh
   flask run

### Start the frontend development server
2. **Start the frontend development server:**
   ```sh
  
   npm start

This will start the development server, and you can view the application in your browser at [http://localhost:3000](http://localhost:3000).

## Features
 - Browse Cars
- Users can view available cars with details like model, year, and price per day.

- Book Cars
- Users can select a car, specify rental details, and make a booking.

- Receive Notifications
- Users receive notifications confirming successful bookings.

- Manage Profiles
 - Users can manage their profiles, update information, and view booking history.
## Developers 
- Nicole Gesare Onyiego [@Gesare-n](https://github.com/Gesare-n)
- Sam Wambeo [@Wambeo](https://github.com/Wambeo)
- Samfelix Randa [@samfelix61](https://github.com/samfelix61)
- Jean Waweru [@JeanWaweru](https://github.com/JeanWaweru)

## License
This project is licensed under the MIT License.