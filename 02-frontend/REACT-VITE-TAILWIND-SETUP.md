# REACT VITE TAILWIND SETUP

## REACT VITE

1. Siapkan satu folder kosong
2. Buka terminal dan arahkan ke folder yang baru dibuat
3. Masukkan perintah `npm create vite@latest .` ke terminal yang sudah dibuka
4. Install react:
   - Framework: React
   - Variant: TypeScript + React Compiler
   - Rolldown-vite: No
   - Install with npm and start now: Yes

## TAILWIND

1. Buka terminal dan jalankan perintah `npm install tailwindcss @tailwindcss/vite`
2. Edit file `vite.config.ts` dan masukkan konfigurasi tailwindcss (lihat docs)
3. Tambah kode `@import "tailwindcss";` di file CSS global (hapus semua kode selain `@import "tailwindcss";`)
4. (Recommended) Hapus file `App.css`
5. Enjoy the coding process!
