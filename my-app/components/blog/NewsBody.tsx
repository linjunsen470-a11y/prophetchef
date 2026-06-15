import type { NewsBlock } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";

interface NewsBodyProps {
  blocks?: NewsBlock[];
  fallback: string;
}

export function NewsBody({ blocks, fallback }: NewsBodyProps) {
  if (!blocks?.length) {
    return <p>{fallback}</p>;
  }

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => (
        <h2 className="text-[32px] my-[42px] mx-0 mb-4 text-[color:var(--blue)] font-extrabold" key={value?._key}>
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 className="text-[24px] my-8 mx-0 mb-3 text-[color:var(--blue)] font-extrabold" key={value?._key}>
          {children}
        </h3>
      ),
      normal: ({ children }) => <p>{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="my-6 mx-0 pl-5 list-disc">{children}</ul>,
      number: ({ children }) => <ol className="my-6 mx-0 pl-5 list-decimal">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-3">{children}</li>,
      number: ({ children }) => <li className="mb-3">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => {
        const href = value?.href || "";
        const isExternal = !href.startsWith("/") && !href.startsWith("#");
        return (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-[color:var(--orange)] hover:text-[color:var(--orange-dark)] hover:underline font-extrabold transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  // Cast blocks to resolve type compatibility without using "any"
  const portableTextValue = blocks as unknown as Parameters<typeof PortableText>[0]["value"];

  return <PortableText value={portableTextValue} components={components} />;
}
