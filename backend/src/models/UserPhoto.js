import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserPhoto = sequelize.define(
  "UserPhoto",
  {
    Id_usersPhotos: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    photo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    Id_users: {
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
    tableName: "usersPhotos",
    timestamps: false,
  }
);

export default UserPhoto;