// server.ts
import app from "./app";
import connectDB from "./config/database.config";

const PORT = process.env.PORT || 8080;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port🌈 🌈 ⚡️💥🔥${PORT}`);
});
