import disciplinesFactory from "../factories/disciplines.factory";
import userFactory from "../factories/user.factory";
import { cleanDb } from "../helpers";

beforeEach(async () => {
  cleanDb();
});

describe("Disciplines suite", () => {
  it("Get disciplines by category name, ?categoryName=Projeto", async () => {
    const token = await userFactory.completLogin();
    const response = await disciplinesFactory.getDisciplinesByCategoryName(
      token,
      "Projeto"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body?.disciplines).toBeDefined();
    expect(response.body?.disciplines).not.toBeNull();
  });

  it("Get disciplines by null category name, ?categoryName=", async () => {
    const token = await userFactory.completLogin();
    const response = await disciplinesFactory.getDisciplinesByCategoryName(
      token,
      ""
    );

    expect(response.statusCode).toEqual(422);
    expect(response.body?.disciplines).toBeUndefined();
  });

  it("Get disciplines by wrong category name, ?categoryName=CategoriaErrada", async () => {
    const token = await userFactory.completLogin();
    const response = await disciplinesFactory.getDisciplinesByCategoryName(
      token,
      "CategoriaErrada"
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body?.disciplines).toBeUndefined();
  });
});
