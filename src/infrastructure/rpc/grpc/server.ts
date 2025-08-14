import {
  UpdateAvailabilityRequest,
  UpdateAvailabilityResponse,
} from "@buxlo/common";
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

const bookingProto = (grpc.loadPackageDefinition(packageDefinition) as any)
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
        console.log("+++++++ gRPC received:", id, status, isBooked);

        // Send a success response
        callback(null, {
          id: id,
          success: true,
        });
      },
    };

    this._server.addService(bookingProto.BookingService.service, bookingService);
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._server.bindAsync(
        `0.0.0.0:${this._port}`,
        grpc.ServerCredentials.createInsecure(),
        (err) => {
          if (err) return reject(err);
          console.log(`gRPC Service running on port ${this._port}`);
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
