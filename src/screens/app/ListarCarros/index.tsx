import { Component, useCallback, useEffect, useState, useRef } from "react";
import { FlatList, RefreshControl, ActivityIndicator, View, Pressable, Modal, ImageBackground, Text, Dimensions, Button } from "react-native";
import {
    PressableBottom, PressableTop, BigText,
    GridViewContainerFlex, GridViewContainer, SmallText,
    ReallySmallText, TextWhiteShadow, BackgroundView,
    ModalView, CustomImage, ModalText, ExitModalButton,
    ModalTextView
} from "./styles";
import axios from "axios";
import { darkTheme } from "../../../../globalStyles";
import { glbVars } from "../../../../globalVars";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "../../../hooks/themeContext";


export function ListarCarros({ navigation, route }: { navigation: any, route: any }) {

    const { currentTheme } = useTheme()

    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState<any>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState()

    // const [data, setData] = useState()

    const noData = (): Boolean => {
        if (route.params == undefined) {
            console.log("nodata", route.params)


            return true
        } else {
            console.log("nodata", route.params)


            return false
        }
    }
    const data = noData() ? null : route.params
    // setData(abla)
    console.log(route.params)



    const onRefresh = useCallback(() => {

        async function awaitCars() {
            const response = await fetchCars()
            // setDataSource(response)
        }

        awaitCars()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    // const fetchusers = useCallback((): void => {
    //     async function fetch() {
    //         const response = await axios.get(glbVars.BACKEND_URL + "users/index")

    //         setDataSourceUsers(response.data)

    //     }
    //     fetch()
    // }, [])
    const fetchCars = useCallback((data?: any) => {
        async function fetch() {
            const response = await axios.get(glbVars.BACKEND_URL + `cars?names=${data?.names ? data.names : ""}&brand=${data?.brand ? data.brand : ""}&year=${data?.year ? data.year : ""}&nome=${data?.nome ? data.nome : ""}`)
            console.log("resposta fetch cars", response.data)
            // return response.data

            setDataSource(response.data)
        }
        fetch()

    }, [])
    const deleteCar = useCallback((data: any): void => {
        async function deletecar() {
            await axios.delete(glbVars.BACKEND_URL + `carsadmin/${data}`)
            fetchCars()

        }
        deletecar()
    }, [])

    useEffect(() => {
        async function awaitCars() {
            // const response = await fetchCars()
            // setDataSource(response)
            console.log("useEffect", data)
            fetchCars(data)
        }
        awaitCars()
        // fetchusers()


    }, [deleteCar, data])



    console.log("alo")
    return (
        <BackgroundView>
            {/* <ScrollView
                // contentContainerStyle={styles.scrollView}
                nestedScrollEnabled
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }> */}

            <View>
                {
                    selectedItem && <CustomModal isVisible={modalVisible} item={selectedItem} onClose={() => {
                        setModalVisible(!modalVisible)
                    }} />
                }

                <Text
                    style={{ fontSize: 16, color: currentTheme.colors.lightest, textAlign: "center" }}
                >
                    Clique em um carro para ver sua foto!</Text>


                <FlatList
                    data={dataSource}


                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) =>



                        <GridViewContainer>
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true)
                                    setSelectedItem(item)
                                    console.log(item)
                                }}
                            >



                                <View style={{ display: "flex", flexDirection: "row" }}>


                                    <GridViewContainerFlex>
                                        <BigText
                                            ellipsizeMode="tail"
                                        >
                                            {item.names}
                                        </BigText>

                                        <SmallText
                                            ellipsizeMode="tail"
                                        >
                                            {item.brand}
                                        </SmallText>


                                        <SmallText
                                            ellipsizeMode="tail"
                                        >
                                            {item.year}
                                        </SmallText>



                                        <ReallySmallText
                                            ellipsizeMode="tail"
                                        >
                                            {item.name}

                                        </ReallySmallText>

                                        {/* <View style={{ display: "flex", flexDirection: "row" }}>
                                <Button title="Editar" onPressAction={() => navigation.navigate("CriarCarros", {
                                    id: item.id,
                                })} />

                                <Button title="deletar" />
                            </View> */}

                                    </GridViewContainerFlex>

                                    <View style={{ display: "flex" }}>
                                        <PressableTop onPress={() => navigation.navigate("CriarCarros", {
                                            id: item.id
                                        })}>
                                            <MaterialCommunityIcons name="pencil" color={"white"} size={30} />

                                        </PressableTop>


                                        <PressableBottom onPress={() => deleteCar(item.id)}>
                                            <MaterialCommunityIcons name="trash-can-outline" color={"white"} size={30} />

                                        </PressableBottom>
                                    </View>
                                </View>
                            </Pressable>
                        </GridViewContainer>


                    }
                    numColumns={2}
                    keyExtractor={(item: any, index: number) => item.id}
                />
            </View>
            {/* </ScrollView> */}

        </BackgroundView >
    )
}

export function CustomModal(props: any) {
    let { isVisible,
        item,
        onClose,  /*...*/ } = props;
    const [images, setImages] = useState()

    console.log(item)

    const getImages = useCallback((item: any) => {
        async function getimages(item: any) {
            const dbCarImages = await axios.get((glbVars.BACKEND_URL + `cars/images/${item.id}`))

            // let uri = []
            // uri = dbCarImages.data!.map((i: any) => {

            //     return glbVars.BACKEND_URL + `carimg/${i.image}`

            // })


            setImages(dbCarImages.data)

        }
        getimages(item)
    }, [])



    useEffect(() => {
        getImages(item)
    }, [item])


    console.log(images)


    return <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        style={{ width: "100%" }}
        onRequestClose={onClose}>{
            <ModalView>
                <ModalTextView>
                    <ModalText
                        style={{ fontSize: 40 }}
                        ellipsizeMode="tail"
                    >
                        {item ? item.names : ""}
                    </ModalText>

                    <ModalText
                        style={{ fontSize: 30 }}
                        ellipsizeMode="tail"
                    >
                        {item ? item.brand : ""}
                    </ModalText>

                    <ModalText
                        style={{ fontSize: 25 }}
                        ellipsizeMode="tail"
                    >
                        {item ? item.name : ""}
                    </ModalText>
                </ModalTextView>

                <ExitModalButton
                    onPress={onClose}
                >
                    <AntDesign name="close" color={"white"} size={30} />
                </ExitModalButton>
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
                                        style={{ width: "100%", height: "100%", marginTop: Dimensions.get("window").height / 4 }}
                                        resizeMode="cover"
                                        // style={{ marginTop: 1 }}
                                        source={{
                                            uri: glbVars.BACKEND_URL + `carimg/${item.image}`
                                        }}
                                    />

                                </View>
                            </View>

                        }
                    />
            </ModalView>
        }</Modal>; // Render things inside the data
}

