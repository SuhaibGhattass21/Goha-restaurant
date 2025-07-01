import { Server } from './interfaces/http/server/server'
import 'reflect-metadata';

const server = new Server()
server.start().catch((error) => {
  console.error("Server startup failed:", error)
  process.exit(1)
})