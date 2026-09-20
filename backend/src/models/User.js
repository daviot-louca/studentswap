import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    Id_users: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    pseudo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    motsDePasse: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    Id_villes: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    Id_roles: {
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
    tableName: "users",
    timestamps: false,
  },
);

export default User;