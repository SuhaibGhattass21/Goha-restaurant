import 'reflect-metadata';
import { Server } from './interface-adapters/http/server/server'

const server = new Server()
server.start().catch((error) => {
  console.error("Server startup failed:", error)
  process.exit(1)
})