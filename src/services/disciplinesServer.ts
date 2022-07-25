import { NOT_FOUND } from "../events/ErrosList.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import * as disciplinesRepository from "../repositories/disciplineRepository.js";

async function getDisciplinesByCategoryName(categoryName: string) {
  const category = await categoriesRepository.findByName(categoryName);
  if (!category) {
    throw NOT_FOUND("Category not found");
  }
  return await disciplinesRepository.findAllByCategory(categoryName);
}

const disciplinesServer = {
  getDisciplinesByCategoryName,
};

export default disciplinesServer;
