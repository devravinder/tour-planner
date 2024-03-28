import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
} from "react";

type PageActionsProps = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  dataCount: number;
  onPageChange: (index: number) => void;
  onPageSizeChange: (index: number) => void;
  pageSizeOptions: number[];
};

export default function PageActions({
  pageCount,
  pageIndex,
  pageSize,
  dataCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: PageActionsProps) {
  const gotoRef = useRef<HTMLInputElement>(null);
  const onGoto = (
    e:
      | FocusEvent<HTMLInputElement>
      | MouseEvent<HTMLInputElement>
      | KeyboardEvent<HTMLInputElement>,
  ) => {
    onPageChange(e.currentTarget.value ? Number(e.currentTarget.value) - 1 : 0);
  };

  useEffect(() => {
    if (gotoRef.current) gotoRef.current.value = `${pageIndex + 1}`;
  }, [pageIndex]);

  return (
    <div className="shadow-md flex items-center gap-2 border h-10 rounded-lg px-2">
      <div className=" flex items-center gap-1">
        Go to page:
        <input
          type="number"
          ref={gotoRef}
          min={1}
          max={pageCount}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onGoto(e);
            }
          }}
          onBlur={onGoto}
          onMouseUp={onGoto}
          className="rounded w-16 h-9 border-none border-gray-200 focus:bg-none  focus:border-none focus:ring-0"
        />
      </div>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className=" h-9 border-none focus:bg-none  focus:border-none focus:ring-0"
      >
        {pageSizeOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <span className="flex items-center gap-1">
        <div>of</div>
        <strong>{dataCount}</strong>
      </span>
    </div>
  );
}
