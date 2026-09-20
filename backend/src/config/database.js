//connexion a la base de données via les données du .env dans ce meme dossier
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",

    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connecté");
  } catch (error) {
    console.error("❌ Erreur de connexion PostgreSQL :", error);
    process.exit(1);
  }
};

export default sequelize;