import { init } from "../../src/app.js";
import { disconnectDb } from "../../src/config/database.js";
import userFactory from "../factories/user.factory.js";
import { cleanDb } from "../helpers.js";

beforeEach(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await disconnectDb();
});

describe("Register test suite", () => {
  it("given email, password and confirmPassword, create user", async () => {
    const register = userFactory.createUserRegister();
    const response = await userFactory.registerUser(register);
    expect(response.statusCode).toStrictEqual(201);

    const user = await userFactory.findUser(register.email);
    expect(user?.email).toEqual(register.email);
  });

  it("create the user already registered", async () => {
    const register = userFactory.createUserRegister();
    await userFactory.registerUser(register);
    const response = await userFactory.registerUser(register);
    expect(response.statusCode).toStrictEqual(409);

    const user = await userFactory.findUser(register.email);
    expect(user?.email).toEqual(register.email);
  });

  it("given incorrect request body properties, return unprocessable entity", async () => {
    const response = await userFactory.registerUserWithIncorrectBody();

    expect(response.statusCode).toEqual(422);
  });
});

describe("Login test suite", () => {
  it("given email and password, log in and receive a token", async () => {
    const register = userFactory.createUserRegister();
    await userFactory.registerUser(register);
    const { statusCode, body } = await userFactory.loginUser(register);

    expect(statusCode).toStrictEqual(200);
    expect(body.token).not.toBeNull();

    const user = await userFactory.findUser(register.email);
    expect(user?.email).toEqual(register.email);
  });

  it("given incorrect request body properties, return unprocessable entity", async () => {
    const response = await userFactory.loginUserWithIncorrectBody();

    expect(response.statusCode).toEqual(422);
  });
});
