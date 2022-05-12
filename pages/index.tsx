import { CoverList } from "@components/CoverList";
import Header from "@components/Header";
import { NoCovers } from "@components/NoCovers";
import { covers } from "mock/covers";
// import { useFetchCovers } from "@utils/hooks/useFetchCovers";
import { NextPage } from "next";

const Home: NextPage = () => {
  // const { data } = useFetchCovers();
  const data = covers;
  return (
    <div>
      <Header title="Neptune Mutual - Create New Cover" />
      <main>{data.length ? <CoverList covers={data} /> : <NoCovers />}</main>

      <footer></footer>
    </div>
  );
};

export default Home;
