import PriceCurveChart from "@components/PriceCurveChart";

const Chart = () => {
  return (
    <div className="bg-white pt-6 pb-14 sm:pt-5 sm:pb-70 lg:py-25 px-4 sm:px-8 lg:px-15">
      <h1 className="text-xl font-bold text-center mb-10 block lg:hidden">
        Cover Fee Calculator
      </h1>
      <h3 className="text-base font-semibold text-text-prim">Pricing Curve</h3>
      <div className="mt-7">
        <PriceCurveChart />
      </div>
    </div>
  );
};

export default Chart;
