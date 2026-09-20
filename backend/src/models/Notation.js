import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notation = sequelize.define(
  "Notation",
  {
    Id_notation: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "notation",
    timestamps: false,
  }
);

export default Notation;