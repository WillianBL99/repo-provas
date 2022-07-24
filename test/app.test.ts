import userFactory from "./factories/user.factory.js";
import testFactory from "./factories/test.factory.js";
import categoriestFactory from "./factories/categories.factory.js";

beforeEach(async () => {
  await userFactory.deleteUsers();
  await testFactory.deleteTests();
});

afterAll(async () => {
  await userFactory.deleteUsers();
  await testFactory.deleteTests();
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

describe("Create test suite", () => {
  it("given the test information, persist test", async () => {
    const token = await userFactory.completLogin();
    const testData = testFactory.createTestData({});

    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTest(testData, token);
    expect(response.statusCode).toEqual(201);

    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount + 1);
  });

  it("given non-existent category, return not found", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({ category: "adfjakk" });
    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTest(testData, token);

    expect(response.statusCode).toEqual(404);
    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount);
  });

  it("given non-existent discipline, return not found", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({ discipline: "adfjakk" });
    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTest(testData, token);

    expect(response.statusCode).toEqual(404);
    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount);
  });

  it("given non-existent teacher, return not found", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({ teacherName: "adfjakk" });
    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTest(testData, token);

    expect(response.statusCode).toEqual(404);
    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount);
  });

  it("given incorrect request body properties, return unprocessable entity", async () => {
    const token = await userFactory.completLogin();

    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTestWhitIncorrectBody(token);

    expect(response.statusCode).toEqual(422);
    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount);
  });

  it("given non-existent teacher in a discipline, return business rule broke", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({
      category: "Projeto",
      discipline: "HTML e CSS",
      teacherName: "Paulo Uilian",
    });
    const oldCount = await testFactory.countTests();
    const response = await testFactory.postTest(testData, token);

    expect(response.statusCode).toEqual(403);
    const currentCount = await testFactory.countTests();
    expect(currentCount).toEqual(oldCount);
  });
});

describe("Get tests suite", () => {
  it("given the 'groupBy=disciplines' parameter by query strings. group all the tests", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({});
    await testFactory.postTest(testData, token);

    const response = await testFactory.getTestsGroupBy("disciplines", token);
    expect(response.body.tests).not.toBeNull();
  });

  it("given the 'groupBy=teachers' parameter by query strings. group all the tests", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({});
    await testFactory.postTest(testData, token);

    const response = await testFactory.getTestsGroupBy("teachers", token);
    expect(response.body.tests).not.toBeNull();
    expect(response.body.tests.length).not.toBe(0);
  });

  it("given the 'groupBy=jklkj' parameter by query strings. group all the tests", async () => {
    const token = await userFactory.completLogin();

    const testData = testFactory.createTestData({});
    await testFactory.postTest(testData, token);

    const response = await testFactory.getTestsGroupBy("jklkj", token);
    expect(response.statusCode).toBe(422);
    expect(response.body.tests).toBeUndefined();
  });
});

describe("Categories suite", () => {
  it("Get categories", async () => {
    const token = await userFactory.completLogin();
    const response = await categoriestFactory.getCategories(token);

    expect(response.statusCode).toEqual(200);
    expect(response.body?.categories).toBeDefined();
    expect(response.body?.categories).not.toBeNull();
  });
});
