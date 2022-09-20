import { init } from "../../src/app";
import { disconnectDb } from "../../src/config/database";
import categoriesFactory from "../factories/categories.factory";
import userFactory from "../factories/user.factory";
import { cleanDb } from "../helpers";

beforeEach(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await disconnectDb();
});

describe("Categories suite", () => {
  it("Get categories", async () => {
    const token = await userFactory.completLogin();
    const response = await categoriesFactory.getCategories(token);

    expect(response.statusCode).toEqual(200);
    expect(response.body?.categories).toBeDefined();
    expect(response.body?.categories).not.toBeNull();
  });
});
