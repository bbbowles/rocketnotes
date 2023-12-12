import { View, Text, TextInput, ImageBackground, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BigText, Container, ContainerImage, LoginButton, LoginInput, ContainerButton, TextButton } from "./styles"
import { Input } from "../../../components/input";
import { useForm, Controller } from "react-hook-form"
import { useTheme } from "../../../hooks/themeContext";
import { isDarkTheme } from "../../../services/isDarkTheme";
// import { Button } from "../../../components/button";
export function SignUp({ navigation }: { navigation: any }) {
    // se eu passar o containerimage sem ser uma child do Container, apenas sendo do View, ele quebra
    const { currentTheme } = useTheme()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })
    const onSubmit = (data: any) => console.log(data)
    return (
        <Container>
            <ContainerImage
                // style={styles.imgBackground}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
                source={isDarkTheme() ? require("../../../images/backgroundDark.png") : require("../../../images/backgroundLight.png")}>


                <BigText>
                    Rocket Notes
                </BigText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LoginInput
                            placeholder="Username"
                            placeholderTextColor={currentTheme.colors.lightest}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="username"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LoginInput
                            placeholder="Email"
                            placeholderTextColor={currentTheme.colors.lightest}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LoginInput
                            placeholder="Password"
                            placeholderTextColor={currentTheme.colors.lightest}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                    <View style={{ width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                        <LoginButton onPress={handleSubmit(onSubmit)}>
                            <TextButton>Criar</TextButton>
                        </LoginButton>


                        <Button title="Logar"
                            onPress={() => navigation.navigate('SignIn')}

                        />
                    </View>
            </ContainerImage>

        </Container>
    )
}