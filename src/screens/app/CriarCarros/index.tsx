import {
    View, Text, Pressable, StyleSheet, Alert, ToastAndroid, PermissionsAndroid, Image, ScrollView, ImageBackground,
    Button, FlatList, Dimensions
} from "react-native";
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
    DatePickerView, PhotoPickerView, OpenCameraButton, OpenGalleryButton,
    ModalImageBackground
} from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from "react-native-date-picker";
import { useTheme } from "../../../hooks/themeContext";

import ImagePicker from 'react-native-image-crop-picker';


import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export function CriarCarros({ navigation, route }: { navigation: any, route: any }) {
    const [date, setDate] = useState(new Date())
    const { id } = route.params ? route.params : ""
    const [dataSource, setDataSource] = useState([])
    const popUp = useRef(true)
    const [realEdit, setRealEdit] = useState<boolean>(false)
    const { currentTheme } = useTheme()
    const [image, setImage] = useState<FormData>()
    const [response, setResponse] = useState<object[]>([]);
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
            user_id: "",
            image: ""
        },
    })


    const createOrEditCar = useCallback((data: any) => {
        async function create() {
            try {
                console.log(data, "data")
                await axios.post(glbVars.BACKEND_URL + "carsadmin", {
                    names: data.names,
                    brand: data.brand,
                    year: data.year,
                    user_id: data.user_id,
                    image: data.image
                })
                ToastAndroid.show("Carro Criado!", ToastAndroid.SHORT);

                navigation.navigate("ListarCarros")

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
                    image: data.image,
                    id: id
                })
                ToastAndroid.show("Carro Editado!", ToastAndroid.SHORT);

                navigation.navigate("ListarCarros")


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
        console.log("realedit", realEdit)

        realEdit ? edit() : create()


        // if (realEdit) {'
        //     console.log("é editar", realEdit)
        //     edit()
        // } else {
        //     console.log("é criar", realEdit)
        //     create()
        // }


        console.log(data)

    }, [realEdit])

    // faltou declarar como dependencia


    const fetchusers = useCallback((): void => {
        async function fetch() {
            const response = await axios.get(glbVars.BACKEND_URL + "users/index")

            console.log(response.data)

            setDataSource(response.data)

        }
        fetch()
    }, [])


    const onSubmit = (data: any) => {
        // deve ser response.Correct ou algo assim
        console.log(response)

        if (response[0]) {
            console.log("foi colocado foto no onSumit")
            console.log(response[0])


            response[0].map((image: any) => {

                const imagename = String(Math.random()).replace(".", "")

                const formData = new FormData()
                formData.append('file', {
                    type: image.mime,
                    uri: image.path,
                    name: imagename
                });

                console.log("FORM DATA=>>>>>>>>>", formData)

                fetch(glbVars.BACKEND_URL + "carsadmin/image", {
                    method: "post",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data "
                    }
                })

                console.log("depois do fetch")

            }
            )

        }
        createOrEditCar({ names: data.names, brand: data.brand, year: data.year ? data.year : date, user_id: data.user_id })




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
                setImage(dbCar.data.image)

            }
            return true
        }
        isedit()

    }, [])

    const handleCamera = useCallback(() => {
        async function requestCameraPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissão para criar arquivos?',
                        message:
                            'Precisamos de sua permissão para adicionar fotos na criação de carros ',
                        buttonNeutral: 'Me Pergunte Depois',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Ok',
                    }
                );
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permissão para ler arquivos?',
                    message:
                        'Precisamos de sua permissão para adicionar fotos na criação de carros ',
                    buttonNeutral: 'Me Pergunte Depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Ok',
                }
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };
        async function handle() {


            try {
                const result = await ImagePicker.openCamera({
                    multiple: true,
                    useFrontCamera: true,
                    mediaType: "photo"
                }).then(images => {
                    setResponse(arrayAntigo => [...arrayAntigo, images]);
                });


                // if (result.assets) {
                //     const formData = new FormData()
                //     formData.append('file', {
                //         type: result.assets[0].type,
                //         uri: result.assets[0].uri
                //     });

                //     console.log(formData._parts[0][1])

                //     setImage(formData)

                // }

            } catch (e: any) {
                console.log(e)
            }


        }
        requestCameraPermission()
        handle()
    }, [])

    const handleGallery = useCallback(() => {
        async function requestCameraPermission() {
            try {
                console.log("try")
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissão para criar arquivos?',
                        message:
                            'Precisamos de sua permissão para adicionar fotos na criação de carros ',
                        buttonNeutral: 'Me Pergunte Depois',
                        buttonNegative: 'Cancelar',
                        buttonPositive: 'Ok',
                    }
                );
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permissão para ler arquivos?',
                    message:
                        'Precisamos de sua permissão para adicionar fotos na criação de carros ',
                    buttonNeutral: 'Me Pergunte Depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Ok',
                }
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };
        async function handle() {
            try {
                const result = await ImagePicker.openPicker({
                    multiple: true,
                    mediaType: "photo"
                }).then(images => {
                    setResponse(arrayAntigo => [...arrayAntigo, images]);
``                });

            } catch (e: any) {
                console.log(e)
            }

        }
        requestCameraPermission()
        handle()

    }, [])

    const handlePhotoDelete = useCallback((image: any) => {

        async function handle() {
            await axios.delete(glbVars.BACKEND_URL + `carsAdmin/image/${image}`)
        }
        handle()

    }, [])

    useEffect(() => {
        console.log("jahajkhajkhn")
        fetchusers()
        isEdit()
        console.log(realEdit)
        console.log(dataSource)

        realEdit ? console.log("sim") : console.log("nao")


    }, [])

    type ItemData = {
        // id: string;
        uri: string;
    };
    const DATA: ItemData[] = [
        {
            // id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            uri: "http://192.168.1.20:3002/carimg/06034881160044515.png",
            // http://192.168.1.20:3002/carimg/06034881160044515.png

        },
        {
            // id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            uri: 'https://thenaritadogfight.com/wp-content/uploads/2023/06/NDF-Asai-1.jpg',
        },
        {
            // id: '58694a0f-3da1-471f-bd96-145571e29d72',
            uri: 'https://thenaritadogfight.com/wp-content/uploads/2023/06/NDF-Asai-4.jpg',
        },
    ];

    return (
        <CenteredView >
            <ModalView >
                <ScrollView >
                    <ModalText>Nome</ModalText>
                    <View style={{ width: "100%" }}>
                    </View>
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
                        name="names"
                    />


                    <ModalText>Marca</ModalText>
                    <Controller
                        control={control}
                        rules={{
                            required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onPress={console.log(realEdit)}
                                // só funcionou depois que coloquei esse onPress???

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
                            required: false,
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
                            required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (

                            <RNPickerView>

                                <RNPickerSelect
                                    placeholder="Selecione um item..."
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

                    <ModalText>Foto</ModalText>


                    <Controller
                        control={control}
                        rules={{
                            required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (

                            <PhotoPickerView>

                                <OpenCameraButton
                                    onPress={() => handleCamera()}>
                                    <Ionicons name="camera-outline" color={currentTheme.colors.lightest} size={30}
                                        style={{ textAlign: "center", alignContent: "center" }}
                                    />
                                </OpenCameraButton>

                                <OpenGalleryButton
                                    onPress={() => handleGallery()}
                                >
                                    <Entypo name="folder-images" color={currentTheme.colors.lightest} size={30}
                                        style={{ textAlign: "center", alignContent: "center" }}
                                    />
                                </OpenGalleryButton>
                            </PhotoPickerView>
                        )}
                        name="image" />
                    <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        style={{ width: 50, height: 50, zIndex: 999, position: "absolute" }}
                        source={{ uri: response[0] ? response[0].path : null }}
                    />
                    <FlatList
                        data={
                            DATA
                        }
                        horizontal={true}

                        snapToAlignment="center"
                        decelerationRate={"fast"}
                        snapToInterval={Dimensions.get("window").width}

                        renderItem={({ item }) =>
                            <View style={{ marginBottom: "10%" }}>
                                <View
                                    style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height / 2 }}
                                >


                                    <ImageBackground
                                        // width={Dimensions.get("window").width}
                                        // height={Dimensions.get("window").height/2}
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode="cover"
                                        // style={{ marginTop: 100 }}
                                        source={item}
                                    />

                                </View>
                                <Button
                                    onPress={() => handlePhotoDelete(image)}
                                    title="Apagar Foto"
                                />
                            </View>

                        }
                    />

                </ScrollView>



                <View style={{ display: "flex", flexDirection: "row", height: 100 }}>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <TextStyle>{realEdit ? "Editar" : "Criar"}</TextStyle>
                    </Pressable>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => console.log("boa")}
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