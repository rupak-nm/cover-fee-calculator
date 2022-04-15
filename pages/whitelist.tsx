import Header from "@components/Header";
import Whitelist from "@components/Whitelist";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header navKey="whitelist" />
      <main className="grid grid-cols-1 lg:grid-cols-10">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <Whitelist />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
