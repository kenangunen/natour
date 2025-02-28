````markdown
# Natours

Natours is a tour booking application designed for nature tours. The project is built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

## Features

- User registration and login
- JWT authentication
- User roles and authorization
- Tour booking system
- Tour reviews and ratings
- Image upload and processing

## Installation

Follow these steps to get the project up and running:

### 1. Clone the repository:

```sh
git clone https://github.com/yourusername/natours.git
```
````

### 2. Navigate to the project directory:

```sh
cd natours
```

### 3. Install the dependencies:

```sh
npm install
```

### 4. Configure the environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```dotenv
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://kenangunen:<PASSWORD>@natourstest.5209o.mongodb.net/natours?retryWrites=true&w=majority&appName=NatoursTest
DATABASE_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=5s
```

> **Note:** Be sure to replace `<PASSWORD>` with your actual MongoDB password.

## Usage

To run the application locally:

### 1. Start the development server:

```sh
npm run dev
```

### 2. Open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication

- `POST /api/v1/users/signup`: Register a new user.
- `POST /api/v1/users/login`: Login a user.

### Tours

- `GET /api/v1/tours`: Get all tours.
- `GET /api/v1/tours/:id`: Get a single tour.
- `POST /api/v1/tours`: Create a new tour (Admin only).
- `PATCH /api/v1/tours/:id`: Update a tour (Admin only).
- `DELETE /api/v1/tours/:id`: Delete a tour (Admin only).

### Bookings

- `POST /api/v1/bookings/checkout-session/:tourId`: Create a checkout session for a tour.
- `GET /api/v1/bookings`: Get all bookings (Admin only).
- `GET /api/v1/bookings/:id`: Get a single booking (Admin only).

### Reviews

- `GET /api/v1/reviews`: Get all reviews.
- `POST /api/v1/tours/:tourId/reviews`: Create a review for a tour.
- `PATCH /api/v1/reviews/:id`: Update a review.
- `DELETE /api/v1/reviews/:id`: Delete a review.

## Postman Collection Usage

To test the API endpoints easily, you can use the Postman collection and environment files.

### Steps to use the Postman collection:

1. Open **Postman**.
2. Go to **File > Import** and select the `postman/api-collection.json` file to import the Postman collection.
3. Once the collection is imported, go to the **Environments** tab on the top right of Postman.
4. Click on the **Settings** (gear) icon, then select **Import** and choose the `postman/api-environment.json` file to import your environment settings.
5. After both the collection and environment are imported, you can start testing the API endpoints.

Enjoy testing your APIs with Postman!

## Contributing

We welcome contributions! If you'd like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the **MIT License**.
