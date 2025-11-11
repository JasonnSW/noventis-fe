export function dedent(raw: string): string {
  if (!raw) return "";

  const lines = raw.replace(/\r\n?/g, "\n").split("\n");

  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

  const indentLengths = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^(\s*)/)?.[1].length ?? 0);

  const minIndent = indentLengths.length ? Math.min(...indentLengths) : 0;

  const result = lines
    .map((line) => line.slice(minIndent))
    .join("\n")
    .replace(/\s+$/g, "");

  return result;
}
