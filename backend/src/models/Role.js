import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define(
  "Role",
  {
    Id_roles: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    tableName: "roles",
    timestamps: false,
  }
);

export default Role;