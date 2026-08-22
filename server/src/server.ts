import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL ?? "http://localhost:5173", credentials: true },
});
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("join-room", (roomId: string) => socket.join(roomId));
  socket.on("send-message", (payload) => {
    if (payload?.roomId) io.to(payload.roomId).emit("new-message", payload);
  });
});
await connectDatabase();
const port = Number(process.env.PORT ?? 5000);
httpServer.listen(port, () => console.log(`API running on http://localhost:${port}`));
