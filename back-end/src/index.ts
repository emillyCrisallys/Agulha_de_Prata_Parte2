import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import sequelize from "./config/dataBase";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import cartRoutes from "./routes/cartRoutes";
import loginRoutes from "./routes/loginRoutes";
import "./models/associations";
import cors from "cors";

const app = express();
const port =  process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(inventoryRoutes);
app.use(cartRoutes);
app.use(loginRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});

export default app;
