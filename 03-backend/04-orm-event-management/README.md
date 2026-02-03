# README

## Extension Requirement

1. Prisma from prisma.io

## Express + Prisma Setup Installation

1. `npm init --y`
2. Edit file `package.json`:

   ```json
   {
     "name": "04-orm-event-management",
     "version": "1.0.0",
     "scripts": {},
     "type": "module"
   }
   ```

3. `npm install express @prisma/client @prisma/adapter-pg dotenv`
4. `npm install -D typescript tsx prisma @types/express @types/node`
5. `npx prisma init`
6. Buat folder src
7. Edit file `schema.prisma`

   ```json
   generator client {
   provider = "prisma-client"
   output   = "../src/generated/prisma"
   }

   datasource db {
     provider = "postgresql"
   }

   enum Role {
     CUSTOMER
     EVENT_ORGANIZER
   }

   model User {
     id        Int      @id @default(autoincrement())
     name      String
     email     String   @unique
     password  String
     role      Role     @default(CUSTOMER)
     address   String?
     createdAt DateTime @default(now())
   }
   ```

8. Hubungkan prisma dengan database kita:
   a. Buat database postgresql baru di Supabase
   b. Ambil connection string database di Supabase dan copy/paste ke file `.env`
   c. Edit file `prisma.config.ts` dan ganti `DATABASE_URL` ke `DIRECT_URL`
9. `npx prisma migrate dev --name "[MIGRATION_NAME]"`
10. Buat folder `src`
11. `npx prisma generate`
12. Buat file `src/lib/prisma.ts` untuk connect ke prisma:

    ```typescript
    import "dotenv/config";
    import { PrismaPg } from "@prisma/adapter-pg";
    import { PrismaClient } from "../generated/prisma/client";

    const connectionString = `${process.env.DATABASE_URL}`;

    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    export { prisma };
    ```

13. `npx tsc --init`
14. Edit file `tsconfig.json`

    ```json
    {
      // ...
      "rootDir": ".",
      "outDir": "./dist",
      // ...
      // For nodejs:
      "lib": ["esnext"],
      "types": ["node"]
    }
    ```

15. Edit file `package.json` dan tambahkan script dev, build, dan start untuk menjalankan program:
    ```json
    "scripts": {
      "build": "tsc",
      "dev": "tsx --watch src/app.ts",
      "start": "npm run build && node dist/app.js"
    }
    ```
16. Buat file `src/app.ts` dan mulai buat server backend kita
