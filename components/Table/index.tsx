import ChevronLeftLgIcon from "@utils/SVG/ChevronLeftLgIcon";
import ChevronRightLgIcon from "@utils/SVG/ChevronRightLgIcon";
import {
  FC,
  Fragment,
  ReactNode,
  MouseEventHandler,
  ReactElement,
  ReactFragment,
} from "react";

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
}

interface THeadProps {
  columns: any[];
}

interface TBodyProps {
  columns: any[];
  data: any[];
  isLoading: boolean;
  extraData: object;
  RowWrapper: FC<any>;
}

/* interface callbackfunction {(...args: any[]) => any;} */

export const Table: FC<TableProps> = ({ children, ...tableProps }) => {
  return (
    <table className="w-full min-w-800px" {...tableProps}>
      {children}
    </table>
  );
};

export const TableWrapper: FC<TableProps> = ({ children }) => {
  return (
    <>
      <div className="relative px-8 overflow-x-scroll bg-white text-404040 rounded-t-3xl lg:overflow-hidden">
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
}) => {
  if (totalCount <= 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-end w-full p-4 bg-white border-t rounded-b-3xl border-t-DAE2EB">
        <p className="p-2 opacity-40">Rows per page</p>
        <select
          className="w-12 mx-4 text-xs border rounded-md border-divider-gray disabled:opacity-75"
          value={limit.toString()}
          onChange={(ev) => updateRowCount(ev.target.value)}
          disabled={totalCount <= limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p className="p-2 text-sm opacity-40">
          {skip + 1}-{Math.min(skip + limit, totalCount)} of {totalCount}
        </p>
        <button
          className="p-2 ml-2 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          <ChevronLeftLgIcon width={16} height={16} />
        </button>
        <button
          className="p-2 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!hasNext}
        >
          <ChevronRightLgIcon width={16} height={16} />
        </button>
      </div>
    </>
  );
};

export const THead: FC<THeadProps> = ({ columns }) => {
  return (
    <thead className="rounded-sm text-text-gray bg-FEFEFF">
      <tr>
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
            <tr>
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
