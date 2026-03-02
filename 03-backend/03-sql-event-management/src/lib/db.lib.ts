import { Pool } from "../../node_modules/@types/pg/index.js";

const pool = new Pool({
  user: "postgres.yoyckltkfzoiahvbtzry",
  host: "aws-1-ap-south-1.pooler.supabase.com",
  database: "postgres",
  password: "purwadhika1234",
  port: 5432,
});

export default pool;
