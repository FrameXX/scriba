import { marked } from "marked";
import { Processor } from "../processor";

export class MarkDownProcessor extends Processor {
  public process(sourceCode: string) {
    return marked.parse(sourceCode);
  }
}
