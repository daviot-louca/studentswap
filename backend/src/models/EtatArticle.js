import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EtatArticle = sequelize.define(
  "EtatArticle",
  {
    Id_etatArticle: {
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
    tableName: "etatArticle",
    timestamps: false,
  }
);

export default EtatArticle;