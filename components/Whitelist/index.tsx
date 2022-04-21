import { SearchBar } from "@components/common/SearchBar";
import { useState } from "react";
import { WhitelistTable } from "./WhitelistTable";

const Whitelist = () => {

    return (
        <div className="py-18 mx-28">
            <h4 className="text-xl font-bold">Whitelist</h4>
            <WhitelistTable />
        </div>
    )
}

export default Whitelist;