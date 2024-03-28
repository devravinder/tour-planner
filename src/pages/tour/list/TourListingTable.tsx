import { useEffect, useMemo, useState } from "react";
import { Tour, TourStatus } from "services/tourService";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  getPaginationRowModel,
  Row,
  getFilteredRowModel,
  CellContext,
  ColumnFiltersState,
  FilterFn,
} from "@tanstack/react-table";
import DebounceInput from "components/form/input/DebounceInput";
import Pagination from "./Pagination";
import RichText from "components/RichText";
import { useNavigate } from "react-router";
import { toFormat } from "services/utils/dateUtility";
import { Chip } from "components/Chip";
import Select from "components/form/input/Select";
import { statusOptions } from "../details/utils";
import DateInput from "components/form/input/DateInput";
import { Table, Thead, Tr, Th, Tbody, Td } from "components/table/styles";
import PageActions from "./PageActions";
import Icons from "components/icons";
import useModal from "components/modal-notification/useModal";
import useNotification from "components/modal-notification/useNotification";
import DeleteModal from "./DeleteModal";

type TourListingTableProps = {
  tours: Tour[];
};
const pageSizeOptions = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];
const DEFAULT_PAGE_SIZE = 5;
export default function TourListingTable({ tours }: TourListingTableProps) {
  const navigate = useNavigate();
  const { createModalInstance } = useModal();
  const { notify } = useNotification();
  const [pages, setPages] = useState([1]);
  const [tablePageSize, setTablePageSize] = useState(DEFAULT_PAGE_SIZE);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [status, setStatus] = useState<typeof statusOptions | undefined>([]);
  const [plannedStartDate, setPlannedStartDate] = useState<Date | undefined>();

  const columns: ColumnDef<Tour>[] = useMemo(() => {
    return [
      {
        header: "Title",
        accessorFn: (row) => row.title, // this is used in sort
        cell: extractTour((tour) => (
          <TitleCell title={tour.title} desc={tour.description} />
        )),
        id: "title", // any string
      },
      {
        header: "Status",
        accessorFn: (row) => row.status,
        cell: extractTour((tour) => (
          <ChipCell status={tour.status!} desc="Status" />
        )),
        id: "status",
      },
      {
        header: "Pl Expense",
        accessorFn: (row) => row.plannedExpense,
        cell: extractTour((tour) => (
          <CommonCell title={tour.plannedExpense!} desc="INR" />
        )),
        sortingFn: numberSort,
        id: "plannedExpense",
      },
      {
        header: "Pl Strat Date",
        accessorFn: (row) => row.plannedStartDate,
        cell: extractTour((tour) => (
          <CommonCell
            title={
              tour.plannedStartDate
                ? toFormat(tour.plannedStartDate, "DD MMM YYYY")
                : "-"
            }
            desc="Planned Start"
          />
        )),
        sortingFn: dateSort,
        filterFn: startDateFilter,
        id: "plannedStartDate",
      },
      {
        header: "Start Date",
        accessorFn: (row) => row.startDate,
        cell: extractTour((tour) => (
          <CommonCell
            title={
              tour.startDate ? toFormat(tour.startDate, "DD MMM YYYY") : "-"
            }
            desc="Start Date"
          />
        )),
        sortingFn: dateSort,
        id: "startDate",
      },
    ];
  }, []);

  const tableInstance = useReactTable({
    data: tours,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    state: { globalFilter, columnFilters },
    pageCount: Math.ceil(tours.length / tablePageSize),
    initialState: {
      sorting: [{ id: "plannedStartDate", desc: true }],
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
  });

  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    getPageCount,
    setPageSize,
    getState,
  } = tableInstance;

  const pageCount = getPageCount();
  const { pageIndex } = getState().pagination;
  const rowClick = (row: Row<Tour>) => {
    navigate(`/tours/${row.original.id}`);
  };

  const setStatusFilters = (values?: typeof statusOptions) => {
    setStatus(values);
    const otherOldFilters = columnFilters.filter((e) => e.id !== "status");
    values?.forEach((e) =>
      otherOldFilters.push({ id: "status", value: e.value }),
    );
    setColumnFilters(otherOldFilters);
  };

  const setDateFilter = (value?: Date) => {
    setPlannedStartDate(value);
    const otherOldFilters = columnFilters.filter(
      (e) => e.id !== "plannedStartDate",
    );
    if (value) otherOldFilters.push({ id: "plannedStartDate", value: value });
    setColumnFilters(otherOldFilters);
  };

  const onDelete = () => {
    const { openModal, closeModel } = createModalInstance();
    openModal(
      <DeleteModal
        onCancel={closeModel}
        onDelete={() => {
          notify("Deleted successfully", { type: "success", time: 2000 });
          closeModel();
        }}
      />,
    );
  };

  useEffect(() => {
    setPages(Array.from({ length: pageCount }, (_, i) => i + 1));
  }, [pageCount]);

  return (
    <div className="py-4 flex flex-col gap-y-4">
      <div className="flex flex-row gap-2">
        <DebounceInput
          value={globalFilter}
          onChange={(value) => {
            setGlobalFilter(String(value));
          }}
          placeholder="Search..."
          className="shadow-md rounded-md focus-visible:shadow-none sm:w-1/2 md:w-1/4"
        ></DebounceInput>
        <Select
          searchable={true}
          value={status}
          onChange={setStatusFilters}
          placeholder="Status"
          options={statusOptions}
          multi={true}
          valueKey={"value"}
          labelKey={"label"}
          className="shadow-md rounded-md sm:w-1/2 md:w-1/4"
        ></Select>

        <DateInput
          value={plannedStartDate}
          onChange={setDateFilter}
          type="date"
          placeholder="Start Date"
          className="shadow-md rounded-md sm:w-1/2 md:w-1/4"
        />
      </div>
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
              onClick={() => rowClick(row)}
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
                  <div className="absolute right-[100%] z-10 invisible group-focus:visible shadow-md">
                    <span className="absolute border-t border-r w-4 h-4 rounded-sm right-0 top-[42%] translate-x-2 rotate-45 bg-white "></span>
                    <div className="relative bg-white rounded-md border-t border-b border-l shadow-[0px 8px 10px gray, -10px 8px 15px gray, 10px 8px 15px gray]">
                      <div className="z-20 border-b py-2 px-2 hover:bg-gray-100 flex flex-row gap-2 items-center">
                        <Icons.Trash className="w-5 h-5 text-red-500" />
                        <span className="text-red-500" onClick={onDelete}>
                          Delete
                        </span>
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
      <div className=" flex justify-between flex-wrap gap-2">
        <PageActions
          onPageChange={(v) => setPageIndex(v)}
          pageIndex={pageIndex}
          onPageSizeChange={(v) => {
            setPageSize(v);
            setTablePageSize(v);
          }}
          pageSize={getState().pagination.pageSize}
          dataCount={tableInstance.getFilteredRowModel().rows.length}
          pageCount={pageCount}
          pageSizeOptions={pageSizeOptions}
        />
        <Pagination
          pages={pages}
          index={pageIndex}
          onChange={(index) => setPageIndex(index)}
          className="shadow-md rounded-lg"
        />
      </div>
    </div>
  );
}
const dateSort: SortingFn<Tour> = (rowA, rowB, columnId) => {
  return sortingFns.datetime(rowA, rowB, columnId);
};
const numberSort: SortingFn<Tour> = (rowA, rowB, columnId) => {
  return (
    parseFloat(rowA.getValue(columnId)) - parseFloat(rowB.getValue(columnId))
  );
};

const startDateFilter: FilterFn<Tour> = (row, _, value: Date) => {
  let { plannedStartDate } = row.original;
  if (plannedStartDate) {
    value.setHours(0, 0, 0);
    plannedStartDate = new Date(plannedStartDate); // plannedStartDate is string
    return value.getTime() <= plannedStartDate.getTime();
  }

  return false;
};

const globalFilterFn = (
  row: Row<Tour>,
  columnId: string,
  filterValue: string,
  //addMeta: (meta: FilterMeta) => void,
) => {
  if (columnId === "title") {
    const value: string = row.getValue(columnId);
    return value.includes(filterValue);
  }
  return false;
};

const extractTour =
  (cb: (tour: Tour) => JSX.Element) => (info: CellContext<Tour, unknown>) =>
    cb(info.row.original);

const CommonCell = ({
  title,
  desc,
}: {
  title: string | number | JSX.Element;
  desc?: string | number | JSX.Element;
}) => {
  return (
    <div>
      <p className="text-gray-900">{title}</p>
      <p className="line-clamp-1 text-gray-400 text-sm ">{desc} </p>
    </div>
  );
};
const TitleCell = ({ title, desc }: { title: string; desc?: string }) => {
  return (
    <div className="max-w-sm">
      <p className="text-primary-dark">{title}</p>
      <p className="line-clamp-1 text-gray-400 text-sm ">
        <RichText className="styles-unset" htmlString={desc} />
      </p>
    </div>
  );
};
const ChipCell = ({ status, desc }: { status: TourStatus; desc?: string }) => {
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
