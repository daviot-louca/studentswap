import jwt from "jsonwebtoken";
import "dotenv/config";

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentification requise."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return next(new Error("Token invalide ou expiré."));
  }
};

export default socketAuth;