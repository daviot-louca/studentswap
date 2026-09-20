import {
    getTagsService,
    getTagByIdService,
    getTagsBySubCategoryService,
    createTagService,
    updateTagService,
    deleteTagService,
  } from "./tags.service.js";
  
  // Récupérer tous les tags
  export const allTags = async (req, res) => {
    try {
      const tags = await getTagsService();
  
      return res.status(200).json({
        success: true,
        tags,
      });
    } catch (error) {
      console.error("Erreur récupération tags :", error);
  
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
  
  // Récupérer un tag
  export const tag = async (req, res) => {
    try {
      const tag = await getTagByIdService(req.params.id);
  
      return res.status(200).json({
        success: true,
        tag,
      });
    } catch (error) {
      console.error("Erreur récupération tag :", error);
  
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
  
  // Récupérer les tags d'une sous-catégorie
  export const tagsBySubCategory = async (req, res) => {
    try {
      const tags = await getTagsBySubCategoryService(
        req.params.subCategoryId,
      );
  
      return res.status(200).json({
        success: true,
        tags,
      });
    } catch (error) {
      console.error(
        "Erreur récupération tags de la sous-catégorie :",
        error,
      );
  
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
  
  // Créer un tag
  export const createTag = async (req, res) => {
    try {
      const newTag = await createTagService(req.body);
  
      return res.status(201).json({
        success: true,
        message: "Tag créé avec succès",
        tag: newTag,
      });
    } catch (error) {
      console.error("Erreur création tag :", error);
  
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
  
  // Modifier un tag
  export const updateTag = async (req, res) => {
    try {
      const updatedTag = await updateTagService(
        req.params.id,
        req.body,
      );
  
      return res.status(200).json({
        success: true,
        message: "Tag modifié avec succès",
        tag: updatedTag,
      });
    } catch (error) {
      console.error("Erreur modification tag :", error);
  
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
  
  // Supprimer un tag
  export const deleteTag = async (req, res) => {
    try {
      await deleteTagService(req.params.id);
  
      return res.status(200).json({
        success: true,
        message: "Tag supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur suppression tag :", error);
  
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