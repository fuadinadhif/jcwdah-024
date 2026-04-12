import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /api/users", () => {
  it("should return all users data", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: "Joko" },
      { id: 2, name: "Siti" },
    ]);
  });
});
