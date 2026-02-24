# NOTES

## Source (SRC) Folder Structure

1. `app.ts`: Entry point
2. `./controllers`: Folder untuk kode yang berurusan langsung dengan Request/Response HTTP
3. `./services`: Folder untuk kode bussiness logic/kode yang bersentuhan dengan Prisma secara langsung
4. `./routes`: Folder untuk kode yang berkaitan dengan path url/endpoint API
5. `./lib`: Folder untuk kode configurasi ke service eksternal

## Express Flow

Request (Client) (App.ts)
↓
Route (URL matcher)
↓
Controller (traffic police)
↓
Service (business worker)
↓
Database
