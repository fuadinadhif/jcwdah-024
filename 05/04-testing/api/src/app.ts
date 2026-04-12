import express from "express";

const app = express();

app.get("/api/users", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Joko" },
    { id: 2, name: "Siti" },
  ]);
});

const PORT = 8000;
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

export default app;
