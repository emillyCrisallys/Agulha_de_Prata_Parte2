import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

// Validação básica das variáveis essenciais
const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Variável de ambiente ${key} não está definida.`);
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: !isTest,
  }
);

// Sincroniza o banco automaticamente fora do ambiente de teste
if (!isTest) {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("✅ Banco de dados sincronizado com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao sincronizar o banco de dados:", error);
    }
  })();
}

export default sequelize;