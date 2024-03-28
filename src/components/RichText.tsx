import { ReactNode, createElement } from "react";

type RichTextProps = {
  htmlString?: string | ReactNode | null;
  element?: "span" | "div" | "p" | "pre" | "tr" | "td" | string;
  className?: string;
};
export default function RichText({
  htmlString,
  element = "span",
  className = "",
}: RichTextProps) {
  return createElement(element, {
    dangerouslySetInnerHTML: { __html: htmlString },
    className,
  });
}
