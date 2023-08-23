import { useState, useEffect } from "react";
import { defaultStats } from "@utils/helpers/cover";
import { useFetchCovers } from "./useFetchCovers";

export const useCoverInfo = (coverKey: string) => {
  const [coverInfo, setCoverInfo] = useState({});
  const { data } = useFetchCovers();

  useEffect(() => {
    const info = data.find((x: any) => x.key === coverKey) || {
      stats: defaultStats,
    };
    setCoverInfo(info);
  }, [data, coverKey]);

  return { coverInfo };
};
