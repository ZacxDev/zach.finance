import { Volatility } from "src/gql/graphql";
import enUS from "date-fns/locale/en-US";
import { ChartConfiguration } from "chart.js";

export const getVolatilityChart = (
  volatilityData: Omit<Volatility, 'ticker'>[],
  tickers: string[],
  start: string,
  end: string,
): ChartConfiguration<"line", number[], Date> => {
  const datasets = volatilityData.map((volatility, index) => {
    const data = volatility.volatilityByInterval;
    return {
      label: `Volatility (${tickers[index]})`,
      data: data.map((d) => d.value),
      borderColor: `hsl(${(index * 360) / tickers.length}, 100%, 50%)`,
      borderWidth: 1.5,
      fill: false,
    };
  });

  const chartData: ChartConfiguration<"line", number[], Date> = {
    type: "line",
    data: {
      labels: volatilityData[0].volatilityByInterval.map((d) => new Date(d.startTimestamp * 1000)),
      datasets: datasets,
    },
    options: {
      scales: {
        x: {
          type: "time",
          grid: {
            color: 'rgb(153 153 153 / 40%)',
          },
          adapters: {
            date: {
              locale: enUS,
            },
          },
          ticks: {
            callback: function(value) {
              return new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(value));
            },
            maxTicksLimit: 32,
          },
          min: start,
          max: end,
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgb(153 153 153 / 40%)',
          },
        },
      },
    },
  }

  return chartData
}
