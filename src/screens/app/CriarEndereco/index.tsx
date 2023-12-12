import {
    FooterView, CenteredView, ModalView, ModalText,
    ModalText2, ButtonStyle, TextStyle, CloseButton
    , RNPickerView
} from "./styles";
import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
import { Form, useForm, Controller } from "react-hook-form"
import { Input } from "../../../components/input";
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, Pressable, StyleSheet, Alert, ScrollView, StatusBar } from "react-native";
import { glbVars } from "../../../../globalVars";
import { useTheme } from "../../../hooks/themeContext";



export function CriarEndereco({ route }: { route: any }) {
    const { id } = route.params ? route.params : ""
    const [dataSource, setDataSource] = useState([])

    const { currentTheme } = useTheme()


    const [realEdit, setRealEdit] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cep: "",
            nome: "",
            cidade: "",
            bairro: "",
            estado: "",
            numero: "",
            complemento: "",
            user_id: ""
        },
    })

    const createOrEditAddress = useCallback((data: any) => {
        async function create() {
            await axios.post(glbVars.BACKEND_URL + `addr`, {
                cep: data.cep ? data.cep : "",
                nome: data.nome ? data.nome : "",
                cidade: data.cidade ? data.cidade : "",
                bairro: data.bairro ? data.bairro : "",
                estado: data.estado ? data.estado : "",
                numero: data.numero ? Number(data.numero) : "",
                complemento: data.complemento ? data.complemento : null,
                user_id: data.user_id ? data.user_id : ""
            })
        }
        async function edit() {
            await axios.put(glbVars.BACKEND_URL + `addr/${id}`, {
                cep: data.cep ? data.cep : null,
                nome: data.nome ? data.nome : null,
                cidade: data.cidade ? data.cidade : null,
                bairro: data.bairro ? data.bairro : null,
                estado: data.estado ? data.estado : null,
                numero: data.numero ? Number(data.numero) : null,
                complemento: data.complemento ? data.complemento : null,
                user_id: data.user_id ? data.user_id : null
            })
        }
        if (realEdit) {
            edit()
        } else {
            create()
        }
    }, [])

    const fetchusers = useCallback((): void => {
        async function fetch() {
            const response = await axios.get(glbVars.BACKEND_URL + "users/index")

            setDataSource(response.data)

        }
        fetch()
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
        createOrEditAddress(data)
        // createOrEditCar({ names: data.names, brand: data.brand, year: data.year, user_id: data.user_id })
    }

    const isEdit = useCallback(() => {
        async function isedit() {
            if (id) {
                console.log(id)
                const result = await isrealedit(id)
                if (result) {
                    console.log(" is real edit")
                    setRealEdit(true)
                }

            }
        }
        async function isrealedit(id: any) {
            const dbAddress = await axios.get((glbVars.BACKEND_URL + `addr/${id}`))
            if (dbAddress.data.id) {
                console.log("addr existe")
                console.log(dbAddress.data, "dbAddressdata")
                setValue("cep", String(dbAddress.data.cep))
                setValue("nome", dbAddress.data.nome)
                setValue("cidade", dbAddress.data.cidade)
                setValue("bairro", dbAddress.data.bairro)
                setValue("estado", dbAddress.data.estado)
                setValue("numero", String(dbAddress.data.numero))
                setValue("complemento", dbAddress.data.complemento)
                setValue("user_id", dbAddress.data.user_id)
            }
            return true
        }
        isedit()

    }, [])
    useEffect(() => {
        fetchusers()
        isEdit()
        console.log(id)

    }, [])


    return (
        <CenteredView >

            <ModalView >
                <ScrollView style={{ width: "100%" }}>
                    <ModalText>CEP</ModalText>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="cep"
                    />

                    <ModalText>Nome da Rua</ModalText>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="nome"
                    />

                    <ModalText>Cidade</ModalText>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="cidade"
                    />

                    <ModalText>Bairro</ModalText>


                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="bairro"
                    />

                    <ModalText>Estado</ModalText>


                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="estado"
                    />

                    <ModalText>Número</ModalText>


                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="numero"
                    />

                    <ModalText>Complemento</ModalText>


                    <Controller
                        control={control}
                        rules={{
                            required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: currentTheme.colors.lightest }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="complemento"
                    />

                    <ModalText>Dono</ModalText>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerView>

                                <RNPickerSelect
                                    // placeholder="Selecione um item..."
                                    onValueChange={onChange}
                                    style={{ inputAndroid: { color: currentTheme.colors.lightest } }}
                                    value={value}
                                    items={dataSource.map((data: any) => {

                                        return { label: data.name, value: data.id }
                                    })}
                                />
                            </RNPickerView>

                        )}
                        name="user_id"
                    />
                </ScrollView>



                <View style={{ display: "flex", flexDirection: "row" }}>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <TextStyle>{realEdit ? "Editar" : "Criar"}</TextStyle>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                    // onPress={() => setModalVisible(!modalVisible)}
                    >
                        <TextStyle>Cancelar</TextStyle>
                    </Pressable>

                </View>

            </ModalView>
        </CenteredView>
    )
}
const styles = StyleSheet.create({

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: "40%",
        marginLeft: "2%",
        marginRight: "2%",
        marginTop: "4%"


    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    }
});