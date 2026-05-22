import { Processor } from "../processor";
import createAsciidctor, { type Asciidoctor } from "@asciidoctor/core";

export class AsciiDocProcessor extends Processor {
  private readonly asciiDoctor: Asciidoctor;

  constructor() {
    super();
    this.asciiDoctor = createAsciidctor();
  }

  public process(sourceCode: string) {
    return this.asciiDoctor.convert(sourceCode, {
      safe: "safe",
      attributes: { showtitle: true, stem: "latexmath" },
    });
  }
}
