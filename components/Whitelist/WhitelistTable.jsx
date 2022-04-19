/* import { classNames } from "@/utils/classnames";
import { useWeb3React } from "@web3-react/core";
import { fromNow } from "@/utils/formatter/relative-time";
import DateLib from "@/lib/date/DateLib";
import { useBondTxs } from "@/src/hooks/useBondTxs";
import { useAppConstants } from "@/src/context/AppConstants";
import { useTokenSymbol } from "@/src/hooks/useTokenSymbol";
import { useNetwork } from "@/src/context/Network";
import { useBondInfo } from "@/src/hooks/useBondInfo";
import { TokenAmountSpan } from "@/components/TokenAmountSpan"; */
import {
  Table,
  TablePagination,
  TableWrapper,
  TBody,
  THead,
} from "@components/Table";
import { OpenInNewIcon } from "@svg";
import { classNames } from "@utils/functions";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { FC, useState } from "react";
import { fromNow } from "@utils/formatting/relative-time";
import { useWhiteListInfo } from "@utils/hooks/useWhitelistInfo";
import { Checkbox } from "@components/Checkbox";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import DropDown, { BulkImportModal } from "@components/Dropdown";

/* interface RenderHeaderProps {
  col: {
    align: string,
    name: string
  }
}
interface RenderWhenProps {
  row: {transaction: {timestamp: string;}}
}
interface RenderDetailsProps {
  row: object;
  extraData?: any;
}
interface RenderActionsProps {
  row: object;
} */

const renderHeader = (col) => (
  <th
    scope="col"
    className={classNames(
      `py-6 font-bold text-sm uppercase border-b border-b-DAE2EB`,
      col.align === "right" ? "text-right" : "text-left"
    )}
  >
    {col.name}
  </th>
);

const renderWhen = (row) => (
  <td
    className="py-6"
    /* title={DateLib.toLongDateFormat(row.transaction.timestamp)} */
  >
    {row.transaction.timestamp}
  </td>
);

const renderDetails = (row, extraData) => <DetailsRenderer row={row} />;

const renderActions = (row) => <ActionsRenderer row={row} />;

const renderHeaderActions = (row) => <HeaderActionRenderer row={row} />;

const columns = [
  {
    name: "",
    align: "left",
    renderHeader: () => renderHeaderActions(),
    renderData: renderActions,
  },
  {
    name: "added on",
    align: "left",
    renderHeader,
    renderData: renderWhen,
  },
  {
    name: "accounts",
    align: "left",
    renderHeader,
    renderData: renderDetails,
  },
];

export const WhitelistTable = () => {
  const { data, loading, hasMore, handleShowMore } = useWhiteListInfo();

  const [selectedRow, setSelectedRow] = useState([]);

  const { networkId } = useNetwork();
  const { account } = useWeb3React();

  const { transactions } = data;

  return (
    <>
      <TableWrapper>
        <Table>
          <THead columns={columns}></THead>
          {account ? (
            <TBody
              isLoading={loading}
              columns={columns}
              data={transactions}
            ></TBody>
          ) : (
            <tbody>
              <tr className="w-full text-center">
                <td className="p-6" colSpan={columns.length}>
                  Please connect your wallet...
                </td>
              </tr>
            </tbody>
          )}
        </Table>
        <TablePagination />
      </TableWrapper>
    </>
  );
};

const DetailsRenderer = ({ row }) => {
  return (
    <td className=" py-6">
      <div className="flex items-center">
        <span className="text-left whitespace-nowrap">
          {row.transaction.accounts}
        </span>
      </div>
    </td>
  );
};

const ActionsRenderer = ({ row }) => {
  const [checkedRow, setCheckedRow] = useState(false);

  return (
    <td className="pr-2 py-6 min-w-120">
      <div className="flex items-center py-1 px-2">
        <Checkbox
          id="table-data"
          checked={checkedRow}
          onChange={() => setCheckedRow((prev) => !prev)}
        />
      </div>
    </td>
  );
};
const HeaderActionRenderer = ({ row }) => {
  const [checkedRow, setCheckedRow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <th className="pr-2 py-6 min-w-120 border-b border-b-DAE2EB">
      <div
        className={classNames(
          "flex items-center  w-fit py-1 px-2",
          showDropdown && "bg-EEEEEE rounded-md "
        )}
      >
        <Checkbox
          id="table-data"
          checked={checkedRow}
          onChange={() => setCheckedRow((prev) => !prev)}
        />
        <div className="cursor-pointer relative" onClick={handleDropdown}>
          <ChevronDownIcon width={10} height={6} />
          {showDropdown && <DropDown setIsOpen={setIsOpen} />}
        </div>
      </div>
      <BulkImportModal isOpen={isOpen} onClose={onClose} />
    </th>
  );
};
