"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Check, Copy } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";
import clsx from "clsx";

type CodeBlockProps = {
  title?: string;
  code?: string;
  language?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imageClassName?: string;
  caption?: string;
};

export function CodeBlock({
  title,
  code,
  language,
  imageSrc,
  imageAlt = "preview",
  caption,
}: CodeBlockProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const isCopyable = Boolean(code && code.length > 0);

  const onCopy = async () => {
    if (!isCopyable) return;
    await navigator.clipboard.writeText(code!);
    setCopied(true);
    toast.success("Copied successfully!");
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative rounded-lg bg-[#0d0f4a] border border-[#120D6A] p-3">
      <div className="flex items-center justify-center relative px-2">
        {title ? (
          <span className="tracking-[0.2em] text-[#a9acbf]">{title}</span>
        ) : null}

        {isCopyable && (
          <button
            onClick={onCopy}
            className="absolute right-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-white hover:text-[#ff6849] cursor-pointer"
            aria-label="Copy"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
      </div>

      <div className="mt-3 rounded-lg overflow-hidden bg-[#120D6A]">
        {code ? (
          <SyntaxHighlighter
            language={language?.toLowerCase()}
            style={nightOwl}
            PreTag="div"
            customStyle={{
              background: "transparent",
              paddingInline: 20,
              fontSize: "clamp(0.75rem, 2vw + 0.5rem, 1rem)",
              fontFamily: "var(--font-fira-code), monospace",
              margin: 0,
              border: "1.2px solid #0f2cab",
              borderRadius: "11px",
              overflow: "hidden",
            }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        ) : null}

        {imageSrc ? (
          <div className="relative w-auto h-auto">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={700}
              sizes="100vw"
              className="w-full h-auto"
              priority={false}
            />
          </div>
        ) : null}
      </div>

      {caption ? (
        <p className="mt-2 text-center text-xs text-[#a9acbf]">{caption}</p>
      ) : null}
    </div>
  );
}
