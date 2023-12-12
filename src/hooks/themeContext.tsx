import { useContext, createContext, useEffect, ReactNode, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ThemeContextProviderProps {
    children: ReactNode;
}
import { darkTheme } from "../../globalStyles";
import { lightTheme } from "../../globalStyles";

import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/native";

export const ThemeContext = createContext({
    currentTheme: darkTheme,
    toggleTheme: () => { },
})

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
    children,
}) => {
    const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(darkTheme);

    useEffect(() => {
        async function getLocalStorageTheme() {
            const localStorageTheme = await AsyncStorage.getItem("@rocketnotes:theme");

            if (localStorageTheme) {
                if (localStorageTheme == "dark") {
                    console.log("foi encontrado um localstorage e tema virou dark")
                    setCurrentTheme(darkTheme)
                    // setGlbStyles(darkTheme)
                } else {
                    console.log("foi encontrado um localstorage e tema virou light")
                    setCurrentTheme(lightTheme)
                    // setGlbStyles(lightTheme)
                }
            }

        }
        getLocalStorageTheme()
    }, [])

    const toggleTheme = useCallback(() => {
        if (currentTheme === lightTheme) {
            AsyncStorage.setItem("@rocketnotes:theme", "dark");
            setCurrentTheme(darkTheme);
        } else {
            AsyncStorage.setItem("@rocketnotes:theme", "light");
            setCurrentTheme(lightTheme);
        }
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            <ThemeProvider theme={currentTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
export function useTheme() {
    const theme = useContext(ThemeContext)

    return theme
}

