import app from "./app";
import { env } from "./config/env";
import { pool } from "./db";

async function start() {
  await pool.query("SELECT 1"); // fail fast if DB is down
  app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});