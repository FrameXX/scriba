import { visit } from "unist-util-visit";
import type { Element } from "hast";

export function rehypeStemBlock() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "div" &&
        node.properties?.className?.includes("stemblock")
      ) {
        const contentDiv = node.children.find(
          (child: Element) => child.tagName === "div",
        );
        const mathText = contentDiv?.children[0]?.value || "";

        const cleanMath = mathText
          .trim()
          .replace(/^\\+\[/, "")
          .replace(/\\+\]$/, "")
          .trim();

        node.tagName = "div";
        node.properties = { className: ["math", "math-display"] };
        node.children = [
          {
            type: "element",
            tagName: "code",
            properties: { className: ["language-math"] },
            children: [{ type: "text", value: cleanMath }],
          },
        ];
      }
    });
  };
}
