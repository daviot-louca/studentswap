import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Conversation = sequelize.define(
  "Conversation",
  {
    Id_conversations: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    tableName: "conversations",
    timestamps: false,
  }
);

export default Conversation;