import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export class SocketServer {
  private io: Server;
  private online: Map<string, string> = new Map();

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: [process.env.CLIENT_URL as string, "http://localhost:5173"],
        methods: ["GET", "POST"],
      },
    });

    this.setupListeners();
  }

  private handleConnection(socket: Socket): void {
    console.log(`User connected: ${socket.id},`);
    this.setupSocketListeners(socket);
  }

  private handleDisconnect(socket: Socket): void {
    console.log(`User disconnected: ${socket.id}`);
  }

  private handleDirectNotification(socket: Socket, data: any): void {
    if (!data.receiverId) {
      console.error("Direct message missing receiverId");
      return;
    }
    const { receiverId, notification } = data;
    console.log(receiverId, this.online.get(receiverId));

    if (this.online.has(receiverId)) {
      const socketId = this.online.get(receiverId);

      this.io.to(socketId!).emit("direct_notification", notification);
      console.log(
        `User ${receiverId} is offline, sending notification to socket ID: ${socketId}`
      );
    }
  }

  private handleJoin(socket: Socket, userId: string): void {
    this.online.set(userId, socket.id);
    console.log(`User ${userId} joined with socket ID: ${socket.id}`);

    console.log("Online users:");
    for (const [userId, socketId] of this.online.entries()) {
      console.log(`- ${userId}: ${socketId}`);
    }
  }

  private handleMarkAllRead(socket: Socket, data: { userId: string }): void {
    const { userId } = data;

    const receiverSocketId = this.online.get(userId);
    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit("mark_all_read", { userId });
      console.log(`Emitted 'mark_all_read' to socket: ${receiverSocketId}`);
    } else {
      console.log(`User ${userId} not online; cannot emit 'mark_all_read'`);
    }
  }

  private handileLeave(socket: Socket, userId: string): void {
    socket.leave(userId);
    this.online.delete(userId);
    this.io.emit("leave", userId);
    console.log(`User ${userId} left with socket ID: ${socket.id}`);
  }

  private setupSocketListeners(socket: Socket): void {
    socket.on("join", ({ userId }: { userId: string }) => {
      console.log(`User ${userId} joined with socket ID: ${socket.id}`);
      return this.handleJoin(socket, userId);
    });
    socket.on("direct_notification", (data) =>
      this.handleDirectNotification(socket, data)
    );
    socket.on("mark_all_read", (data) => this.handleMarkAllRead(socket, data));
    socket.on("leave", (userId: string) => this.handileLeave(socket, userId));
    socket.on("disconnect", () => this.handleDisconnect(socket));
  }
  private setupListeners(): void {
    this.io.on("connection", (socket: Socket) => this.handleConnection(socket));
  }

  public getIO(): Server {
    return this.io;
  }
}
