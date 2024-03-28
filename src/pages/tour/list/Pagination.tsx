import Icons from "components/icons";
import { HtmlHTMLAttributes, memo, useMemo } from "react";
import tw from "tailwind-styled-components";

type PaginationProps = {
  pages: number[];
  index: number;
  onChange?: (index: number) => void;
  className?: string;
};

export function Pagination({
  pages = [],
  onChange,
  index,
  className = "",
}: PaginationProps) {
  const setPage = (index: number) => {
    onChange?.(index);
  };
  const gotoFirst = () => {
    setPage(0);
  };

  const gotoLast = () => {
    setPage(pages.length - 1);
  };

  const gotoNext = () => {
    setPage(index + 1);
  };

  const gotoPrevious = () => {
    setPage(index - 1);
  };

  const visible = useMemo(() => {
    if (pages.length <= 3)
      return Array.from({ length: pages.length }, (_, i) => i);
    if (pages[index - 1] && pages[index + 1])
      return [index - 1, index, index + 1];

    if (!pages[index - 1]) return [index, index + 1, index + 2];
    if (!pages[index + 1]) return [index - 2, index - 1, index];

    return [0, 1, 2];
  }, [index, pages]);

  const [previousDisabled, nextDisabled] = useMemo(
    () => [index === 0, index === pages.length - 1],
    [index, pages],
  );

  return (
    <PaginationContainer className={className}>
      <PageButton
        className="rounded-l-lg"
        disabled={previousDisabled}
        onClick={gotoFirst}
      >
        <Icons.ChevronsLeft />
      </PageButton>
      <PageButton onClick={gotoPrevious} disabled={previousDisabled}>
        <Icons.ChevronLeft />
      </PageButton>
      {visible.map((i) => (
        <PageButton key={i} $active={i === index} onClick={() => setPage(i)}>
          {pages[i]}
        </PageButton>
      ))}
      <PageButton onClick={gotoNext} disabled={nextDisabled}>
        <Icons.ChevronRight />
      </PageButton>
      <PageButton
        className="rounded-r-lg"
        onClick={gotoLast}
        disabled={nextDisabled}
      >
        <Icons.ChevronsRight />
      </PageButton>
    </PaginationContainer>
  );
}

type PageButtoProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  $active?: boolean;
};

const activeClass =
  "text-primary border border-primary-400 bg-primary-light-100 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
const normalClass =
  "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

const PageButton = tw.button<PageButtoProps>`flex items-center justify-center px-4 h-10 leading-tight disabled:cursor-not-allowed ${(
  p,
) => (p.$active ? activeClass : normalClass)}`;

const PaginationContainer = tw.div`flex items-center -space-x-px h-10 text-sm`;

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Pagination);
