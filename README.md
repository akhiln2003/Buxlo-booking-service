# BUXLO Booking Service

The **BUXLO Booking Service** manages the mentorship schedule on the platform. It handles available slot creation, recurring schedule generation using the **rrule** rule builder, slot reservation locks, and session confirmations. It hosts a gRPC server on port `50052` to allow other services to query and lock session slots during checkout.

---

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/) (TypeScript)
- **Web Framework**: [Express](https://expressjs.com/) (Express 5.x)
- **Data Persistence**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Recurrence Engine**: [rrule](https://github.com/jakubroztocil/rrule) (iCalendar RFC-5545 availability schedules)
- **Real-Time Updates**: [Socket.io](https://socket.io/) (for live schedule updates)
- **Message Broker**: [Apache Kafka](https://kafka.apache.org/) (publishes `booking-created`, `booking-cancelled` events)
- **RPC Framework**: [gRPC Node](https://grpc.io/docs/languages/node/) (runs server on port `50052`)
- **Shared Codebase**: `@buxlo/common`

---

## ⚙️ Environment Variables

Create a `.env` file in the `booking/` directory:

| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | `4006` | Express server port. |
| `MONGODB_URI` | Yes | `mongodb+srv://...` | MongoDB database connection string for `Booking` namespace. |
| `AWS_S3_BUCKET_NAME` | Yes | `s3-buxlo` | AWS S3 Bucket Name for scheduling attachments. |
| `AWS_S3_BUCKET_REGION` | Yes | `ap-southeast-2` | AWS Region. |
| `AWS_S3_BUCKET_ACCESS_KEY` | Yes | `AKIAR52NK44...` | IAM access key. |
| `AWS_S3_BUCKET_SECRET_ACCESS_KEY` | Yes | `rEN5RuIp8hA1z...` | IAM secret access key. |
| `KAFKA_BROKER` | Yes | `kafka:9092` | Network location of the Kafka broker. |
| `KAFKA_CLIENT_ID` | Yes | `booking-service`| Kafka client identifier. |
| `KAFKA_GROUP_ID` | Yes | `booking-group` | Kafka consumer group identifier. |
| `GRPC_PORT` | Yes | `50052` | Port on which the Booking gRPC Server runs. |
| `FRONT_END_BASE_URL` | Yes | `http://localhost:5173` | UI base URL. |

---

## 📡 Port & RPC Configurations

### REST Routes
- `GET /api/booking/slots/:mentorId` — Retrieves available slots for a mentor.
- `POST /api/booking/slots` — Mentors publish availability using rrule syntax.
- `POST /api/booking/book` — Reserves a slot (sets pending status).

### gRPC Server (`:50052`)
- Exposes methods for confirming or unlocking session slots synchronously when payment transactions are processed.

### Kafka Event Publishing
- Publishes events to `booking-events` topic upon booking confirmation.

---

## 🏃 Local Setup & Run

Inside the `booking/` directory:

```bash
# 1. Install dependencies
npm install

# 2. Run the server
npm run start
```
Starts `ts-node-dev src/server.ts` compiling TypeScript in real-time.

---

Developed for **BUXLO Personal Finance & Mentorship Platform**.