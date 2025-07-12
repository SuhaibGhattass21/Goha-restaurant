import 'reflect-metadata';
export declare class Server {
    private app;
    private readonly PORT;
    private setupSwagger;
    constructor();
    private setupMiddlewares;
    private setupHealthCheck;
    private initializeDependencies;
    private setupRoutes;
    private setupErrorHandlers;
    private gracefulShutdown;
    private shutdown;
    start(): Promise<void>;
}
