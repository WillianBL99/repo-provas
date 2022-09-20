import testFactory from "../factories/test.factory";
import userFactory from "../factories/user.factory";
import { cleanDb } from "../helpers";

beforeEach(async () => {
  await cleanDb();
});

describe("Test suite", () => {
  describe("Create test", () => {
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

  describe("Get tests", () => {
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
});
