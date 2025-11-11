"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Check, Copy } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";

type CodeBlockProps = {
  title?: string;
  titleIcon?: React.ReactNode;
  code?: string;
  language?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imageClassName?: string;
  caption?: string;
  titleAlign?: "center" | "left";
};

export function CodeBlock({
  title,
  titleIcon,
  code,
  language,
  imageSrc,
  imageAlt = "preview",
  caption,
  titleAlign = "center",
}: CodeBlockProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const isCopyable = Boolean(code && code.length > 0);

  const onCopy = async () => {
    if (!isCopyable || !code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied successfully!");
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  return (
    <div className="rounded-2xl bg-[#0d0f4a] border border-[#120D6A] p-4 h-auto">
      {(title || titleIcon || isCopyable) && (
        <div
          className={[
            "mb-3 grid items-center gap-2 px-1",
            "grid-cols-[1fr_auto_1fr]",
            titleAlign === "left" && "grid-cols-[auto_1fr_auto]",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {titleAlign === "center" ? <span /> : null}

          {(title || titleIcon) && (
            <span
              className={[
                "inline-flex text-sm items-center gap-2 tracking-[0.2em] text-[#a9acbf]",
                titleAlign === "center"
                  ? "justify-self-center"
                  : "justify-self-start",
              ].join(" ")}
            >
              {titleIcon ? (
                <span
                  className="[&>*]:h-4 [&>*]:w-4 [&>*]:text-[#FF6849]"
                  aria-hidden
                >
                  {titleIcon}
                </span>
              ) : null}
              {title ? <span>{title}</span> : null}
            </span>
          )}

          {isCopyable ? (
            <button
              type="button"
              onClick={onCopy}
              className="cursor-pointer justify-self-end inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-white hover:text-[#ff6849]"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          ) : (
            <span />
          )}
        </div>
      )}

      <div className="rounded-[10px] bg-[#120D6A] p-0">
        {code && (
          <SyntaxHighlighter
            language={language?.toLowerCase()}
            style={nightOwl}
            PreTag="div"
            customStyle={{
              background: "transparent",
              padding: 16,
              fontFamily: "var(--font-fira-code), monospace",
              fontSize: "clamp(12px, 0.9vw + 8px, 16px)",
              lineHeight: 1.6,
              margin: 0,
              border: "1px solid #0f2cab",
              borderRadius: 10,
            }}
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        )}

        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1500}
            height={800}
            className={["w-full h-auto rounded-md bg-[#0F2CAB] mt-4"]
              .filter(Boolean)
              .join(" ")}
            priority={false}
          />
        )}
      </div>

      {caption && (
        <p className="mt-2 text-center text-xs text-[#a9acbf]">{caption}</p>
      )}
    </div>
  );
}
