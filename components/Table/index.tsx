import { FilledDownArrow } from "@svg";
import { classNames } from "@utils/functions";
import ChevronLeftLgIcon from "@utils/SVG/ChevronLeftLgIcon";
import ChevronRightLgIcon from "@utils/SVG/ChevronRightLgIcon";
import { FC, Fragment, ReactNode, MouseEventHandler } from "react";

interface TableProps {
  children: ReactNode;
  tableProps: any[];
}

interface FormInputProps {
  children: ReactNode;
}

interface TablePaginationProps {
  skip: number;
  limit: number;
  totalCount: number;
  onNext: MouseEventHandler;
  onPrev: MouseEventHandler;
  hasPrev: boolean;
  hasNext: boolean;
  updateRowCount: (val: string) => any;
  px0?: boolean;
}

interface THeadProps {
  columns: any[];
  px0?: boolean;
}

interface TBodyProps {
  columns: any[];
  data: any[];
  isLoading: boolean;
  extraData: object;
  RowWrapper: FC<any>;
  px0?: boolean;
}

/* interface callbackfunction {(...args: any[]) => any;} */

export const Table: FC<TableProps> = ({ children, ...tableProps }) => {
  return (
    <table className="w-full min-w-850px" {...tableProps}>
      {children}
    </table>
  );
};

export const TableWrapper: FC<TableProps> = ({ children }) => {
  return (
    <>
      <div className="relative pt-2 overflow-x-auto bg-white text-404040 rounded-t-3xl">
        {children}
      </div>
    </>
  );
};

export const TablePagination: FC<TablePaginationProps> = ({
  skip = 0,
  limit = 10,
  totalCount = 124,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  updateRowCount,
  px0 = false,
}) => {
  if (totalCount <= 0) {
    return null;
  }

  const disabled = totalCount <= limit;

  return (
    <>
      <div
        className={classNames(
          "flex items-center flex-wrap gap-5.5 justify-end w-full pt-4.5 pb-7 bg-white rounded-b-3xl font-poppins border-t border-t-DAE2EB",
          px0 ? "" : "px-8"
        )}
      >
        <p className="text-sm font-poppins opacity-40">Rows per page</p>
        <div className={"relative"}>
          <select
            className="px-2 h-6.5 py-1 text-xs bg-white border rounded-md w-13 border-divider-gray disabled:cursor-not-allowed disabled:text-gray-500 font-poppins text-prim-blue leading-4.5 appearance-none"
            value={limit.toString()}
            onChange={(ev) => updateRowCount(ev.target.value)}
            disabled={disabled}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>

          <FilledDownArrow
            className={classNames(
              "w-2 h-2 absolute top-1/2 transform -translate-y-1/2 right-2",
              disabled ? "text-gray-500" : "text-prim-blue"
            )}
          />
        </div>
        <p className="text-sm font-poppins opacity-40">
          {skip + 1}-{Math.min(skip + limit, totalCount)} of {totalCount}
        </p>
        <div className="flex items-center gap-5.5">
          <button
            className="cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            <ChevronLeftLgIcon width={20} height={20} />
          </button>
          <button
            className="cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
            onClick={onNext}
            disabled={!hasNext}
          >
            <ChevronRightLgIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export const THead: FC<THeadProps> = ({ columns, px0 = false }) => {
  return (
    <thead className="rounded-sm text-text-gray bg-FEFEFF">
      <tr className={px0 ? "" : "first-child:pl-8 last-child:pr-8"}>
        {columns.map((col, idx) => {
          return <Fragment key={idx}>{col.renderHeader(col)}</Fragment>;
        })}
      </tr>
    </thead>
  );
};

// RowWrapper can probably only be a "Context Provider"
export const TBody: FC<TBodyProps> = ({
  columns,
  data,
  isLoading,
  extraData,
  RowWrapper = Fragment,
  px0 = false,
}) => {
  return (
    <tbody className="divide-y divide-DAE2EB">
      {data.length === 0 && (
        <tr className="w-full text-center">
          <td className="p-6" colSpan={columns.length}>
            {isLoading ? "Loading..." : "No data found"}
          </td>
        </tr>
      )}
      {data.map((row, idx) => {
        const wrapperProps = RowWrapper === Fragment ? {} : { row, extraData };

        return (
          <RowWrapper key={idx} {...wrapperProps}>
            <tr className={px0 ? "" : "first-child:pl-8 last-child:pr-8"}>
              {columns.map((col, _idx) => {
                return (
                  <Fragment key={_idx}>
                    {col.renderData(row, extraData)}
                  </Fragment>
                );
              })}
            </tr>
          </RowWrapper>
        );
      })}
    </tbody>
  );
};
