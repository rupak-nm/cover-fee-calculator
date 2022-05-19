import * as Dialog from "@radix-ui/react-dialog";
import BulkImportIcon from "@utils/SVG/BulkImportIcon";
import DeleteIcon from "@utils/SVG/DeleteIcon";
import { useRef, useState } from "react";
import { Modal } from "@modal/Modal";
import { CloseIcon } from "@svg";
import FormInput from "@components/FormInput";
import { RegularButton } from "@components/RegularButton";
import { isAddress } from "ethers/lib/utils";
import { useClickOutside } from "@utils/hooks/useClickOutside";

const DropDown = ({
  setIsOpen,
  closeDropdown,
}: {
  setIsOpen: Function;
  closeDropdown: Function;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(divRef, () => closeDropdown());

  const handleBulkImport = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div
        className="absolute z-10 p-5 mt-2 text-xs font-bold rounded-lg shadow-dropdown bg-FEFEFF top-4 -left-6 w-max text-prim-blue"
        ref={divRef}
      >
        <div className="flex mb-3 items-cente" onClick={handleBulkImport}>
          <div className="mr-2">
            <BulkImportIcon />
          </div>
          BULK IMPORT
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <DeleteIcon />
          </div>
          DELETE
        </div>
      </div>
    </>
  );
};

export default DropDown;

export const BulkImportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Function;
}) => {
  const [listOfAddresses, setListOfAddresses] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleInputChange = (val: string) => {
    val.split(",").map((address, index) => {
      if (address !== "" && !isAddress(address.trim())) {
        setError("Invalid address");
      } else {
        setError("");
      }
    });
    setListOfAddresses(val.split(","));
  };

  const handleImportClick = () => {
    let filteredAddresses = listOfAddresses.filter((address) => {
      return isAddress(address.trim());
    });
    console.log(filteredAddresses);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} overlayClass="backdrop-blur-sm">
      <div className="relative z-50 inline-block w-auto max-w-2xl px-10 py-12 my-8 overflow-y-auto text-left align-middle transition-all bg-white border border-divider-gray min-w-200px rounded-3xl">
        <Dialog.Title
          // as="h3"
          className="font-bold text-black text-modalHeading leading-11 font-sora"
        >
          Bulk Import
        </Dialog.Title>

        <FormInput
          label=""
          placeholder="Provide a list of addresses you want to whitelist separated by “,”"
          className="w-60 sm:w-96 md:w-[520px]"
          value={listOfAddresses.join(",")}
          setValue={(val: string) => handleInputChange(val)}
          type="text"
          textfield
          textfieldSize="medium"
        >
          {error && <p className="text-FA5C2F">{error}</p>}
        </FormInput>

        <div className="flex justify-end">
          <button
            className="py-3 mt-5 mr-4 text-sm font-medium capitalize bg-transparent border rounded-lg font-poppins text-text-prim px-btn-x border-text-prim"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="py-3 mt-5 text-sm font-medium text-white capitalize rounded-lg outline-none bg-text-prim px-btn-x font-poppins focus:ring-2 focus:ring-prim-border"
            onClick={() => handleImportClick()}
          >
            Import
          </button>
        </div>
      </div>
    </Modal>
  );
};
