import { expect } from "@jest/globals";
import path from "path";
import Namer from "approvals/lib/Namer";

function convertToFilename(name: string) {
  const forbidden = "\\/:?\"<>|' ";
  for (let forbiddenKey of forbidden) {
    if (name.includes(forbiddenKey)) {
      name = name.replace(forbiddenKey, "_");
    }
  }
  return name;
}

export function getJestNamer() {
  const state = expect.getState();
  const file = path.parse(state.testPath as string);
  const testPath = file.dir;
  const testFileName = file.name;
  const testName = convertToFilename(`${testFileName}.${state.currentTestName}`);
  return new Namer(testPath, testName);
}