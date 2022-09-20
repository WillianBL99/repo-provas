import userFactory from "../factories/user.factory";
import teachersFactory from "../factories/teachers.factory";
import { cleanDb } from "../helpers";

beforeEach(async () => {
  cleanDb();
});

describe("Teachers suite", () => {
  it("Get teachers by discipline name, ?disciplineName=HTML e CSS", async () => {
    const token = await userFactory.completLogin();
    const response = await teachersFactory.getTeachersByDisciplineName(
      token,
      "HTML e CSS"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body?.teachers).toBeDefined();
    expect(response.body?.teachers).not.toBeNull();
  });

  it("Get teachers by null discipline name, ?disciplineName=", async () => {
    const token = await userFactory.completLogin();
    const response = await teachersFactory.getTeachersByDisciplineName(
      token,
      ""
    );

    expect(response.statusCode).toEqual(422);
    expect(response.body?.teachers).toBeUndefined();
  });

  it("Get teachers by wrong discipline name, ?disciplineName=DisciplinaErrada", async () => {
    const token = await userFactory.completLogin();
    const response = await teachersFactory.getTeachersByDisciplineName(
      token,
      "DisciplinaErrada"
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body?.teachers).toBeUndefined();
  });
});
