import { View, Text, Pressable, StyleSheet, Alert, ToastAndroid } from "react-native";
import { useForm, Controller } from "react-hook-form"
import { Input } from "../../../components/input";
import { Form } from "react-hook-form";
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import Swal from "sweetalert2";
import { PopUp } from "../../../components/popup";
import { glbVars } from "../../../../globalVars";
import {
    BackgroundView, FooterView, CenteredView,
    ModalView, ModalText, ModalText2, ButtonStyle,
    TextStyle, CloseButton, RNPickerView,
    DatePickerView
} from "./styles";
import DatePicker from "react-native-date-picker";
import { useTheme } from "../../../hooks/themeContext";

export function CriarCarros({ route }: { route: any }) {
    const [date, setDate] = useState(new Date())
    const { id } = route.params ? route.params : ""
    const [dataSource, setDataSource] = useState([])
    const popUp = useRef(true)
    const [realEdit, setRealEdit] = useState<boolean>(false)
    const { currentTheme } = useTheme()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            names: "",
            brand: "",
            year: "",
            user_id: ""
        },
    })


    const createOrEditCar = useCallback((data: any) => {
        async function create() {
            try {
                await axios.post(glbVars.BACKEND_URL + "carsadmin", {
                    names: data.names,
                    brand: data.brand,
                    year: data.year,
                    user_id: data.user_id
                })
                ToastAndroid.show("Carro Criado!", ToastAndroid.SHORT);

            }
            catch (e: any) {
                console.log(e.response.data.message)
                ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

                // Swal.fire({
                //     title: e.response.data.message,
                //     icon: 'warning',
                //     confirmButtonText: 'Ok',

                // })
            }
        }
        async function edit() {
            try {
                await axios.post(glbVars.BACKEND_URL + "carsadmin/edit", {
                    names: data.names,
                    brand: data.brand,
                    year: data.year,
                    user_id: data.user_id,
                    id: id
                })
                ToastAndroid.show("Carro Editado!", ToastAndroid.SHORT);


                // navigate("/listarcarro")

            } catch (e: any) {
                console.log(e.response.data.message)
                ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);


                // Swal.fire({
                //     title: e.response.data.message,
                //     icon: 'warning',
                //     confirmButtonText: 'Ok',

                // })
            }
        }

        if (realEdit) {
            console.log("é editar")
            edit()
        } else {
            console.log("é criar")

            create()
        }


        console.log(data)

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
        createOrEditCar({ names: data.names, brand: data.brand, year: data.year, user_id: data.user_id })
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
            const dbCar = await axios.get((glbVars.BACKEND_URL + `cars/show/${id}`))
            if (dbCar.data.id) {
                console.log("carro existe")
                console.log(dbCar.data, "dbcardata")
                console.log(dbCar.data.year)
                setValue("names", dbCar.data.names)
                setValue("brand", dbCar.data.brand)
                setDate(new Date(dbCar.data.year)) //nao sei como o banco esta recebendo strings como int mas n vou mudar agora
                setValue("user_id", dbCar.data.user_id)
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

                <ModalText>Nome</ModalText>
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
                    name="names"
                />

                <ModalText>Marca</ModalText>
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
                    name="brand"
                />

                <ModalText>Ano</ModalText>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePickerView>

                            <DatePicker
                                date={date}
                                mode="date"
                                onDateChange={onChange}
                                textColor={currentTheme.colors.lightest}
                                fadeToColor="none"
                            />

                        </DatePickerView>

                    )}
                    name="year"
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
                                style={{inputAndroid:{color:currentTheme.colors.lightest}}}
                                value={value}
                                items={dataSource.map((data: any) => {

                                    return { label: data.name, value: data.id }
                                })}
                            />
                        </RNPickerView>
                    )}
                    name="user_id"
                />




                <View style={{ display: "flex", flexDirection: "row" }}>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <TextStyle>{realEdit ? "Editar" : "Criar"}</TextStyle>
                    </Pressable>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={()=>console.log("boa")}
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