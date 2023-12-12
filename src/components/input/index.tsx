import { TextInput } from "react-native"
import { LoginInput } from "./styles"
export function Input({...rest}) {
    return (
        <LoginInput
            {...rest}
        />

    )
}