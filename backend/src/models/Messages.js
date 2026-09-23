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

    Id_propositions_troc: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo_url:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    lu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "messages",
    timestamps: false,
  }
);

export default Messages;