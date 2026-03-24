import { prisma} from "@repo/db";
import { config } from "dotenv";
config();

Bun.serve({
  port: 8081,
  fetch(req, server) {
    // Upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // Bun handles the response automatically on success
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    // This runs whenever a message is received
    async message(ws, message) {
      console.log(`Received message: ${message}`);

      try {
        await prisma.user.create({
          data: {
            username: `user_${Math.random().toString(36).substring(7)}`,
            email: `${Math.random().toString(36).substring(7)}@example.com`,
            password: "hashed_password_here",
          },
        });
        ws.send("User created in DB via WebSocket!");
      } catch (e) {
        ws.send("Error saving to database");
        console.error(e);
      }
    },
    open(ws) {
      console.log("WebSocket connection opened");
    },
    close(ws) {
      console.log("WebSocket connection closed");
    },
  },
});

console.log("WebSocket server running on ws://localhost:8081");