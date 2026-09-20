import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ConversationParticipant = sequelize.define(
  "ConversationParticipant",
  {
    Id_conversationsParticipants: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    Id_conversations: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    Id_users: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "conversationParticipants",
    timestamps: false,
  }
);

export default ConversationParticipant;