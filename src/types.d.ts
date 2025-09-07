// Global type declarations for modules without type definitions

declare module 'express-rate-limit' {
  const rateLimit: any;
  export = rateLimit;
}

declare module 'swagger-jsdoc' {
  interface Options {
    definition: any;
    apis: string[];
  }
  
  function swaggerJSDoc(options: Options): any;
  namespace swaggerJSDoc {
    interface Options {
      definition: any;
      apis: string[];
    }
  }
  
  export = swaggerJSDoc;
}
