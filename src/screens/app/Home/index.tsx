import { Text, ScrollView } from "react-native";
import { BottomTab } from "../../../components/bottomTab";
import { ViewCustom, BigText } from "./styles";
import { useAuth } from "../../../hooks/auth";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../../hooks/themeContext";
import { StatusBar } from "react-native";
import { isDarkTheme } from "../../../services/isDarkTheme";

export function Home() {
    const [user, setUser] = useState<string | null>("Erro_ao_encontrar_username")

    const { currentTheme } = useTheme()


    const whatsTheUserName = useCallback((): void => {
        async function fetch() {
            const user = await AsyncStorage.getItem("@rocketnotes:user")!
            setUser(user)
        }
        fetch()

    }, [])

    useEffect(() => {
        whatsTheUserName()
    }, [])

    return (
        <ViewCustom>
            <StatusBar
                backgroundColor={currentTheme.colors.dark}
                barStyle={isDarkTheme() ? "light-content" : "dark-content"}
            />
            <ScrollView>
                <BigText>
                    Bem-Vindo {user} !
                </BigText>
            </ScrollView>
        </ViewCustom>
    )
}