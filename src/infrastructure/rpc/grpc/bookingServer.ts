import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { BadRequest } from "@buxlo/common";
import { AvailabilityRepository } from "../../repositories/availability.Repository";

// Path to the proto file
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

/**
 * Booking gRPC Server
 */
export class BookingGrpcServer {
  private _server: grpc.Server;

  constructor() {
    this._server = new grpc.Server();
    this._initializeService();
  }

  /**
   * Initialize BookingService implementation
   */
  private _initializeService() {
    const bookingService = {
      UpdateAvailability: async (
        call: grpc.ServerUnaryCall<
          { id: string; status: number | string; isBooked: boolean },
          { id: string; success: boolean }
        >,
        callback: grpc.sendUnaryData<{ id: string; success: boolean }>
      ) => {
        const { id, status, isBooked } = call.request;
        console.log("📞 gRPC UpdateAvailability called with:", call.request);

        const availabilityRepo = new AvailabilityRepository();

        try {
          // ✅ Validate inputs
          if (!id) throw new BadRequest("Id is required");
          if (status === undefined || status === null)
            throw new BadRequest("Status is required");

          // ✅ Check existence
          const existing = await availabilityRepo.findById(id as string);
          if (!existing) {
            return callback(
              {
                code: grpc.status.NOT_FOUND,
                message: "Availability not found",
              },
              null
            );
          }

          // ✅ Map enum number to string
          let mappedStatus:
            | "available"
            | "booked"
            | "cancelled"
            | "pending"
            | undefined;

          switch (status) {
            case 0:
              mappedStatus = "available";
              break;
            case 1:
              mappedStatus = "booked";
              break;
            case 2:
              mappedStatus = "cancelled";
              break;
            case 3:
              mappedStatus = "pending";
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

          if (!mappedStatus)
            throw new BadRequest(`Invalid status value: ${status}`);

          // ✅ Update in DB
          const updated = await availabilityRepo.update(id, {
            status: mappedStatus,
            isBooked,
          });

          console.log("✅ Updated availability via gRPC:", updated);

          // ✅ Send response and return ONCE
          return callback(null, {
            id: updated!.id as string,
            success: true,
          });
        } catch (error: any) {
          console.error("❌ Error updating availability:", error.message);
          return callback(
            { code: grpc.status.INTERNAL, message: error.message },
            null
          );
        }
      },
    };

    // ✅ Register service
    this._server.addService(
      paymentProto.BookingService.service,
      bookingService
    );
  }

  /**
   * Start the gRPC server
   */
  public start(port: number) {
    const address = `0.0.0.0:${port}`;
    this._server.bindAsync(
      address,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error("❌ Failed to start gRPC server:", err);
          return;
        }
        console.log(` Booking gRPC server running on port ${port}`);
        this._server.start();
      }
    );
  }
}
