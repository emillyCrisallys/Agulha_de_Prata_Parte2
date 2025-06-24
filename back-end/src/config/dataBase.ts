import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
    logging: !isTest,
  }
);

// Sincroniza o banco apenas fora do ambiente de teste
if (!isTest) {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Banco de dados sincronizado.");
    } catch (error) {
      console.error("Erro ao sincronizar o banco de dados:", error);
    }
  })();
}

export default sequelize;