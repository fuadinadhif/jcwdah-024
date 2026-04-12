import express from "express";
const app = express();
app.get("/api/status", (req, res) => {
    res
        .status(200)
        .json({ message: "API is running!", uptime: process.uptime() });
});
const PORT = 8000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));
