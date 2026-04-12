# SETUP

1. npm init --y
2. npm i express
3. npm i -D typescript tsx @types/node @types/express vitest
4. npx tsc --init
5. Edit file package.json:

   ```json
   {
     "scripts": {
       "test": "vitest"
     },
     "type": "module",
     "dependencies": {
       "express": "^5.2.1"
     },
     "devDependencies": {
       "@types/express": "^5.0.6",
       "@types/node": "^25.5.0",
       "tsx": "^4.21.0",
       "typescript": "^6.0.2",
       "vitest": "^4.1.2"
     }
   }
   ```

6. Edit file tsconfig.json:

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

       // Recommended Options
       "strict": true,
       "skipLibCheck": true
     }
   }
   ```
