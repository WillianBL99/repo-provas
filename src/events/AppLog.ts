import chalk from "chalk";
import Types from "../interfaces/index.js";

const types: Types = {
  Middleware: "magenta",
  Controller: "green",
  Repository: "blue",
  Server: "yellow",
  Service: "cyan",
  Error: "red",
};

const AppLog = (
  type:
    | "Middleware"
    | "Controller"
    | "Repository"
    | "Server"
    | "Service"
    | "Error",
  text: string | any
) => {
  const color = types[type] as
    | "green"
    | "magenta"
    | "blue"
    | "yellow"
    | "cyan"
    | "red";
  console.log(chalk.bold[color](`[${type}] ${text}`));
  if (text.detail) {
    console.log(text.detail);
  }
};

export default AppLog;
