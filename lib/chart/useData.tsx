import { useContext } from "react";
import { DataContext } from "./context";

export const useData = () => useContext(DataContext);
