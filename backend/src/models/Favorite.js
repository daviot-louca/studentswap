import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Favorite = sequelize.define(
  "Favorite",
  {
    Id_favorites: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "favorites",
    timestamps: false,
  }
);

export default Favorite;