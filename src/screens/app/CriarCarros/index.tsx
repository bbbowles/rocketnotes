import {
    View, Text, Pressable, StyleSheet, Alert, ToastAndroid, PermissionsAndroid, Image, ScrollView, ImageBackground,
    Button, FlatList, Dimensions
} from "react-native";
import { useForm, Controller } from "react-hook-form"
import { Input } from "../../../components/input";
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
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



export function CriarCarros({ navigation, route }: { navigation: any, route: any }) {
    const [date, setDate] = useState(new Date())
    const { id } = route.params ? route.params : ""
    const [dataSource, setDataSource] = useState([])
    const [realEdit, setRealEdit] = useState<boolean>(false)
    const { currentTheme } = useTheme()
    interface imageInterface {
        image: string;
        id?: number;
    }
    type responseType = {
        id?: number;
        image: string;
    }
        
    const [images, setImages] = useState<imageInterface[]>([])
    const [response, setResponse] = useState<any>([]);
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


    const postCarImages = useCallback((id: any) => {
        async function post() {
            console.log("caiu no postcar images")

            console.log(response)

            if (response[0]) {
                try {
                    const formData = new FormData()
                    response[0].map((image: any) => {

                        formData.append('files', {
                            type: image.mime,
                            uri: image.path,
                            name: image.name
                        });

                    }
                    )
                    console.log("fazendo post...", response[0])
                    await fetch(glbVars.BACKEND_URL + "carsadmin/image/" + id, {
                        method: "post",
                        body: formData,
                        headers: {
                            "Content-Type": "multipart/form-data "
                        }
                    })

                } catch (e: any) {
                    new Error(e)
                }
            }



        }
        post()
    }, [response])


    const createOrEditCar = useCallback((data: any) => {
        async function create() {
            try {
                console.log(data, "data")
                const newCarId = await axios.post(glbVars.BACKEND_URL + "carsadmin", {
                    names: data.names,
                    brand: data.brand,
                    year: data.year,
                    user_id: data.user_id,
                    image: data.image
                })


                postCarImages(newCarId)


                ToastAndroid.show("Carro Criado!", ToastAndroid.SHORT);

                navigation.navigate("ListarCarros")

            }
            catch (e: any) {
                console.log(e.response.data.message)
                ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

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
                console.log(response)

                postCarImages(id)

                ToastAndroid.show("Carro Editado!", ToastAndroid.SHORT);

                navigation.navigate("ListarCarros")


            } catch (e: any) {
                console.log(e.response.data.message)
                ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);



            }
        }
        console.log("realedit", realEdit)

        realEdit ? edit() : create()



        console.log(data)

    }, [realEdit, response])

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
        console.log("response===>", response)

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
            const dbCarImages = await axios.get((glbVars.BACKEND_URL + `cars/images/${id}`))
            if (dbCar.data.id) {
                console.log("carro existe")
                console.log(dbCar.data, "dbcardata")
                console.log(dbCar.data.year)
                setImages(dbCarImages.data)
                setValue("names", dbCar.data.names)
                setValue("brand", dbCar.data.brand)
                setValue("user_id", dbCar.data.user_id)
                setDate(new Date(dbCar.data.year)) //nao sei como o banco esta recebendo strings como int mas n vou mudar agora
                console.log("db image", dbCarImages.data)

                // let uri = []
                // uri = dbCarImages.data!.map((i: any) => {

                //     return glbVars.BACKEND_URL + `carimg/${i.image}`

                // })




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
                }).then(localImages => {
                    setResponse((arrayAntigo:any) => [...arrayAntigo, localImages]);
                    localImages.map(i => {
                        console.log(i)
                        setImages([...images, { image: i.path }]);


                    })
                });


                // if (result.assets) {
                //     const formData = new FormData()
                //     formData.append('file', {
                //         type: result.assets[0].type,
                //         uri: result.assets[0].uri
                //     });

                //     console.log(formData._parts[0][1])

                //     setImages(formData)

                // }

            } catch (e: any) {
                console.log(e)
            }


        }
        requestCameraPermission()
        handle()
    }, [images])

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
                }).then(localImages => {
                    setResponse((arrayAntigo:any) => [...arrayAntigo, localImages]);
                    console.log(localImages)
                    localImages.map(i => {
                        console.log(i)
                        setImages([...images, { image: i.path }]);


                    })
                    // setImages([...images, localImages.image]);

                });

            } catch (e: any) {
                console.log(e)
            }

        }
        requestCameraPermission()
        handle()

    }, [images])


    const handlePhotoDelete = useCallback((image: any) => {

        async function handle() {
            if (isNaN(image)) {
                let tmp = images
                tmp.pop()
                setImages(images)
            } else {
                await axios.delete(glbVars.BACKEND_URL + `carsAdmin/image/${image}`)
            }
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

                    <FlatList
                        data={
                            images
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
                                        source={{
                                            uri: item.id ? glbVars.BACKEND_URL + `carimg/${item.image}` : item.image
                                        }}
                                    />

                                </View>
                                <Button
                                    onPress={() => handlePhotoDelete(item.id ? item.id : item.image)}
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