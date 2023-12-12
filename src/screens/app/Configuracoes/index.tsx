import { View } from "react-native"
import { Button } from "../../../components/button"
import { useTheme } from "../../../hooks/themeContext"
import {
    BackgroundView, BigText, PressableButton,
    PressableButton2, ButtonsView, Text
} from "./styles"
import { useAuth } from "../../../hooks/auth"
export function Configuracoes() {
    const { toggleTheme } = useTheme()
    const { signOutFunction } = useAuth()
    return (
        <BackgroundView>
            <BigText>Rocket Notes</BigText>
            <ButtonsView>
                <PressableButton onPress={() => toggleTheme()}>
                    <Text>Mudar Tema</Text>
                </PressableButton>
                <PressableButton2 onPress={() => signOutFunction()}>
                    <Text>Sair</Text>
                </PressableButton2>
            </ButtonsView>
        </BackgroundView>

    )
}
 