import type { Document } from "@asciidoctor/core";

export abstract class Processor {
  public abstract process(
    sourceCode: string,
  ): string | Promise<string> | Document;
}
