import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Dropdown from "react-select";

const Chart = () => {
  const ref = useRef();

  const [selectedAsset, setSelectedAsset] = useState("bnbbtc");
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [chartData, setChartData] = useState([]);

  const assets = [
    { value: "bnbbtc", label: "BNB/BTC" },
    { value: "btcusdt", label: "BTC/USDT" },
    { value: "ethusdt", label: "ETH/USDT" },
    { value: "xrpusdt", label: "XRP/USDT" },
    { value: "eosusdt", label: "EOS/USDT" },
    { value: "trxusdt", label: "TRX/USDT" },
  ];
  console.log(selectedAsset);

  const duration = [
    { value: "1m", label: "1m" },
    { value: "3m", label: "3m" },
    { value: "5m", label: "5m" },
    { value: "15m", label: "15m" },
  ];

  const handleAssetChange = (selectedAsset) => {
    setSelectedAsset(selectedAsset.value);
  };

  const handleIntervalChange = (selectedInterval) => {
    setSelectedInterval(selectedInterval.value);
  };

  useEffect(() => {
    const chartProps = {
      width: window.innerWidth * 0.8,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    const tokenName = selectedAsset;
    const interval = selectedInterval;
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${tokenName}@kline_1m`
    );

    const prepareChart = (chart, ws) => {
      const candleStickChart = chart.addCandlestickSeries();

      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${tokenName.toUpperCase()}&interval=${selectedInterval}&limit=1000`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const cdata = data.map((d) => {
            return {
              time: d[0] / 1000,
              open: parseFloat(d[1]),
              high: parseFloat(d[2]),
              low: parseFloat(d[3]),
              close: parseFloat(d[4]),
            };
          });
          candleStickChart.setData(cdata);
        })
        .catch((err) => console.log(err));

      ws.onmessage = (e) => {
        const response = JSON.parse(e.data);
        const { t, o, h, l, c } = response.k;
        const binanceData = {
          time: t,
          open: parseFloat(o),
          high: parseFloat(h),
          low: parseFloat(l),
          close: parseFloat(c),
        };

        setChartData(chartData.push(binanceData));

        candleStickChart.update(binanceData);
      };
    };
    const chart = createChart(ref.current, chartProps);
    prepareChart(chart, ws);
  }, [selectedAsset, selectedInterval]);

  return (
    <div>
      <div className="h-20 w-full bg-gray-900 border-gray-900 border-b-4">
        <div className="flex flex-row justify-between px-32 pt-5">
          <div className="text-white text-xl pt-1">
            Binance Candlestick Chart
          </div>
          <div className="flex flex-row space-x-10 z-50">
            <Dropdown onChange={handleAssetChange} options={assets} />
            <Dropdown onChange={handleIntervalChange} options={duration} />
          </div>
        </div>
      </div>
      <div className="pl-20 pt-10" ref={ref} />
    </div>
  );
};

export default Chart;
