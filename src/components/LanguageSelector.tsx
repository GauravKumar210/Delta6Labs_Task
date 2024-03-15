import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { RiGlobalLine } from "react-icons/ri";

interface LanguageData {
    lang: string,
    slug: string,
    default: boolean,
    rtl: boolean
}

const LanguageSelector: React.FC = () => {
    const [languages, setLanguages] = useState<LanguageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const response = await axios.get<{ data: LanguageData[] }>('https://api-staging.bitdelta.com/api/v1/public/lang');
                setLanguages(response.data.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchLanguage();
    }, []);

    const handleLanguageSelect = (slug: string) => {
        setSelectedLanguage(slug);
    };

    // Use Chakra UI's useBreakpointValue hook to dynamically adjust width based on screen size
    const buttonWidth = useBreakpointValue({ base: '100%', sm: 'auto' });

    return (
        <>
        {/* Using The component from Chakra UI */}
            <div style={{ margin: 10}}>
                <Menu >
                    <MenuButton as={Button}
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
                        <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems="center">
                            {selectedLanguage === null ? (<RiGlobalLine />) : (true)}{selectedLanguage ? languages.find(lang => lang.slug === selectedLanguage)?.lang : 'Language Selector'} <ChevronDownIcon />
                        </Flex>

                    </MenuButton>
                    <MenuList>
                        {
                            loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul>
                                    {languages.map((language) => (
                                        <MenuItem key={language.slug} onClick={() => handleLanguageSelect(language.slug)}>{language.lang}</MenuItem>
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

export default LanguageSelector;