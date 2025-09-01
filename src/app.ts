import { errorHandler } from "@buxlo/common";
import { Iserver } from "./domain/interfaces/Iserver";
// import {
//   connectDB,
//   disconnectDB,
// } from "./infrastructure/database/mongodb/connection";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { MentorRouter } from "./presentation/routes/mentorRouts";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/mongodb/connection";
import { grpcService } from "./infrastructure/rpc/grpc/bookingServer";
// import { messageBroker } from "./infrastructure/MessageBroker/config";

export class App {
  constructor(private _server: Iserver) {}

  async initialize(): Promise<void> {
    await this._connectDB();
    await this._connectGrpc();
    // await this.connectKafka();
    this._registerMiddleware();
    this._registerRoutes();
    this._registerErrorHandler();
  }

  private _registerMiddleware(): void {
    this._server.registerMiddleware(loggerMiddleware);
  }
  private _registerRoutes(): void {
    const mentorRoutes = new MentorRouter().getRouter();

    this._server.registerRoutes("/api/booking/mentor", mentorRoutes);
  }

  private _registerErrorHandler(): void {
    this._server.registerErrorHandler(errorHandler as any);
  }

  async start(port: number): Promise<void> {
    await this._server.start(port);
  }

  async shutdown(): Promise<void> {
    await disconnectDB();
    // await messageBroker.disconnect();
    console.log("Shut dow server");
  }
  private async _connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }

  private async _connectGrpc(): Promise<void> {
    try {
      await grpcService.start();
      console.log("gRPC server started successfully.");
    } catch (error) {
      console.error("Failed to start gRPC server:", error);
    }
  }

  // private async connectKafka(): Promise<void> {
  //   await messageBroker.connect();
  // }
}
