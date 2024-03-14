import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GrCurrency } from "react-icons/gr";

interface Currency {
    id: number,
    name: string,
    symbol: string,
    usd_rate: number,
    default: boolean
}

const CoinSelector: React.FC = () => {
    const [currency, setCurrency] = useState<Currency[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [selectedCurrencySymbol,setSelectedCurrencySymbol]=useState<string|null>("$");


    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await axios.get<{ data: { currencies: Currency[] } }>('https://api.bitdelta.com/api/v1/public/fiat-currency');
                setCurrency(response.data.data.currencies)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchCoin();
    }, []);

    const handleCurrencySelect = (name: any,sym:any) => {
        setSelectedCurrency(name);
        setSelectedCurrencySymbol(sym);

    };

    return (
        <>
            <div style={{ margin: 10 }} >
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        // width="20%"
                        backgroundColor='gray.400'
                        _hover={{ bg: 'gray.300' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'outline' }}
                        width={"15%"}

                    // overflow={'auto'}
                    >
                        <Flex flexDirection={"row"} justifyContent={"space-between"}>
                            <span>{selectedCurrency === null ? (<GrCurrency/>) : (selectedCurrencySymbol)}</span>
                            <span>{selectedCurrency ? selectedCurrency : 'Currency Selector'}</span>
                            <ChevronDownIcon />
                        </Flex>

                    </MenuButton>
                    <MenuList height="200px" overflow='auto' >
                        {
                            loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul>
                                    {currency.map((currency) => (
                                        <MenuItem key={currency.id} onClick={() => handleCurrencySelect(currency.name,currency.symbol)}>{currency.symbol}{currency.name}</MenuItem>
                                    ))}
                                </ul>
                            )
                        }
                    </MenuList>
                </Menu>
            </div>

        </>
    );
};

export default CoinSelector;