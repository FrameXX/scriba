import { visit } from "unist-util-visit";
import type { Element, Text } from "hast";

export function rehypeInlineStem() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (!node.children) return;

      const newChildren = [];

      for (const child of node.children) {
        if (child.type === "text") {
          const textChild = child as Text;
          const regex = /\\\((.*?)\\\)/g;
          let lastIndex = 0;
          let match;

          while ((match = regex.exec(textChild.value)) !== null) {
            if (match.index > lastIndex) {
              newChildren.push({
                type: "text",
                value: textChild.value.slice(lastIndex, match.index),
              });
            }

            newChildren.push({
              type: "element",
              tagName: "span",
              properties: { className: ["language-math", "math-inline"] },
              children: [{ type: "text", value: match[1].trim() }],
            });

            lastIndex = regex.lastIndex;
          }

          if (lastIndex < textChild.value.length) {
            newChildren.push({
              type: "text",
              value: textChild.value.slice(lastIndex),
            });
          }
        } else {
          newChildren.push(child);
        }
      }

      node.children = newChildren as Element[];
    });
  };
}
