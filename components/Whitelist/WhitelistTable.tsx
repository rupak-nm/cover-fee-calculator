
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
import { Table, TableWrapper, TBody, THead } from "@components/Table";
import { OpenInNewIcon } from "@svg";
import { classNames } from "@utils/functions";
import { useNetwork } from "@wallet/context/Network";
import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { fromNow } from "@utils/formatting/relative-time"
import { useWhiteListInfo } from "@utils/hooks/useWhitelistInfo";

interface RenderHeaderProps {
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
}

const renderHeader: FC<RenderHeaderProps> = (col) => (
  <th
    scope="col"
    className={classNames(
      `px-6 py-6 font-bold text-sm uppercase`,
      col.align === "right" ? "text-right" : "text-left"
    )}
  >
    {col.name}
  </th>
);

const renderWhen:FC<RenderWhenProps> = (row) => (
  <td
    className="px-6 py-6"
    /* title={DateLib.toLongDateFormat(row.transaction.timestamp)} */
  >
    {fromNow(row.transaction.timestamp)}
  </td>
);



const renderDetails: FC<RenderDetailsProps> = (row, extraData) => (
  <DetailsRenderer row={row} />
);


const renderActions:FC<RenderActionsProps> = (row) => <ActionsRenderer row={row} />;

const columns = [
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
  }
];

export const WhitelistTable = () => {
  const { data, loading, hasMore, handleShowMore } = useWhiteListInfo();

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
        {hasMore && (
          <button
            disabled={loading}
            className={classNames(
              "block w-full p-5 border-t border-DAE2EB",
              !loading && "hover:bg-F4F8FC"
            )}
            onClick={handleShowMore}
          >
            {loading && transactions.length > 0 ? "loading..." : "Show More"}
          </button>
        )}
      </TableWrapper>
    </>
  );
};

const DetailsRenderer:FC<RenderDetailsProps> = ({ row }) => {
  return (
    <td className="px-6 py-6">
      <div className="flex items-center">
        <img src="/images/tokens/npm.svg" alt="npm" height={32} width={32} />
        <span className="pl-4 text-left whitespace-nowrap">
          
          here
        </span>
      </div>
    </td>
  );
};

/* const BondAmountRenderer = ({ row, npmTokenSymbol }) => {
  return (
    <td className="px-6 py-6 text-right">
      <div className="flex items-center justify-end whitespace-nowrap">
        <TokenAmountSpan
          className={row.type == "BondCreated" ? "text-404040" : "text-FA5C2F"}
          amountInUnits={
            row.type == "BondCreated" ? row.npmToVestAmount : row.claimAmount
          }
          symbol={npmTokenSymbol}
        />
        <button
          className="p-1 ml-3"
          onClick={() => register(NPMTokenAddress, npmTokenSymbol)}
        >
          <span className="sr-only">Add to metamask</span>
          <AddCircleIcon className="w-4 h-4" />
        </button>
      </div>
    </td>
  );
}; */

const ActionsRenderer:FC<RenderActionsProps> = ({ row }) => {
  const { networkId } = useNetwork();

  return (
    <td className="px-6 py-6 min-w-120">
      <div className="flex items-center justify-end">
        <a
          /* href={getTxLink(networkId, { hash: row.transaction.id })} */
          href="#"
          target="_blank"
          rel="noreferrer noopener nofollow"
          className="p-1 text-black"
        >
          <span className="sr-only">Open in explorer</span>
          <OpenInNewIcon className="w-4 h-4" />
        </a>
      </div>
    </td>
  );
};
