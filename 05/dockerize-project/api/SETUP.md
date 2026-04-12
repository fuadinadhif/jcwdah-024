# SETUP

## GENERAL SETUP

1. `npm init --y`: inisiasi file `package.json`
2. `npm i express cors`: install reguler dependencies
3. `npm i -D tsx typescript @types/express @types/node @types/cors`: install development dependencies
4. `npx tsc --init`: inisiasi/membuat file `tsconfig.json`
5. `mkdir src`: membuat folder `src`
6. `touch src/app.ts`: membuat file `app.ts` di dalam folder `src`
7. Edit file `package.json`:

   ```json
   {
     "scripts": {
       "build": "tsc",
       "dev": "tsx --watch src/app.ts",
       "start": "npm run build && node dist/app.js"
     },
     "type": "module",
     "dependencies": {
       "cors": "^2.8.6",
       "express": "^5.2.1"
     },
     "devDependencies": {
       "@types/cors": "^2.8.19",
       "@types/express": "^5.0.6",
       "@types/node": "^25.5.2",
       "tsx": "^4.21.0",
       "typescript": "^6.0.2"
     }
   }
   ```

8. Edit file `tsconfig.json`:

   ```json
   {
     // Visit https://aka.ms/tsconfig to read more about this file
     "compilerOptions": {
       // File Layout
       "rootDir": "./src",
       "outDir": "./dist",

       // Environment Settings
       "module": "nodenext",
       "target": "esnext",
       "lib": ["esnext"],
       "types": ["node"],

       // Stricter Typechecking Options
       "noUncheckedIndexedAccess": true,
       "exactOptionalPropertyTypes": true,

       // Recommended Options
       "strict": true,
       "skipLibCheck": true
     }
   }
   ```

## DOCKER SETUP

1. `touch Dockerfile`
2. Edit `Dockerfile`:

   ```yml
   FROM node:24

   WORKDIR /app

   COPY package*.json .

   RUN npm install

   COPY . .

   EXPOSE 8000

   CMD ["npm", "start"]
   ```

3. `docker image ls`: menampilkan docker image yang ada di dalam komputer
4. `docker ps -a`: menampilkan semua docker container di dalam komputer
5. `docker build -t [DOCKER_IMAGE_NAME] .`: membuat docker image dari Dockerfile yang tersedia
6. `docker run -d -p 8000:8000 [DOCKER_IMAGE_NAME]`: menjalankan docker image
7. `docker compose up --build`
