//import des fichiers
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import corsMiddleware from "./config/cors.js";
//import des routes
import routes from "./routes/index.routes.js";

import notFoundMiddleware from "./middlewares/notFound.middlewares.js";
import errorMiddleware from "./middlewares/error.middlewares.js";

const app = express();
// les 3 là c'est de la sécurité 
app.disable("x-powered-by");

app.use(helmet());

app.use(corsMiddleware);
// le rate limiting mais là il est à 100 requetes max, on l'augmentera plus tard
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Trop de requêtes. Réessayez plus tard.",
  },
});

//upload les photos
app.use(
  "/uploads",
  (req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:5173",
    );

    res.header(
      "Cross-Origin-Resource-Policy",
      "cross-origin",
    );

    next();
  },
  express.static(
    path.resolve(process.cwd(), "uploads"),
  ),
);
app.use("/api", apiLimiter);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
// voir si l'api fonctionne
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudentSwap API fonctionne",
    timestamp: new Date().toISOString(),
  });
});
// se connecter au routes
app.use("/api", routes);
// erreur 404
app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;