import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/CoinCard.css';
import LineChart from './LineChart';

interface CoinData {
    symbol: string;
    order: number;
    currency1: string;
    keywords: string[];
    change: number;
    last: number;
    pricing: number[];
}

const CoinCard: React.FC = () => {
    const [coin, setCoin] = useState<CoinData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await axios.get<{ data: { spot: CoinData[] } }>(
                    'https://api-staging.bitdelta.com/api/v1/market/pairs',
                    {
                        headers: {
                            'x-api-key': 'BitdeltaExchange'
                        }
                    }
                );
                setCoin(response.data.data.spot);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchCoin();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading Coin Price...</p>
            ) : (
                <div className='card'>
                    {coin.slice(0, 4).map((coinItem) => (
                        <div key={coinItem.order} className='single-card'>
                            <div className='content'>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h1 className='coin-name'>{coinItem.keywords}</h1>
                                    <p>{coinItem.currency1}</p>
                                </div>
                                <p className='coin-price'>$ {coinItem.last.toFixed(2)}</p>
                                <p style={{ color: coinItem.change > 0 ? 'green' : 'red' }}>{coinItem.change.toFixed(2)}</p>
                            </div>
                            <div className='chart'>
                                <LineChart
                                    data={{
                                        data: coinItem.pricing,
                                        change: coinItem.change
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoinCard;
