import {
  Next,
  Options,
  documentToHtmlString,
} from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Block, Document, Inline } from "@contentful/rich-text-types";
import { ReactNode } from "react";

import { RichText } from "../contentful/types";

export const richTextRenderOptions: Partial<Options> = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => `<strong>${text}</strong>`,
    [MARKS.ITALIC]: (text: ReactNode) => `<em>${text}</em>`,
    [MARKS.UNDERLINE]: (text: ReactNode) => `<u>${text}</u>`,
    [MARKS.CODE]: (text: ReactNode) =>
      `<code class="inline-code">${text}</code>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: Next) =>
      `<p class="mb-4">${children}</p>`,
    [BLOCKS.HEADING_1]: (node: any, children: Next) =>
      `<h1 class="text-4xl font-bold mb-4">${children}</h1>`,
    [BLOCKS.HEADING_2]: (node: any, children: Next) =>
      `<h2 class="text-3xl font-bold mb-3">${children}</h2>`,
    [BLOCKS.HEADING_3]: (node: any, children: Next) =>
      `<h3 class="text-2xl font-bold mb-2">${children}</h3>`,
    [BLOCKS.UL_LIST]: (node: any, children: Next) =>
      `<ul class="list-disc list-inside mb-4">${children}</ul>`,
    [BLOCKS.OL_LIST]: (node: any, children: Next) =>
      `<ol class="list-decimal list-inside mb-4">${children}</ol>`,
    [BLOCKS.LIST_ITEM]: (node: any, children: Next) =>
      `<li class="mb-1">${children}</li>`,
    [BLOCKS.QUOTE]: (node: any, children: Next) =>
      `<blockquote class="border-l-4 border-gray-300 pl-4 italic mb-4">${children}</blockquote>`,
  },
};

export function renderRichText(richText: RichText): string {
  return documentToHtmlString(richText.json, richTextRenderOptions);
}
