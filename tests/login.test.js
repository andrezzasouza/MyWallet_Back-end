import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';

describe('POST /login', () => {
  it('returns 200 for valid body', async () => {
    const body = {
      email: 'mayara2021@gmail.com',
      password: '123456'
    };

    const result = await supertest(app).post('/login').send(body);
    const { status } = result;
    expect(result.body).toEqual({
      token: expect.any(String),
      name: 'Mayara'
    });
    expect(status).toEqual(200);
  });

  it("returns 404 when user isn't found", async () => {
    const body = {
      email: 'mayara2@gmail.com',
      password: '123456'
    };

    const result = await supertest(app).post('/login').send(body);
    const { status } = result;
    expect(result.body).toEqual({
      message: 'Você ainda não tem uma conta. Clique abaixo para se cadastrar.'
    });
    expect(status).toEqual(404);
  });

  it('return 400 when body data is invalid', async () => {
    const body = {
      email: 'mayara2@gmail',
      password: '1234'
    };

    const result = await supertest(app).post('/login').send(body);
    const { status } = result;
    expect(result.body).toEqual({
      message: expect.any(String)
    });
    expect(status).toEqual(400);
  });

  it('return 401 when login data is invalid', async () => {
    const body = {
      email: 'mayara2021@gmail.com',
      password: '123457'
    };

    const result = await supertest(app).post('/login').send(body);
    const { status } = result;
    expect(result.body).toEqual({
      message: 'Combinação e-mail/senha incorreta. Tente novamente.'
    });
    expect(status).toEqual(401);
  });
});

afterAll(() => {
  connection.end();
});
