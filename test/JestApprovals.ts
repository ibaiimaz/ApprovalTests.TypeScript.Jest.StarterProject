import StringWriter from "approvals/lib/StringWriter";
import { getConfig, verifyWithControl } from "approvals";
import { Options } from "./Options";
import { getJestNamer } from "./JestNamer";


export function verify(sut: string, options?: Options) {
  const config = getConfig();
  config.reporters = ["diffmerge"];
  options = options || new Options()
  const writer = new StringWriter(config, sut, options.forFile().getFileExtension());
  verifyWithControl(getJestNamer(), writer, null, config);
}

export function verifyAsJson(data: any, options?: Options){
  const text = JSON.stringify(data, null, "  ");
  options = options || new Options()
  options = options.forFile().withFileExtention(".json")
  verify(text, options);
}