import { classNames } from "@utils/functions";
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
import styles from "./style.module.css";

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
      <div className="relative pt-2 overflow-x-scroll bg-white text-404040 rounded-t-3xl lg:overflow-hidden">
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

  const disabled = totalCount <= limit;

  return (
    <>
      <div className="flex items-center flex-wrap gap-y-2 justify-end w-full px-8 pt-4.5 pb-7 bg-white rounded-b-3xl font-poppins border-t border-t-DAE2EB">
        <p className="font-poppins opacity-40">Rows per page</p>
        <div
          className={classNames(
            styles.select_wrapper,
            disabled ? "text-gray-500" : "text-prim-blue"
          )}
        >
          <select
            className="px-2 h-6.5 py-1 text-xs bg-white border rounded-md w-14 border-divider-gray disabled:opacity-75 disabled:text-gray-500 font-poppins text-prim-blue leading-4.5 appearance-none"
            value={limit.toString()}
            onChange={(ev) => updateRowCount(ev.target.value)}
            disabled={disabled}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <p className="text-sm font-poppins opacity-40">
          {skip + 1}-{Math.min(skip + limit, totalCount)} of {totalCount}
        </p>
        <button
          className="ml-2 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
          onClick={onPrev}
          disabled={!hasPrev}
        >
          <ChevronLeftLgIcon width={16} height={16} />
        </button>
        <button
          className="ml-2 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
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
      <tr className="first-child:pl-8 last-child:pr-8">
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
            <tr className="first-child:pl-8 last-child:pr-8">
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
