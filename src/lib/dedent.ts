export function dedent(str: string) {
  const lines = str.replace(/^\n/, "").split("\n");
  const indents = lines
    .filter((l) => l.trim())
    .map((l) => l.match(/^(\s*)/)![1].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines
    .map((l) => l.slice(min))
    .join("\n")
    .replace(/\s+$/, "");
}
