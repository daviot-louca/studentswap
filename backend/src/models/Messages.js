import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Messages = sequelize.define(
  "Messages",
  {
    Id_messages: {
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

    contenu: {
      type: DataTypes.TEXT,
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
    tableName: "messages",
    timestamps: false,
  }
);

export default Messages;