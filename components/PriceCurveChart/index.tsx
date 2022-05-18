import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts/highstock";

import HighchartsExporting from "highcharts/modules/exporting";
import { formatCurrency, formatPercent, getCoverFee } from "@utils/methods";
import { useData } from "lib/chart/useData";
import { castToNumber } from "@utils/formatting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const PriceCurveChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const chartRef = useRef<any>();

  const { data } = useData();

  const chartOptions: Options = {
    xAxis: {
      type: "logarithmic",
      crosshair: {
        color: "#4E7DD9",
        dashStyle: "Dash",
      },
      lineWidth: 0.5,
      lineColor: "#01052D",
      ordinal: false,
      minRange: 1,
      labels: {
        useHTML: true,
        formatter: function () {
          const val = new Intl.NumberFormat("en", {
            notation: "compact",
            compactDisplay: "short",
          }).format(parseFloat(this.value.toString()));
          return `<span class="font-poppins align-sub text-xxs text-prim-blue">${val}</span>`;
        },
      },
    },
    yAxis: {
      opposite: false,
      labels: {
        useHTML: true,
        format:
          '<span class="font-poppins text-xs text-prim-blue">{value}%</span>',
      },
      gridLineDashStyle: "Dash",
      gridLineColor: "#01052D40",
      gridLineWidth: 0.5,
      lineWidth: 0.5,
      lineColor: "#01052D",
      // min: yAxisMin,
    },
    series: [
      {
        type: "areaspline",
        name: "Total Liquidity Chart",
        data: chartData,
        lineWidth: 3,
        lineColor: "#4E7DD9",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(78, 125, 217, 0.4)"],
            [1, "rgba(78, 125, 217, 0.05)"],
          ],
        },
        marker: {
          fillColor: "white",
          lineWidth: 4,
          radius: 3,
          lineColor: "#4E7DD9",
        },
        animation: {
          duration: 500,
        },
      },
    ],
    chart: {
      backgroundColor: "transparent",
      zoomType: "x",
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    rangeSelector: { enabled: false },
    credits: { enabled: false },
    tooltip: {
      animation: true,
      // xDateFormat: "",
      padding: 0,
      useHTML: true,
      formatter: function (this: any): any {
        const _option = this.points[0].point.options;
        return `<div class='p-4 bg-white border border-DAE2EB rounded-lgg shadow-hc-tooltip'><p class='font-semibold font-poppins text-xxs'>
        Guaranteed Protection: <span class='font-normal text-text-prim'>${
          formatCurrency(_option.amount).long
        }</span>
        <!-- <br />Utilization Ratio: <span class='font-normal text-text-prim'>${formatPercent(
          _option.utilizationRatio
        )}</span> -->
        <br />Cover Rate: <span class='font-normal text-text-prim'>${formatPercent(
          _option.rate
        )}</span>
        <br />Monthly Fee: <span class='font-normal text-green-500'>${
          formatCurrency(_option.projectedFee).long
        }</span>
        </div>`;
      },
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: 0,
      shadow: false,
      shape: "square",
      // split: true,
      hideDelay: 100,
      outside: false,
    },
    navigator: {
      handles: {
        symbols: [
          "url(/icons/chart-navigator-handle.svg)",
          "url(/icons/chart-navigator-handle.svg)",
        ],
        // lineWidth: 1,
        width: 20,
        height: 30,
      },
      maskFill: "rgba(78, 125, 217, 0.2)",
      outlineWidth: 0,
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
  };

  useEffect(() => {
    const state = data;
    if (
      !state.inVault ||
      !state.reassuranceAmount ||
      !state.totalCommitment ||
      !state.floor ||
      !state.ceiling ||
      !state.provision
    ) {
      if (chartRef.current?.chart) {
        chartRef.current.chart.showLoading(
          "Please provide all required data to display chart"
        );
      }
      return setChartData([]);
    }
    if (chartRef.current?.chart) {
      chartRef.current.chart.hideLoading();
    }

    const amounts = [
      1, 5, 10, 15, 20, 50, 100, 150, 200, 500, 1000, 1500, 2000, 5000, 10_000,
      15_000, 20_000, 50_000, 100_000, 150_000, 200_000, 500_000, 1_000_000,
      1_250_000, 1_500_000, 1_750_000, 2_000_000, 2_250_000, 2_500_000,
      2_750_000, 3_000_000, 3_500_000, 4_000_000, 5_000_000, 10_000_000,
    ];

    const c = castToNumber(state);
    const _data = [];

    for (const amount of amounts) {
      try {
        const result = getCoverFee({ amount, ...c, duration: 1 });
        _data.push({ x: amount, y: result.rate * 100, ...result });
      } catch (err) {
        // console.error({ err });
      }
    }
    setChartData(_data);
  }, [data]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="stockChart"
        ref={chartRef}
      />
    </div>
  );
};

export default PriceCurveChart;
