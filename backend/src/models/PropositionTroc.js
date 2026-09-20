import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PropositionTroc = sequelize.define(
  "PropositionTroc",
  {
    Id_propositions_troc: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    statut: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "en_attente",
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "exchange",
    },

    Id_article_propose: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    Id_users: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    Id_articles: {
      type: DataTypes.UUID,
      allowNull: false,
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
    tableName: "propositions_troc",
    timestamps: false,
  }
);

export default PropositionTroc;