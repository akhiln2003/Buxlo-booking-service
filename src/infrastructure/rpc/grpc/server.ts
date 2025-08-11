import { UpdateAvailabilityRequest, UpdateAvailabilityResponse } from "@buxlo/common";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  __dirname,
  "../../../../node_modules/@buxlo/common/src/protos/booking.proto"
);

// Load proto definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = (grpc.loadPackageDefinition(packageDefinition) as any).payment;

class BookingServiceGrpc {
  private server: grpc.Server;
  private port: number;

  constructor(port: number) {
    this.server = new grpc.Server();
    this.port = port;
    this.initializeService();
  }

  private initializeService() {
    const bookingService = {
      UpdateAvailability: async (
        call: grpc.ServerUnaryCall<UpdateAvailabilityRequest, UpdateAvailabilityResponse>,
        callback: grpc.sendUnaryData<UpdateAvailabilityResponse>
      ) => {
        const { id, status, isBooked } = call.request;
        console.log("+++++++ gRPC received:", id, status, isBooked);

        // Send a success response
        callback(null, {
          id: id,
          success: true,
        });
      },
    };

    this.server.addService(bookingProto.BookingService.service, bookingService);
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.bindAsync(
        `0.0.0.0:${this.port}`,
        grpc.ServerCredentials.createInsecure(),
        (err) => {
          if (err) return reject(err);
          console.log(`gRPC Service running on port ${this.port}`);
          this.server.start();
          resolve();
        }
      );
    });
  }
}

export const grpcService = new BookingServiceGrpc(
  Number(process.env.GRPC_PORT) || 50052
);
