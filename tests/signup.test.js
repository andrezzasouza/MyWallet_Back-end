import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';

describe('POST /sign-up', () => {
  beforeAll(async () => {
    await connection.query(`DELETE FROM users WHERE email = $1`, [
      'mayara2021@gmail.com'
    ]);
  });

  it('returns 201 for valid body', async () => {
    const body = {
      name: 'Mayara',
      email: 'mayara2021@gmail.com',
      password: '123456',
      repeatPassword: '123456'
    };

    const result = await supertest(app).post('/sign-up').send(body);
    const { status } = result;
    expect(status).toEqual(201);
  });

  it('returns 409 when user already exists', async () => {
    const body = {
      name: 'Mayara',
      email: 'mayara2021@gmail.com',
      password: '123456',
      repeatPassword: '123456'
    };

    const result = await supertest(app).post('/sign-up').send(body);
    const { status } = result;

    expect(result.body).toEqual({
      message: 'Você já tem uma conta. Faça o login, por favor.'
    });

    expect(status).toEqual(409);
  });
  it('returns 400 when body is filled incorrectly', async () => {
    const body = {
      name: 'M',
      email: 'mayara2021@gmail',
      password: '12345'
    };

    const result = await supertest(app).post('/sign-up').send(body);
    const { status } = result;
    expect(result.body).toEqual({
      message: expect.any(String)
    });
    expect(status).toEqual(400);
  });
});

afterAll(() => {
  connection.end();
});
