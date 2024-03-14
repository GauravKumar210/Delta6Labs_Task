import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/CoinCard.css'

interface Coin {
    symbol: string,
    order: number,
    currency1: string,
    keywords: string[],
    change: number,
    last: number
}
const CoinCard: React.FC = () => {
    const [coin, setCoin] = useState<Coin[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await axios.get<{ data: { spot: Coin[] } }>('https://api.bitdelta.com/api/v1/market/pairs', {
                    headers: {
                        'x-api-key': 'BitdeltaExchange'
                    }
                });
                setCoin(response.data.data.spot)
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
            {
                loading ? (
                    <p>Loading Coin Price...</p>
                ) : (
                    <div>
                        <ul className='card'>
                            {coin.slice(0, 3).map((coin) => (
                                <li key={coin.order} className='single-card'>
                                    <div>
                                        <span style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                            <h1 style={{ font: "bold" }}>{coin.keywords}</h1>
                                            <p>{coin.currency1}</p>
                                        </span>
                                        <p>$ {coin.last}</p>
                                        <p key={coin.order} style={{color: coin.change>0? 'green':'red'}}>{coin.change.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        Graph
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                )
            }
        </div>
    )
}

export default CoinCard;