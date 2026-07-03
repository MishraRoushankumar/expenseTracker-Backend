import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";

const PORT = env.PORT;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
