import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { GrCurrency } from "react-icons/gr";

interface CurrencyData {
    id: number,
    name: string,
    symbol: string,
    usd_rate: number,
    default: boolean
}

const CoinSelector: React.FC = () => {
    const [currency, setCurrency] = useState<CurrencyData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState<string | null>("$");

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await axios.get<{ data: { currencies: CurrencyData[] } }>('https://api-staging.bitdelta.com/api/v1/public/fiat-currency');
                setCurrency(response.data.data.currencies)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchCoin();
    }, []);

    const handleCurrencySelect = (name: string, sym: string) => {
        setSelectedCurrency(name);
        setSelectedCurrencySymbol(sym);
    };

    const buttonWidth = useBreakpointValue({ base: '100%', sm: 'auto' });

    const menuListHeight = useBreakpointValue({ base: 'auto', sm: '200px' });

    return (
        <>
        {/* Using The component from Chakra UI */}
            <div style={{ margin: 10 }}>
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        backgroundColor='white'
                        _hover={{ bg: 'gray.300' }}
                        _expanded={{ bg: 'gray.400' }}
                        _focus={{ boxShadow: 'outline' }}
                        width={buttonWidth}
                        minW={"20%"}
                    >
                        <Flex flexDirection={"row"} justifyContent={"space-between"}>
                            <span>{selectedCurrency === null ? (<GrCurrency />) : (selectedCurrencySymbol)}</span>
                            <span>{selectedCurrency ? selectedCurrency : 'Currency Selector'}</span>
                            <ChevronDownIcon />
                        </Flex>
                    </MenuButton>
                    <MenuList height={menuListHeight} overflowY='auto'>
                        {
                            loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul>
                                    {currency.map((currency) => (
                                        <MenuItem key={currency.id} onClick={() => handleCurrencySelect(currency.name, currency.symbol)}>{currency.symbol}{currency.name}</MenuItem>
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
