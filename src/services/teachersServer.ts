import { NOT_FOUND } from "../events/ErrosList.js";
import * as teachersRepository from "../repositories/teachersRepository.js";
import * as disciplinesRepository from "../repositories/disciplineRepository.js";

async function getTeachersByDiscipline(disciplineName: string) {
  const discipline = await disciplinesRepository.findByName(disciplineName);
  if (!discipline) {
    throw NOT_FOUND("Discipline not found");
  }

  return await teachersRepository.findAllByDiscipline(disciplineName);
}

const teachersServer = {
  getTeachersByDiscipline,
};

export default teachersServer;
