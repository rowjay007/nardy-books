# Nardy Books

Nardy Books is a RESTful API for managing book-related operations. It is built with NodeJS, TypeScript, and Express, and uses MongoDB for data storage. The project integrates with payment gateways (Flutterwave, PayStack) and includes comprehensive testing and deployment setups.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Configuration](#configuration)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication and Authorization
- Book Management (CRUD operations)
- Author Management (CRUD operations)
- Publisher Management (CRUD operations)
- Genre Management (CRUD operations)
- Review Management
- Subscription Management
- Payment Integration (Flutterwave, PayStack)
- Notifications (Email via Mailtrap)
- Security features (CORS, CSRF protection, Helmet, etc.)
- API Documentation (Swagger)
- Logging (Winston, Morgan)
- Error Handling and Monitoring (Sentry)
- Dockerized Setup
- CI/CD (Jenkins)
- Comprehensive Testing (Playwright, Cypress, Jest)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/nardy-books.git
    cd nardy-books
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```bash
    touch .env
    ```

    Sample `.env`:
    ```
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/nardybooks
    JWT_SECRET=your_jwt_secret
    FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
    PAYSTACK_SECRET_KEY=your_paystack_secret_key
    MAILTRAP_USER=your_mailtrap_user
    MAILTRAP_PASS=your_mailtrap_password
    ```

### Running the Project

1. Build the project:
    ```bash
    npm run build
    ```

2. Start the server:
    ```bash
    npm start
    ```

3. For development mode with hot-reloading:
    ```bash
    npm run dev
    ```

## Configuration

Configure various aspects of the application in the `src/config` directory, such as database connection, environment variables, logging, and rate limiting.

## Testing

- Run unit tests with Jest:
    ```bash
    npm run test
    ```

- Run end-to-end tests with Cypress:
    ```bash
    npx cypress open
    ```

- Run integration tests with Playwright:
    ```bash
    npx playwright test
    ```

## Technologies Used

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **Payment Gateways:** Flutterwave, PayStack
- **Testing:** Jest, Cypress, Playwright
- **Logging and Monitoring:** Winston, Morgan, Sentry
- **Documentation:** Swagger
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **Security:** CORS, CSRF, Helmet, XSS-Clean
- **Mailing:** Mailtrap

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License.
