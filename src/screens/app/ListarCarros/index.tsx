import { Component, useCallback, useEffect, useState, useRef } from "react";
import { FlatList, RefreshControl, ActivityIndicator, View } from "react-native";
import {
    PressableBottom, PressableTop, BigText,
    GridViewContainerFlex, GridViewContainer, SmallText,
    ReallySmallText, TextWhiteShadow, BackgroundView
} from "./styles";
import axios from "axios";
import { darkTheme } from "../../../../globalStyles";
import { glbVars } from "../../../../globalVars";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "../../../hooks/themeContext";



export function ListarCarros({ navigation, route }: { navigation: any, route: any }) {

    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState<any>()

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
            console.log("resposta fetch cars",response.data)
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




    return (
        <BackgroundView>
            {/* <ScrollView
                // contentContainerStyle={styles.scrollView}
                nestedScrollEnabled
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }> */}
            <View>

                <FlatList
                    data={dataSource}

                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) =>



                        <GridViewContainer>
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
