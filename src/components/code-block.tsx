"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";

export function CodeBlock({
  title,
  code,
  language,
}: {
  title?: string;
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied successfully!");
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative rounded-lg bg-[#0d0f4a] border border-[#120D6A] p-3">
      <div className="flex items-center justify-center relative px-2">
        <span className="tracking-[0.2em] text-[#a9acbf]">{title}</span>
        <button
          onClick={onCopy}
          className="absolute right-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-white hover:text-[#ff6849] cursor-pointer"
          aria-label="Copy"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="mt-3 rounded-lg overflow-hidden border border-[#0f2cab] bg-[#120D6A]">
        <SyntaxHighlighter
          language={language?.toLowerCase()}
          style={nightOwl}
          PreTag="div"
          customStyle={{
            background: "transparent",
            paddingInline: 20,
            fontSize: "1.125rem",
            fontFamily: "var(--font-fira-code), monospace",
            margin: 0,
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
