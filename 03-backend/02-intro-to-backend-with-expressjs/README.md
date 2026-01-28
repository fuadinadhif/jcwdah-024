# README

## Node.js Server Setup

1. `npm init --y`
2. Ubah `type` property di file `package.json` menjadi `module`
3. `npm i -D typescript tsx @types/node`: Menambah development dependencies/packages
4. Buat folder `src`
5. Buat file `app.ts` di dalam folder `src`
6. Isi/lengkapi kode di dalam file `app.ts`
7. Tambah script `dev` di dalam file `package.json`:
   ```json
   "scripts": {
    "dev": "tsx src/app.ts"
   }
   ```
8. `npx tsc --init`: Membuat default konfigurasi file typescript (`tsconfig.ts`)
9. Aktifkan `rootDir`, `Outdir`, `lib`, dan `types` property di dalam file `tsconfig.ts`
10. Tambah script `build` dan `start` di file `package.json`:
    ```json
       "scripts": {
       "build": "tsc",
       "start": "npm run build && node dist/app.js"
       },
    ```

## Express Server Setup

1.  `npm init --y`
2.  Ubah `type` property di file `package.json` menjadi `module`
3.  `npm i -D typescript tsx @types/node @types/express`: Menambah development dependencies/packages
4.  Buat folder `src`
5.  Buat file `app.ts` di dalam folder `src`
6.  Isi/lengkapi kode di dalam file `app.ts`

    ```typescript
    import express, {
      type Request,
      type Response,
      type Application,
    } from "express";

    const app: Application = express();
    const PORT: number = 8000;

    app.get("/api/status", (request: Request, response: Response) => {
      response
        .status(200)
        .json({ message: "API is running!", uptime: process.uptime() });
    });

    app.listen(PORT, () =>
      console.info(`Server is listening on port: ${PORT}`),
    );
    ```

7.  Tambah script `dev` di dalam file `package.json`:
    ```json
    "scripts": {
     "dev": "tsx --watch src/app.ts"
    }
    ```
8.  `npx tsc --init`: Membuat default konfigurasi file typescript (`tsconfig.ts`)
9.  Aktifkan `rootDir`, `Outdir`, `lib`, dan `types` property di dalam file `tsconfig.ts`
10. Tambah script `build` dan `start` di file `package.json`:
    ```json
       "scripts": {
       "build": "tsc",
       "start": "npm run build && node dist/app.js"
       },
    ```
11. Install express `npm i express`
12. Buat file `.gitignore` dan ignore folder `node_modules`, `dist`, dan file `.env`
    ```json
      node_modules
      dist
      .env
    ```
13. `npm i pg`: Install package untuk connect ke potgres database
14. `npm i -D @types/pg`: Install types untuk package `pg`
