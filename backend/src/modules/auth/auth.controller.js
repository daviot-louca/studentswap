import {
  registerService,
  loginService,
  modifierMotDePasseService,
  getMeService,
} from "./auth.service.js";

// Inscription
export const registerController = async (req, res) => {
  try {
    const {
      prenom,
      nom,
      pseudo,
      email,
      password,
      Id_villes,
    } = req.body;

    const user = await registerService({
      prenom,
      nom,
      pseudo,
      email,
      password,
      Id_villes,
    });

    return res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès.",
      user,
    });
  } catch (error) {
    console.error("Erreur inscription :", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error:
        statusCode === 500
          ? "Erreur interne du serveur"
          : error.message,
    });
  }
};

// Connexion
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Erreur connexion :", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error:
        statusCode === 500
          ? "Erreur interne du serveur"
          : error.message,
    });
  }
};

// Modification du mot de passe
export const modifierMotDePasseController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const result = await modifierMotDePasseService({
      oldPassword,
      newPassword,
      id: req.user.id,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Erreur modification mot de passe :", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error:
        statusCode === 500
          ? "Erreur interne du serveur"
          : error.message,
    });
  }
};

// Récupération de l'utilisateur connecté
export const getMeController = async (req, res) => {
  try {
    const user = await getMeService(req.user.id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Erreur récupération profil :", error);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      error:
        statusCode === 500
          ? "Erreur interne du serveur"
          : error.message,
    });
  }
};