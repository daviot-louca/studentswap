import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authentification requise.",
      });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        error: "Token d'authentification invalide.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Le token a expiré.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        error: "Token invalide.",
      });
    }

    console.error("Erreur middleware auth :", error);

    return res.status(500).json({
      success: false,
      error: "Erreur interne du serveur.",
    });
  }
};

export default AuthMiddleware;