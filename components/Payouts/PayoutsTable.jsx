import {
  Table,
  TablePagination,
  TableWrapper,
  TBody,
  THead,
} from "@components/Table";
import { classNames } from "@utils/functions";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { FC, useState } from "react";
import { fromNow } from "@utils/formatting/relative-time";
import { usePayoutsInfo } from "@utils/hooks/usePayoutsInfo";
import { Checkbox } from "@components/Checkbox";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import DropDown from "@components/Dropdown";

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

const renderClaimed = (row) => (
  <td
    className="py-6"
    /* title={DateLib.toLongDateFormat(row.transaction.timestamp)} */
  >
    {row.transaction.claimedDate}
  </td>
);

const renderIncident = (row, extraData) => <IncidentRenderer row={row} />;

const renderDetails = (row, extraData) => <DetailsRenderer row={row} />;

//const renderActions = (row) => <ActionsRenderer row={row} />;

const renderAmount = (row) => <AmountRenderer row={row} />;

const columns = [
  {
    name: "Incident Date",
    align: "left",
    renderHeader,
    renderData: renderIncident,
  },
  {
    name: "claimed on",
    align: "left",
    renderHeader,
    renderData: renderClaimed,
  },
  {
    name: "accounts",
    align: "left",
    renderHeader,
    renderData: renderDetails,
  },
  {
    name: "amount",
    align: "right",
    renderHeader,
    renderData: renderAmount,
  },
];

export const PayoutsTable = () => {
  const { data, loading, hasMore, handleShowMore } = usePayoutsInfo();

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

const IncidentRenderer = ({ row }) => {
  return (
    <td className=" py-6">
      <div className="flex items-center">
        <span className="text-left whitespace-nowrap">
          {row.transaction.incidentDate}
        </span>
      </div>
    </td>
  );
};

const AmountRenderer = ({ row }) => {
  return (
    <td className="pl-6 py-6 text-right text-text-prim">
      <div className="flex items-center justify-end whitespace-nowrap">
        {row.transaction.amount}
      </div>
    </td>
  );
};
