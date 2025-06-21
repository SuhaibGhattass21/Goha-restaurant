import { Server } from './interfaces/http/server/server'

const server = new Server()
server.start().catch((error) => {
  console.error("Server startup failed:", error)
  process.exit(1)
})