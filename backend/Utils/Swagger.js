import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workout Tracker API",
      version: "1.0.0",
      description: "API documentation for Workout Tracker Project",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(options);
export default swaggerDocs;
