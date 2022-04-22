import { parseBytes32String,formatBytes32String } from "@ethersproject/strings";

export const getParsedKey = (bytes32String:string) => {
    try {
      return parseBytes32String(bytes32String);
    } catch (error) {
      return bytes32String;
    }
  };
  
  export const toBytes32 = ( str:string ) => {
    try {
      return formatBytes32String(str);
    } catch (error) {
      return str;
    }
  };