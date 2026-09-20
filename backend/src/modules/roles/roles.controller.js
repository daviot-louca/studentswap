import {
    getRolesService,
    getRoleByIdService,
    createRoleService,
    updateRoleService,
    deleteRoleService,
  } from "./roles.service.js";
  
  // Récupérer tous les rôles
  export const allRoles = async (req, res) => {
    try {
      const roles = await getRolesService();
  
      return res.status(200).json({
        success: true,
        roles,
      });
    } catch (error) {
      console.error("Erreur récupération rôles :", error);
  
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
  
  // Récupérer un rôle
  export const role = async (req, res) => {
    try {
      const role = await getRoleByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        role,
      });
    } catch (error) {
      console.error("Erreur récupération rôle :", error);
  
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
  
  // Créer un rôle
  export const createRole = async (req, res) => {
    try {
      const newRole = await createRoleService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Rôle créé avec succès",
        role: newRole,
      });
    } catch (error) {
      console.error("Erreur création rôle :", error);
  
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
  
  // Modifier un rôle
  export const updateRole = async (req, res) => {
    try {
      const updatedRole = await updateRoleService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Rôle modifié avec succès",
        role: updatedRole,
      });
    } catch (error) {
      console.error("Erreur modification rôle :", error);
  
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
  
  // Supprimer un rôle
  export const deleteRole = async (req, res) => {
    try {
      await deleteRoleService(req.params.id);
  
      return res.status(200).json({
        success: true,
        message: "Rôle supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression rôle :", error);
  
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