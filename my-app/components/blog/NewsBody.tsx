import type { NewsBlock } from "@/sanity/types";

interface NewsBodyProps {
  blocks?: NewsBlock[];
  fallback: string;
}

function blockText(block: NewsBlock) {
  return block.children?.map((child) => child.text || "").join("") || "";
}

export function NewsBody({ blocks, fallback }: NewsBodyProps) {
  if (!blocks?.length) {
    return <p>{fallback}</p>;
  }

  return (
    <>
      {blocks.map((block) => {
        const text = blockText(block);

        if (!text) return null;

        if (block.style === "h2") {
          return <h2 className="text-[32px] my-[42px] mx-0 mb-4 text-blue font-800" key={block._key}>{text}</h2>;
        }

        if (block.style === "h3") {
          return <h3 className="text-[24px] my-8 mx-0 mb-3 text-blue font-800" key={block._key}>{text}</h3>;
        }

        if (block.listItem) {
          return (
            <ul className="my-6 mx-0 pl-5 list-disc" key={block._key}>
              <li className="mb-3">{text}</li>
            </ul>
          );
        }

        return <p key={block._key}>{text}</p>;
      })}
    </>
  );
}
