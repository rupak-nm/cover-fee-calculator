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
import { FC, useEffect, useState } from "react";
import { fromNow } from "@utils/formatting/relative-time";
import { usePayoutsInfo } from "@utils/hooks/usePayoutsInfo";
import { Checkbox } from "@components/Checkbox";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import DropDown from "@components/Dropdown";
import { SearchBar } from "@components/common/SearchBar";
import { CoverDropdown } from "@components/CoverDropdown";
import { useCoversInfo } from "@utils/hooks/useCoversInfo";
import { useRouter } from "next/router";
import DateLib from "@date/DateLib";
import { formatCurrency } from "@utils/methods";
import { convertFromUnits } from "@utils/functions/bn";

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
  <td className="py-6" title={DateLib.toLongDateFormat(row.createdAtTimestamp)}>
    {DateLib.toDateFormat(
      row.createdAtTimestamp,
      {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      },
      "UTC"
    )}
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
  const { data: coverData, loading: coverDataLoading } = useCoversInfo();

  const [selectedRow, setSelectedRow] = useState([]);

  let router = useRouter();
  let { query } = router;

  const { data, loading, hasMore, handleShowMore } = usePayoutsInfo(query.key);
  const { networkId } = useNetwork();
  const { account } = useWeb3React();

  const { transactions } = data;
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(coverData?.covers[0]);
    router.push({
      pathname: router.asPath.split("?")[0],
      query: { key: coverData?.covers[0].key },
    });
  }, [coverData]);

  if (!coverData) {
    return null;
  }

  return (
    <>
      <div className="flex py-8 pr-5 mt-8 mb-6 pl-11 bg-DAE2EB bg-opacity-30">
        <SearchBar
          containerClass="w-full"
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
        />
        <CoverDropdown
          options={coverData.covers}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
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
    <td className="py-6 ">
      <div className="flex items-center">
        <span className="text-left whitespace-nowrap">{row.account}</span>
      </div>
    </td>
  );
};

const IncidentRenderer = ({ row }) => {
  return (
    <td className="py-6 ">
      <div className="flex items-center">
        <span
          className="text-left whitespace-nowrap"
          title={DateLib.toLongDateFormat(row.incidentDate)}
        >
          {DateLib.toDateFormat(
            row.incidentDate,
            {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short",
            },
            "UTC"
          )}
        </span>
      </div>
    </td>
  );
};

const AmountRenderer = ({ row }) => {
  return (
    <td className="py-6 pl-6 text-right text-text-prim">
      <div className="flex items-center justify-end whitespace-nowrap">
        <span
          title={`${
            formatCurrency(convertFromUnits(row.amount).toString(), "DAI", true)
              .long
          }`}
        >
          {
            formatCurrency(convertFromUnits(row.amount).toString(), "DAI", true)
              .short
          }
        </span>
      </div>
    </td>
  );
};
