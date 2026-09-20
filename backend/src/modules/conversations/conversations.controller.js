import {
    getUserConversations,
    getConversationById,
    getConversationMessages,
    createConversation,
  } from "./conversations.service.js";
  
  export const allConversations = async (req, res, next) => {
    try {
      const conversations = await getUserConversations(req.user.id);
  
      res.status(200).json({
        success: true,
        data: conversations,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const conversation = async (req, res, next) => {
    try {
      const result = await getConversationById(
        req.params.id,
        req.user.id,
      );
  
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const conversationMessages = async (req, res, next) => {
    try {
      const result = await getConversationMessages(
        req.params.id,
        req.user.id,
        req.query.page,
        req.query.limit,
      );
  
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const createNewConversation = async (req, res, next) => {
    try {
      const result = await createConversation(
        req.user.id,
        req.body.participantId,
      );
  
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };