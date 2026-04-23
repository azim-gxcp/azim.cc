import "dotenv/config";
import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "../src/db/schema.js";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || "Admin";

if (!email || !password) {
  console.error("Usage: tsx scripts/seed.ts <email> <password> [name]");
  console.error("Example: tsx scripts/seed.ts admin@azim.cc mypassword 'M Azim'");
  process.exit(1);
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

const hash = await bcrypt.hash(password, 12);

try {
  const [user] = await db
    .insert(users)
    .values({
      email,
      name,
      passwordHash: hash,
      role: "admin",
    })
    .onConflictDoUpdate({
      target: users.email,
      set: { passwordHash: hash, role: "admin", name },
    })
    .returning({ id: users.id, email: users.email });

  console.log(`Admin user created/updated: ${user.email} (${user.id})`);
} catch (err) {
  console.error("Failed to seed admin user:", err);
  process.exit(1);
} finally {
  await client.end();
}
