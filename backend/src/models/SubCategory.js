import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SubCategory = sequelize.define(
  "SubCategory",
  {
    Id_subCategories: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    Id_categories: {
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
    tableName: "subCategories",
    timestamps: false,
  }
);

export default SubCategory;