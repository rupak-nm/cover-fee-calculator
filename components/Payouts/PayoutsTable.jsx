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
import { getParsedKey, toBytes32 } from "@utils/helpers/cover";
import { payouts } from "mock/payouts";
import { covers } from "mock/covers";

const DetailsRenderer = ({ row }) => {
  return (
    <td className="py-6 ">
      <div className="flex items-center">
        <span className="text-sm text-left whitespace-nowrap font-poppins text-404040">
          {row.account}
        </span>
      </div>
    </td>
  );
};

const CoverNameRenderer = ({ row }) => {
  return (
    <td className="py-6 ">
      <div className="flex items-center">
        <span
          className={classNames(
            "text-left text-prim-blue font-poppins text-sm whitespace-nowrap font-semibold uppercase"
          )}
        >
          {row.coverName}
        </span>
      </div>
    </td>
  );
};

const AmountRenderer = ({ row }) => {
  return (
    <td className="py-6 pl-6 text-right text-text-prim">
      <div className="flex items-center justify-end text-sm font-medium whitespace-nowrap font-poppins">
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

const renderHeader = (col) => (
  <th
    scope="col"
    className={classNames(
      `pt-6 pb-2 leading-4.5 tracking-wider font-bold font-poppins text-xs text-text-gray uppercase border-b border-b-DAE2EB`,
      col.align === "right" ? "text-right" : "text-left"
    )}
  >
    {col.name}
  </th>
);

const renderClaimed = (row) => (
  <td
    className="py-6 text-sm font-poppins text-prim-blue"
    title={DateLib.toLongDateFormat(row.createdAtTimestamp)}
  >
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

const renderName = (row, extraData) => <CoverNameRenderer row={row} />;

const renderDetails = (row, extraData) => <DetailsRenderer row={row} />;

//const renderActions = (row) => <ActionsRenderer row={row} />;

const renderAmount = (row) => <AmountRenderer row={row} />;

const columns = [
  {
    name: "Cover Name",
    align: "left",
    renderHeader,
    renderData: renderName,
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
  // const { data: coverData, loading: coverDataLoading } = useCoversInfo();
  const coverData = { covers };

  const [selectedRow, setSelectedRow] = useState([]);

  const { query } = useRouter();
  // let coverKey = toBytes32(query.cover);

  // const { data, loading, hasMore, handleShowMore } = usePayoutsInfo(coverKey);
  const data = payouts;
  const loading = false;

  const { networkId } = useNetwork();
  const { account } = useWeb3React();

  const { transactions } = data;
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(undefined);

  const [filtered, setFiltered] = useState(transactions);

  // useEffect(() => {
  //   setSelected(coverData?.covers[0]);
  //   router.push({
  //     pathname: router.asPath.split("?")[0],
  //     query: { cover: getParsedKey(coverData?.covers[0].key) },
  //   });
  // }, [coverData]);

  useEffect(() => {
    if (query?.cover) {
      setSelected(
        coverData.covers.find((c) => getParsedKey(c.key) === query.cover)
      );
    }
  }, [query, coverData.covers]);

  useEffect(() => {
    const includes = (str, qry) =>
      str.toLowerCase().includes(qry.toLowerCase());

    setFiltered(transactions);

    if (selected) {
      setFiltered((_data) =>
        _data.filter((d) => includes(d.coverName, selected.projectName))
      );
    } else setFiltered(transactions);

    if (searchValue) {
      setFiltered((_data) =>
        _data.filter((d) =>
          Boolean(
            includes(d.account, searchValue) ||
              includes(d.amount, searchValue) ||
              includes(d.coverName, searchValue)
          )
        )
      );
    }
  }, [searchValue, selected, transactions]);

  if (!coverData) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 px-8 py-8 mt-8 mb-6 sm:flex-nowrap bg-DAE2EB bg-opacity-30 rounded-2xl">
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
      <div className="bg-white shadow-table rounded-3xl">
        <TableWrapper>
          <Table>
            <THead columns={columns}></THead>
            {/* {account ? ( */}
            <TBody
              isLoading={loading}
              columns={columns}
              data={filtered}
            ></TBody>
            {/* ) : (
            <tbody>
              <tr className="w-full text-center">
                <td className="p-6" colSpan={columns.length}>
                  Please connect your wallet...
                </td>
              </tr>
            </tbody>
          )} */}
          </Table>
        </TableWrapper>
        <TablePagination
          totalCount={transactions.length}
          hasNext={false}
          hasPrev={false}
        />
      </div>
    </>
  );
};
