import dotenv from "dotenv";
import app from "./app";
import { connectToDatabase } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 300;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
