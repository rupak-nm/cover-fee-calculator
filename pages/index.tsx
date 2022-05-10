import Calculator from "@components/Calculator";
import Chart from "@components/Chart";
import Header from "@components/Header";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-10">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <Calculator />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Chart />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
