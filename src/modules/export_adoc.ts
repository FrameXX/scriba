export function exportAdoc(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/asciidoc" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
