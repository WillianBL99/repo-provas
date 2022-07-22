import * as teachersRepository from "../repositories/teachersRepository.js";
import * as categoryRepository from "../repositories/categoriesRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as testsRepository from "../repositories/testsRepository.js";

import { TestSchema } from "../schemas/testsSchema.js";
import * as errosList from "../events/ErrosList.js";

async function create(testData: TestSchema) {
  const { category, discipline, teacherName } = testData;
  const findTeacher = await teachersRepository.findByName(teacherName);
  if (!findTeacher) {
    throw errosList.NOT_FOUND("Teacher not found");
  }

  const findCategory = await categoryRepository.findByName(category);
  if (!findCategory) {
    throw errosList.NOT_FOUND("Category not found");
  }

  const findDiscipline = await disciplineRepository.findByName(discipline);
  if (!findDiscipline) {
    throw errosList.NOT_FOUND("Discipline not found");
  }

  const relationData = {
    disciplineId: findDiscipline.id,
    teacherId: findTeacher.id,
  };

  let relationshipTeachDiscipline =
    await teachersRepository.findRelationshipTeachDiscipline(relationData);

  if (!relationshipTeachDiscipline) {
    relationshipTeachDiscipline =
      await teachersRepository.createRelationshipTeachDiscipline(relationData);
  }

  await testsRepository.create({
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: findCategory.id,
    teacherDisciplineId: relationshipTeachDiscipline.id,
  });
}

const testService = {
  create,
};

export default testService;
