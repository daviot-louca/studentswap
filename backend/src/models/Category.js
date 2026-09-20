import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define(
  "Category",
  {
    Id_categories: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    nom: {
      type: DataTypes.STRING(100),
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
    tableName: "categories",
    timestamps: false,
  }
);

export default Category;