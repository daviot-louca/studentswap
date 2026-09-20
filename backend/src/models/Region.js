import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Region = sequelize.define(
  "Region",
  {
    Id_regions: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    nom: {
      type: DataTypes.STRING(100),
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
    tableName: "region",
    timestamps: false,
  }
);

export default Region;