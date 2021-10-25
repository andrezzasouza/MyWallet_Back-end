import connection from "../src/database/database.js";
import app from "../src/app.js";
import supertest from "supertest";

describe("POST /sign-up", () => {
  beforeAll( async () => {
    await connection.query(`DELETE FROM users WHERE email = $1`, [
      "mayara2021@gmail.com",
    ]);
  });

  it("returns 201 for valid body", async () => {
    const body = {
      name: 'Mayara',
      email: 'mayara2021@gmail.com',
      password: '123456',
      repeatPassword: '123456',
    };

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });

  it("returns 409 when user already exists", async () => {
    const body = {
      name: "Mayara",
      email: "mayara2021@gmail.com",
      password: "123456",
      repeatPassword: "123456",
    };

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    
    expect(result.body).toEqual({
      message: "Você já tem uma conta. Faça o login, por favor.",
    });

    expect(status).toEqual(409);
  });

  it("returns 400 when body is filled correctly", async () => {
    const body = {
      name: "M",
      email: "mayara2021@gmail",
      password: "12345"
    };

    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(result.body).toEqual({
      message: expect.any(String),
    });
    expect(status).toEqual(400);
  });
});

describe("POST /login", () => {
  it("returns 200 for valid body", async () => {
    const body = {
      email: 'mayara2021@gmail.com',
      password: '123456'
    };

    const result = await supertest(app).post("/login").send(body);
    const status = result.status;
    expect(result.body).toEqual({
      token: expect.any(String),
      name: "Mayara",
    });
    expect(status).toEqual(200);
  });

  it("returns 404 when user isn't found", async () => {
    const body = {
      email: 'mayara2@gmail.com',
      password: '123456'
    };

    const result = await supertest(app).post("/login").send(body);
    const status = result.status;
    expect(result.body).toEqual({
      message: "Você ainda não tem uma conta. Clique abaixo para se cadastrar.",
    });
    expect(status).toEqual(404);
  });

  it("return 400 when body data is invalid", async () => {
    const body = {
      email: "mayara2@gmail",
      password: "1234",
    };

    const result = await supertest(app).post("/login").send(body);
    const status = result.status;
    expect(result.body).toEqual({
      message: expect.any(String),
    });
    expect(status).toEqual(400);
  })

  it("return 401 when body data is invalid", async () => {
    const body = {
      email: "mayara2021@gmail.com",
      password: "123457",
    };

    const result = await supertest(app).post("/login").send(body);
    const status = result.status;
    expect(result.body).toEqual({
      message: 'Incorrect email and/or password.',
    });
    expect(status).toEqual(401);
    
  })
});

afterAll(() => {
  connection.end();
});