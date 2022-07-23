import * as categoriesRepository from "../repositories/categoriesRepository.js";

async function getCategories() {
  return categoriesRepository.find();
}

const categoriesServer = {
  getCategories,
};

export default categoriesServer;
