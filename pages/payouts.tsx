import Header from "@components/Header";
import Payouts from "@components/Payouts";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header navKey="payouts" />
      <main className="bg-prim-gray">
        <div className="">
          <Payouts />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
