import * as Dialog from "@radix-ui/react-dialog";
import BulkImportIcon from "@utils/SVG/BulkImportIcon";
import DeleteIcon from "@utils/SVG/DeleteIcon";
import { useState } from "react";
import {Modal } from "@modal/Modal"
import {ModalWrapper} from "@modal/ModalWrapper"
import { CloseIcon } from "@svg";
import FormInput from "@components/FormInput";
import { RegularButton } from "@components/RegularButton";


const DropDown = ({setIsOpen}: {setIsOpen:Function}) => {
  
    const handleBulkImport = () => {
      setIsOpen(true)
    }
    return (
      <>
        <div className="rounded-lg shadow-dropdown p-5 absolute bg-FEFEFF top-4 -left-6 z-10 w-max text-prim-blue text-xs font-bold">
            <div className="flex items-cente mb-3" onClick={handleBulkImport}><div className="mr-2"><BulkImportIcon /></div>BULK IMPORT</div>
            <div className="flex items-center"><div className="mr-2"><DeleteIcon /></div>DELETE</div>
        </div>
      </>
    );
  };
  
export default DropDown;

export const BulkImportModal = ({isOpen, onClose}:{isOpen: boolean, onClose: Function}) => {

  const [listOfAddresses, setListOfAddresses] = useState("")

  const handleInputChange = (val:string) => {
    setListOfAddresses(val)
    console.log(val)
  }

  const handleImportClick = () => {
    console.log("import ")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} overlayClass="backdrop-blur-sm">
      <ModalWrapper className="max-w-xs px-6 py-4 my-8 overflow-y-auto transition-all sm:py-12 sm:px-16 sm:max-w-xl">
        <Dialog.Title
          // as="h3"
          className="font-bold leading-9 text-black font-sora text-heading"
        >
          Bulk Import
        </Dialog.Title>

        <button
          onClick={() => onClose()}
          className="absolute flex items-center justify-center text-black rounded-md top-5 right-6 sm:top-7 sm:right-12 hover:text-text-prim focus:text-text-prim focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-transparent"
        >
          <span className="sr-only">Close</span>
          <CloseIcon width={24} height={24} />
        </button>

        
        <FormInput
            label=""
            placeholder='Provide a list of addresses you want to whitelist separated by “,”'
            className="w-96"
            value={listOfAddresses}
            setValue={(val:string) => handleInputChange(val)}
            type="text"
            textfield
          />

          <div className="flex justify-end">
            <button className="mt-6 mr-4 bg-transparent rounded-lg text-text-prim px-btn-x py-btn-y font-poppins font-semibold uppercase border border-text-prim">Cancel</button>
            <RegularButton
              text={"Import"}
              className="mt-6"
              onClick={() => handleImportClick()}
            />
          </div>
        
      </ModalWrapper>
    </Modal>
  )
}