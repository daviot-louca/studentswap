import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Article = sequelize.define(
  "Article",
  {
    Id_articles: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    titre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    Id_users: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    Id_subCategories: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    Id_etatArticle: {
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
    tableName: "articles",
    timestamps: false,
  }
);

export default Article;