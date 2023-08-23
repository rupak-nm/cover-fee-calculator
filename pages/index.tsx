import Calculator from "@components/Calculator";
import Chart from "@components/Chart";
import Header from "@components/Header";
import { NextPage } from "next";

const CalculatorPage: NextPage = () => {
  return (
    <div>
      <Header navKey="calculator" />
      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-7">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <Calculator />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-4">
          <Chart />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default CalculatorPage;
