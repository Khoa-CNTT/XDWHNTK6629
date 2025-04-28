/**
 * CORS configuration for API requests
 */
export const corsOptions = {
  origin: "*", // Allow all origins in development, restrict in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
