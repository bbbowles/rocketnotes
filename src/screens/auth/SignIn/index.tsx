import { View, Text, TextInput, ImageBackground, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BigText, Container, ContainerImage, LoginButton, TextButton } from "./styles"
import { Input } from "../../../components/input";
import { useForm, Controller } from "react-hook-form"
import { LoginInput } from "../../../components/input/styles";
import { useCallback, useEffect } from "react";
import { api } from "../../../services/api";
import axios from "axios";
import { useAuth } from "../../../hooks/auth";
import { glbVars } from "../../../../globalVars";
import { useTheme } from "../../../hooks/themeContext";
import { Button } from "../../../components/button";
import { isDarkTheme } from "../../../services/isDarkTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function SignIn({ navigation }: { navigation: any }) {

    const { currentTheme } = useTheme()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const fetchUserSession = useCallback((data: any) => {
        async function fetchUser() {
            const response = await axios.post(`${glbVars.BACKEND_URL}sessions`, { email: data.email, password: data.password })
            console.log(response)
        }
        fetchUser()
    }, [])

    const { signInFunction } = useAuth()

    const onSubmit = (data: any) => {
        signInFunction(data)
    }


    return (
        <Container>
            <ContainerImage
                // style={styles.imgBackground}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
                source={isDarkTheme() ? require('../../../images/backgroundDark.png') : require('../../../images/backgroundLight.png')}>

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
                            placeholder="Email"
                            placeholderTextColor={currentTheme.colors.lightest}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text>This is required.</Text>}

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <LoginInput
                            placeholder="Senha"
                            placeholderTextColor={currentTheme.colors.lightest}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text>This is required.</Text>}


                <View style={{ width: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                    <LoginButton onPress={handleSubmit(onSubmit)}>
                        <TextButton>Logar</TextButton>
                    </LoginButton>

                    {/* <Input
                    placeholder="Login"
                // keyboardType="numeric"
                />
                <Input
                    placeholder="Senha"
                // keyboardType="numeric"
                />
                <LoginButton title="Entrar" />
                */}

                    <Button title="Criar Conta"
                        onPressAction={() => navigation.navigate('SignUp')}
                    />
                </View>


            </ContainerImage>


        </Container>
    )
}