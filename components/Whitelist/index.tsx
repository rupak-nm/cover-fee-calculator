import { SearchBar } from "@components/common/SearchBar";
import { useState } from "react";
import { WhitelistTable } from "./WhitelistTable";

const Whitelist = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e:any) => (
        console.log(e)
    )

    return (
        <div className="py-18 mx-28">
            <h4 className="font-bold text-xl">Whitelist</h4>
            <div className="py-8 pr-5 pl-11 bg-DAE2EB bg-opacity-30 mt-8 mb-6">
                <SearchBar searchValue={searchValue} onSearchChange={(e:any) => handleSearch(e)}/>
            </div>
            <WhitelistTable />
        </div>
    )
}

export default Whitelist;