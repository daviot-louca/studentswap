import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ArticlePhoto = sequelize.define(
  "ArticlePhoto",
  {
    Id_photosArticle: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    Id_articles: {
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
    tableName: "photosArticle",
    timestamps: false,
  }
);

export default ArticlePhoto;