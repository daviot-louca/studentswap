import cors from "cors";
import "dotenv/config";

const allowedOrigins = [
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    // Autorise les requêtes sans Origin
    // (Postman, curl, certaines requêtes serveur-à-serveur)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin non autorisée par CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

export default cors(corsOptions);