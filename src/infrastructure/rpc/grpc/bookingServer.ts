import {
  BadRequest,
  UpdateAvailabilityRequest,
  UpdateAvailabilityResponse,
} from "@buxlo/common";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { AvailabilityRepository } from "../../repositories/availability.Repository";

const PROTO_PATH = path.join(
  __dirname,
  "../../../../node_modules/@buxlo/common/src/protos/payment.proto"
);

// Load proto definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});



const paymentProto = (grpc.loadPackageDefinition(packageDefinition) as any)
  .payment;

class BookingServiceGrpc {
  private _server: grpc.Server;
  private _port: number;

  constructor(port: number) {
    this._server = new grpc.Server();
    this._port = port;
    this._initializeService();
  }

  private _initializeService() {
    const bookingService = {
      UpdateAvailability: async (
        call: grpc.ServerUnaryCall<
          UpdateAvailabilityRequest,
          UpdateAvailabilityResponse
        >,
        callback: grpc.sendUnaryData<UpdateAvailabilityResponse>
      ) => {
        const { id, status, isBooked } = call.request;

        const availabilityRepo = new AvailabilityRepository();
        try {
          if (!id) throw new BadRequest("Id is required");
          if (!status) throw new BadRequest("Status is required");

          const existingUser = await availabilityRepo.findById(id as string);
          if (existingUser) {
            // Map numeric status to string
            let mappedStatus: "available" | "booked" | "cancelled" | "pending" | undefined;
            switch (status) {
              case 1:
                mappedStatus = "available";
                break;
              case 2:
                mappedStatus = "booked";
                break;
              case 3:
                mappedStatus = "cancelled";
                break;
              case "available":
              case "booked":
              case "cancelled":
              case "pending":
                mappedStatus = status;
                break;
              default:
                mappedStatus = undefined;
            }

            const updatedUser = await availabilityRepo.update(id, {
              status: mappedStatus,
              isBooked,
            });
            callback(null, {
              id: updatedUser!.id,
              success: true,
            });
          }
        } catch (error: any) {
          console.error("Error creating user:", error.message);
          callback(
            { code: grpc.status.INTERNAL, message: "creation failed" },
            null
          );
        }
        callback(null, {
          id,
          success: true,
        });
      },
    };

    this._server.addService(
      paymentProto.BookingService.service,
      bookingService
    );
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._server.bindAsync(
        `0.0.0.0:${this._port}`,
        grpc.ServerCredentials.createInsecure(),
        (err) => {
          if (err) return reject(err);
          console.log(`Booking gRPC Service running on port ${this._port}`);
          this._server.start();
          resolve();
        }
      );
    });
  }
}

export const grpcService = new BookingServiceGrpc(
  Number(process.env.GRPC_PORT) || 50052
);
