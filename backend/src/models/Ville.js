import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ville = sequelize.define(
  "Ville",
  {
    Id_villes: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    Id_regions: {
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
    tableName: "villes",
    timestamps: false,
  }
);

export default Ville;