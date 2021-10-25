import connection from "../src/database/database.js";
import app from "../src/app.js";
import supertest from "supertest";

describe("POST /sign-up", () => {
  it("", async () => {
    const status = result.status;
    expect(status).toEqual();
  })
});

describe("POST /login", () => {
  it("", async () => {
    const status = result.status;
    expect(status).toEqual();
  })
});

describe("GET /home", () => {
  it("", async () => {
    const status = result.status;
    expect(status).toEqual();
  })
});

describe("POST /entry", () => {
  it("", async () => {
    const status = result.status;
    expect(status).toEqual();
  })
});

afterAll(() => {
  connection.end();
});