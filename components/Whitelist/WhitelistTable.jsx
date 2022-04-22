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
import { FC, useEffect, useState } from "react";
import { fromNow } from "@utils/formatting/relative-time";
import { useWhiteListInfo } from "@utils/hooks/useWhitelistInfo";
import { Checkbox } from "@components/Checkbox";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import DropDown, { BulkImportModal } from "@components/Dropdown";
import DateLib from "@date/DateLib";
import { TableCheckBox } from "@components/Checkbox/TableCheckbox";
import { SearchBar } from "@components/common/SearchBar";

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
    title={DateLib.toLongDateFormat(row?.createdAtTimestamp)}
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

const renderDetails = (row, extraData) => <DetailsRenderer row={row} />;

export const WhitelistTable = () => {
  const { data, loading, hasMore, handleShowMore } = useWhiteListInfo();

  const changeAll = (value) => {
    return value ? data.transactions.map(({ id }) => id) : [];
  };

  const getCheckedById = (id, arr) => {
    return arr.includes(id);
  };

  const changeById = (id, arr, value) => {
    let _arr = arr;
    if (value && !_arr.includes(id)) _arr.push(id);
    else if (!value && _arr.includes(id)) {
      const index = _arr.findIndex((e) => e === id);
      _arr.splice(index, 1);
    }
    return _arr;
  };

  const allChecked = (arr) => {
    return arr.length === data.transactions.length;
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const renderActions = (row) => (
    <ActionsRenderer
      row={row}
      checked={getCheckedById(row.id, selectedRows)}
      onChange={(checked, r) => {
        const newArr = changeById(r.id, selectedRows, checked);
        setSelectedRows(newArr);
      }}
    />
  );

  const renderHeaderActions = () => (
    <HeaderActionRenderer
      checked={allChecked(selectedRows)}
      onChange={(checked) => {
        const newArr = changeAll(checked);
        setSelectedRows(newArr);
      }}
    />
  );

  const columns = [
    {
      name: "",
      align: "left",
      renderHeader: () => renderHeaderActions(),
      renderData: (row) => renderActions(row),
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

  const handleCheckedRow = (ev) => {
    console.log("e", ev.target.id);
    checkedRows.map((row, idx) => {
      if (parseInt(ev.target.id.replace(/^\D+/g, "")) === idx) {
        let newCheckedRows = [...checkedRows];
        newCheckedRows[idx] = !newCheckedRows[idx];
        setCheckedRows(newCheckedRows);
      }
    });
  };

  const { networkId } = useNetwork();
  const { account } = useWeb3React();

  const { transactions } = data;
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="py-8 pr-5 mt-8 mb-6 pl-11 bg-DAE2EB bg-opacity-30">
        <SearchBar
          searchValue={searchValue}
          onSearchChange={(e) => handleSearch(e)}
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

const ActionsRenderer = ({ row, checked, onChange }) => {
  return (
    <td className="py-6 pr-2 min-w-120">
      <div className="flex items-center px-2 py-1">
        <Checkbox
          id="table-data"
          checked={checked}
          onChange={(checked) => onChange(checked, row)}
        />
      </div>
    </td>
  );
};
const HeaderActionRenderer = ({ checked, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [checkedRows, setCheckedRows] = useState([false]);
  const handleCheckedRow = (ev) => {
    console.log("e", ev.target.id);
    checkedRows.map((row, idx) => {
      if (parseInt(ev.target.id.replace(/^\D+/g, "")) === idx) {
        let newCheckedRows = [...checkedRows];
        newCheckedRows[idx] = !newCheckedRows[idx];
        setCheckedRows(newCheckedRows);
      }
    });
  };
  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <th className="py-6 pr-2 border-b min-w-120 border-b-DAE2EB">
      <div
        className={classNames(
          "flex items-center  w-fit py-1 px-2",
          showDropdown && "bg-EEEEEE rounded-md "
        )}
      >
        <TableCheckBox
          id="table-data-0"
          // checked={checkedRows[0]}
          // onChange={(ev) => handleCheckedRow(ev)}
          checked={checked}
          onChange={(ev) => onChange(ev.target.checked)}
        />
        <div className="relative cursor-pointer" onClick={handleDropdown}>
          <ChevronDownIcon width={10} height={6} />
          {showDropdown && (
            <DropDown
              setIsOpen={setIsOpen}
              closeDropdown={() => setShowDropdown(false)}
            />
          )}
        </div>
      </div>
      <BulkImportModal isOpen={isOpen} onClose={onClose} />
    </th>
  );
};
