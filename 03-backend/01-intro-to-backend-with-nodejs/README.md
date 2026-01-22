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
