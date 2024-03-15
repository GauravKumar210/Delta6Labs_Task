import React, { useState, useEffect } from "react";
import axios from "axios";
import convertToMillions from "./CurrencyConverter";
import LineChart from "./LineChart";
import "./styles/CoinList.css";

interface MarketPair {
  currency1: string;
  pricing?: number[];
  open: number,
  high: number,
  coin_slug: string;
  last: number;
  volume: number;
  change: number;
}

const API = "https://api-staging.bitdelta.com/api/v1/market/pairs";
const API_KEY = "BitdeltaExchange";

const CoinList: React.FC = () => {
  const [marketPairs, setMarketPairs] = useState<MarketPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: { spot: MarketPair[] } }>(
          API,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        setMarketPairs(response.data.data.spot);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Spot Market</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>Change</th>
                <th>Open Price</th>
                <th>Last Price</th>
                <th>Volume</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {marketPairs.map((pair) => {
                return (
                  <tr key={pair.currency1}>
                    <td style={{ fontWeight: "bold" }}>
                      {pair.coin_slug}
                    </td>
                    <td>
                      {pair.currency1}
                    </td>

                    <td
                      style={
                        pair.change >= 0 ? { color: "green" } : { color: "red" }
                      }
                    >
                      {pair.last}
                    </td>
                    <td
                      style={
                        pair.change >= 0 ? { color: "green" } : { color: "red" }
                      }
                    >
                      {pair.change.toFixed(2)}
                    </td>
                    <td>{pair.open}</td>
                    <td>{pair.change}</td>
                    <td>{convertToMillions(pair.volume.toFixed(2))}</td>
                    <td className="graph"
                      style={
                        pair.change >= 0 ? { color: "green" } : { color: "red" }
                      }
                    >
                      <LineChart
                        data={{

                          data: pair.pricing,
                          change: pair.change,
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoinList;