# Booking Service

This service handles the booking functionality of the BUXLO application. It manages creating, retrieving, and managing bookings. It uses MongoDB for data storage and communicates with other services via Kafka and gRPC.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [gRPC Services](#grpc-services)
- [Kafka Integration](#kafka-integration)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (v18)
- npm
- MongoDB
- Kafka

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `booking` directory:
   ```bash
   cd Microservices/booking
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the service in development mode, run:

```bash
npm start
```

This will start the server using `ts-node-dev`.

## Environment Variables

This service requires the following environment variables to be set. You can create a `.env` file in the root of the `booking` directory and add the following:

| Variable                          | Description                               | Default Value                                                                               |
| --------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| `PORT`                            | The port the service will run on.         | `4006`                                                                                      |
| `MONGODB_URI`                     | The connection URI for the MongoDB database. | `mongodb+srv://<user>:<password>@buxlo.hpj5x.mongodb.net/Booking?retryWrites=true&w=majority&appName=Buxlo` |
| `AWS_S3_BUCKET_NAME`              | The name of the AWS S3 bucket.            | `buxlo-bucket`                                                                              |
| `AWS_S3_BUCKET_REGION`            | The region of the AWS S3 bucket.          | `eu-north-1`                                                                                |
| `AWS_S3_BUCKET_ACCESS_KEY`        | The access key for the AWS S3 bucket.     | `AKIA42PHHT2HQGKHIMFB`                                                                      |
| `AWS_S3_BUCKET_SECRET_ACCESS_KEY` | The secret access key for the AWS S3 bucket. | `REDACTED — set in .env`                                                   |
| `KAFKA_CLIENT_ID`                 | The client ID for Kafka.                  | `booking-service`                                                                           |
| `KAFKA_BROKER`                    | The Kafka broker address.                 | `kafka:9092`                                                                                |
| `KAFKA_GROUP_ID`                  | The Kafka group ID.                       | `booking-group`                                                                             |
| `GRPC_PORT`                       | The port for the gRPC server.             | `50052`                                                                                     |
| `CLIENT_URL`                      | The base URL of the client application.   | `http://localhost:5173`                                                                     |

<!-- 
## API Endpoints

This service exposes RESTful endpoints for managing bookings.
*(Detailed documentation of the API endpoints should be added here)* -->

## gRPC Services

This service exposes a gRPC server on the port specified by the `GRPC_PORT` environment variable.

## Kafka Integration

This service uses Kafka for asynchronous communication. It acts as a producer and consumer.

<!-- ## Running Tests

There are no test scripts configured for this service yet. -->

## Deployment

This service can be containerized using Docker. A `Dockerfile` is provided in the root of the `booking` directory.

To build the Docker image:

```bash
docker build -t booking-service .
```

To run the Docker container:

```bash
docker run -p 4006:4006 booking-service
```