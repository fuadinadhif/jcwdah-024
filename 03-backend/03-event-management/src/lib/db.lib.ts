import { Pool } from "pg";

const pool = new Pool({
  user: "postgres.yoyckltkfzoiahvbtzry",
  host: "aws-1-ap-south-1.pooler.supabase.com",
  database: "postgres",
  password: "purwadhika1234",
  port: 5432,
});

export default pool;
