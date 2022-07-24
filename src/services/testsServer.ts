import * as teachersRepository from "../repositories/teachersRepository.js";
import * as categoryRepository from "../repositories/categoriesRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as testsRepository from "../repositories/testsRepository.js";

import { TestSchema } from "../schemas/testsSchema.js";
import * as errosList from "../events/ErrosList.js";

export type RealtionData = {
  disciplineId: number;
  teacherId: number;
};

export type GroupBy = {
  groupBy: "teachers" | "disciplines";
};

async function create(testData: TestSchema) {
  const {
    category: categoryName,
    discipline: disciplineName,
    teacherName,
  } = testData;

  const teacher = await findTeacher(teacherName);
  const category = await findCategory(categoryName);
  const discipline = await findDiscipline(disciplineName);

  const relationData = {
    disciplineId: discipline.id,
    teacherId: teacher.id,
  };

  const relation = await findOrCreateRealationship(relationData);

  await testsRepository.create({
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: relation.id,
  });
}

const groupTestsBy = {
  teachers: async () => await testsRepository.findGroupByTeacher(),
  disciplines: async () => await testsRepository.findGroupByDisciplinies(),
};

async function getTests({ groupBy }: GroupBy) {
  const functionGetTest = groupTestsBy[groupBy];
  return await functionGetTest();
}

async function findTeacher(name: string) {
  const teacher = await teachersRepository.findByName(name);
  if (!teacher) {
    throw errosList.NOT_FOUND("Teacher not found");
  }
  return teacher;
}

async function findCategory(name: string) {
  const category = await categoryRepository.findByName(name);
  if (!category) {
    throw errosList.NOT_FOUND("Category not found");
  }
  return category;
}

async function findDiscipline(name: string) {
  const discipline = await disciplineRepository.findByName(name);
  if (!discipline) {
    throw errosList.NOT_FOUND("Discipline not found");
  }
  return discipline;
}

async function findOrCreateRealationship(relationData: RealtionData) {
  const relation = await teachersRepository.findRelationshipTeachDiscipline(
    relationData
  );

  if (!relation) {
    throw errosList.BUSINESS_RULE_BROKE("Teacher not found in this discipline");
  }

  return relation;
}

const testService = {
  create,
  getTests,
};

export default testService;
