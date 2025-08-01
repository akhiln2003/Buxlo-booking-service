import { errorHandler } from "@buxlo/common";
import { Iserver } from "./domain/interfaces/Iserver";
// import {
//   connectDB,
//   disconnectDB,
// } from "./infrastructure/database/mongodb/connection";
// import { grpcService } from "./infrastructure/rpc/grpc/server";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
// import { messageBroker } from "./infrastructure/MessageBroker/config";

export class App {
  constructor(private server: Iserver) {}

  async initialize(): Promise<void> {
    await this.connectDB();
    await this.connectGrpc();
    await this.connectKafka();
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandler();
  }

  private registerMiddleware(): void {
    this.server.registerMiddleware(loggerMiddleware);
  }
  private registerRoutes(): void {
    // const userRoutes = new UserRouter().getRouter();
    // const mentorRoutes = new MentorRouter().getRouter();
    // const adminRoutes = new AdminRouter().getRouter();
    // const commonRoutes = new CommonRouter().getRouter();

    // this.server.registerRoutes("/api/user/mentor", mentorRoutes);
    // this.server.registerRoutes("/api/user/user", userRoutes);
    // this.server.registerRoutes("/api/user/admin", adminRoutes);
    // this.server.registerRoutes("/api/user/common", commonRoutes);
  }

  private registerErrorHandler(): void {
    this.server.registerErrorHandler(errorHandler as any);
  }

  async start(port: number): Promise<void> {
    await this.server.start(port);
  }

  async shutdown(): Promise<void> {
    // await disconnectDB();
    // await messageBroker.disconnect();
    console.log("Shut dow server");
  }
  private async connectDB() {
    try {
    //   await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }

  private async connectGrpc(): Promise<void> {
    try {
    //   await grpcService.start();
      console.log("gRPC server started successfully.");
    } catch (error) {
      console.error("Failed to start gRPC server:", error);
    }
  }

  private async connectKafka(): Promise<void> {
    // await messageBroker.connect();
  }
}
