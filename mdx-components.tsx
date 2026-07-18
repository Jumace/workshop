import type { MDXComponents } from "mdx/types";

import { Callout, ContentLinkCard, DemoFrame, LinkCard } from "@/components/mdx/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    ContentLinkCard,
    DemoFrame,
    LinkCard,
    ...components,
  };
}
