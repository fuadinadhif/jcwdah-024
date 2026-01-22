import http from "node:http";
const app = http.createServer();
const PORT = 8000;
app.listen(PORT, () => {
    console.info(`Server is listening on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map