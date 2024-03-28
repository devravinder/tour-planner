import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingFn,
  getPaginationRowModel,
  Row,
  getFilteredRowModel,
  CellContext,
  ColumnFiltersState,
  FilterFn,
  ColumnSort,
} from "@tanstack/react-table";
import { Chip } from "components/Chip";
import RichText from "components/RichText";
import { useMemo } from "react";
import { TourStatus } from "services/tourService";
import { Table, Thead, Tr, Th, Tbody, Td } from "./styles";
import Icons from "components/icons";

type ViewElement = number | string | JSX.Element;
export type RenderCell<T> = (data: T) => JSX.Element;
export type CellValues<T> = (data: T) => {
  title: ViewElement;
  desc?: ViewElement;
  isMain?: boolean;
};
export type Sort<T extends object> = { id: keyof T; desc?: boolean };

export type TableColum<T extends object> = {
  header?: string;
  id: keyof T;
  accessorFn: (data: T) => ViewElement;
  sortingFn?: SortingFn<T>;
  filterFn?: FilterFn<T>;
} & (
  | {
      renderCell: RenderCell<T>;
    }
  | {
      values: CellValues<T>;
    }
);

type ListTableProps<T extends object> = {
  data: T[];
  sort?: Sort<T>[];
  columns: TableColum<T>[];
  globalFilter?: string;
  pageSize?: number;
  globalFilterFn?: (
    row: Row<T>,
    columnId: string,
    filterValue: string,
  ) => boolean;
  columnFilters?: ColumnFiltersState;

  //===
  showHeader?: boolean;
  showFooter?: boolean;
  onRowClick: (data: T) => void;
};
const PAGE_SIZE = 10;

export default function ListTable<T extends object>(props: ListTableProps<T>) {
  const {
    data: tableData,
    columns: tableColumns,
    sort,
    globalFilter = "",
    pageSize = PAGE_SIZE,
    globalFilterFn,
    columnFilters,
    onRowClick,
  } = props;
  const data = useMemo(() => tableData, [tableData]);

  const columns: ColumnDef<T>[] = useMemo(() => {
    const res = tableColumns.map((col) => ({
      header: col.header,
      id: col.id as string,
      accessorFn: col.accessorFn,
      filterFn: col.filterFn,
      cell: extract<T>((data) => {
        if ("renderCell" in col) return col.renderCell(data);
        const { title, desc, isMain } = col.values(data);
        return <TableCell title={title} desc={desc} isMain={isMain} />;
      }),
    }));
    return res;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    state: { globalFilter, columnFilters },
    pageCount: Math.ceil(data.length / pageSize),
    initialState: {
      sorting: sort as unknown as ColumnSort[],
      pagination: {
        pageSize,
      },
    },
  });

  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    <Table>
      <Thead>
        {getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((columnGroup) => (
              <Th
                key={columnGroup.id}
                onClick={columnGroup.column.getToggleSortingHandler()}
              >
                <div className="flex items-center cursor-pointer">
                  {flexRender(
                    columnGroup.column.columnDef.header,
                    columnGroup.getContext(),
                  )}
                  {columnGroup.column.getIsSorted() ? (
                    <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                      {columnGroup.column.getIsSorted() === "asc" ? (
                        <Icons.ChevronUp />
                      ) : (
                        <Icons.ChevronDown />
                      )}
                    </span>
                  ) : undefined}
                </div>
              </Th>
            ))}
            <Th></Th>
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            onClick={() => onRowClick(row.original)}
            className="last:border-none hover:bg-gray-100 cursor-pointer"
          >
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id} className="py-3 px-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
            <Td>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                tabIndex={0}
                className=" relative group w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200"
              >
                <Icons.ThreeDotsVertical />
                <div className="absolute right-[100%] z-10 invisible group-focus:visible">
                  <span className="absolute border-t border-r w-4 h-4 rounded-sm right-0 top-[42%] translate-x-2 rotate-45 bg-white "></span>
                  <div className="relative bg-white rounded-md border-t border-b border-l shadow-[0px 8px 10px gray, -10px 8px 15px gray, 10px 8px 15px gray]">
                    <div className="z-20 border-b py-2 px-2 hover:bg-gray-100 flex flex-row gap-2 items-center">
                      <Icons.Trash className="w-5 h-5 text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </div>
                    <div className="z-20 border-b py-2 px-2 hover:bg-gray-100 flex flex-row gap-2 items-center">
                      <Icons.Edit className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400">Edit</span>
                    </div>
                    <div className="z-20 py-2 px-2 hover:bg-gray-100 flex flex-row gap-2 items-center">
                      <Icons.CopyOutline className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Clone</span>
                    </div>
                  </div>
                </div>
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const TableCell = ({
  title,
  desc,
}: {
  title: string | number | JSX.Element;
  desc?: string | number | JSX.Element;
  isMain?: boolean;
}) => {
  return (
    <div>
      <p className="text-gray-900">{title}</p>
      <p className="line-clamp-1 text-gray-400 text-sm ">{desc} </p>
    </div>
  );
};
export const TitleCell = ({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) => {
  return (
    <div>
      <p className="text-primary-dark">{title}</p>
      <p className="line-clamp-1 text-gray-400 text-sm ">
        <RichText className="styles-unset" htmlString={desc} />
      </p>
    </div>
  );
};
export const ChipCell = ({
  status,
  desc,
}: {
  status: TourStatus;
  desc?: string;
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <p className="min-w-[90px]">
        <StatusChip status={status} />
      </p>
      <p className="line-clamp-1 text-gray-400 text-sm px-2">{desc}</p>
    </div>
  );
};

const StatusChip = ({ status }: { status: TourStatus }) => {
  switch (status) {
    case "Up Comming": {
      return <Chip.Warning>{status}</Chip.Warning>;
    }

    case "Pending": {
      return <Chip.Danger>{status}</Chip.Danger>;
    }

    case "In Progress": {
      return <Chip.Info>{status}</Chip.Info>;
    }

    case "Completed": {
      return <Chip.Success>{status}</Chip.Success>;
    }

    case "Cancelled": {
      return <Chip.Disabled>{status}</Chip.Disabled>;
    }
  }
};

const extract =
  <T,>(cb: (data: T) => JSX.Element) =>
  (info: CellContext<T, unknown>) =>
    cb(info.row.original);
