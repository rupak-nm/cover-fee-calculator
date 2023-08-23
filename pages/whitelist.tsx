import Header from "@components/Header";
import Whitelist from "@components/Whitelist";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header navKey="whitelist" />
      <main className="bg-prim-gray">
        <div className="">
          <Whitelist />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
