import http from "node:http";

const app = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/api/status" && method === "GET") {
    response.writeHead(200, { "content-type": "application/json" });
    response.write(
      JSON.stringify({ message: "API is running!", uptime: process.uptime() }),
    );
    response.end();
  } else if (url === "/api/articles" && method === "GET") {
    response.writeHead(200, { "content-type": "application/json" });
    response.write(
      JSON.stringify([
        { id: 1, title: "First Article" },
        { id: 2, title: "Second Article" },
      ]),
    );
    response.end();
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.write("<p>404 Not Found</p>");
    response.end();
  }
});
const PORT: number = 8000;

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});
