"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./interfaces/http/server/server");
require("reflect-metadata");
const server = new server_1.Server();
server.start().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map