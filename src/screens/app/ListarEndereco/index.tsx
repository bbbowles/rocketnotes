import {
    PressableRight, PressableLeft, BigText,
    GridViewContainerFlex, GridViewContainer, SmallText,
    ReallySmallText, GreySmallText, ActivityIndicatorOnEnd,
    BackgroundView, PrimaryText, SecondaryText, SecondaryTextBold,
    FineText
} from "./styles";
import {
    FlatList, View, RefreshControl
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import { glbVars } from "../../../../globalVars";
export function ListarEndereco({ navigation, route }: { navigation: any, route: any }) {

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [params, setParams] = useState<{}>()

    const [dataSource, setDataSource] = useState<any>()
    const page = useRef(1)



    const noData = (): Boolean => {
        if (params == undefined) {
            return true
        } else {
            return false
        }
    }

    const onRefresh = useCallback(() => {

        page.current = 1

        fetchAddressFiltered()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const cpfMask = useCallback((data: any): string => {
        return String(data).replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
    },
        [])


    const fetchAddressFiltered = useCallback(() => {
        async function fetch() {
            console.log("route params", route.params)

            const result = await axios.get(glbVars.BACKEND_URL + `addr/filtered/`, {
                params: {
                    pages: page.current,
                    cep: route.params ? route.params.data.cep : "",
                    nome: route.params ? route.params.data.nome : "",
                    cidade: route.params ? route.params.data.cidade : "",
                    bairro: route.params ? route.params.data.bairro : "",
                    estado: route.params ? route.params.data.estado : "",
                    numero: route.params ? route.params.data.numero : "",
                }
            })

            if (page.current > 1) {
                setDataSource((recebeOldData: object[]) => [...recebeOldData, ...result.data["rows"]])
                setLoading(false)


            } else {
                setDataSource(result.data["rows"])

            }

        }
        fetch()
    }, [route.params])

    const deleteAddress = useCallback((data: any) => {
        async function deleteaddress() {
            const id = data
            await axios.delete(glbVars.BACKEND_URL + `addr/${id}`)
            fetchAllSeenPages()
        }
        function fetchAllSeenPages() {
            let pagesSeenCount = 1
            console.log("1")
            fetchAddressFiltered()
            while (pagesSeenCount !== page.current) {
                pagesSeenCount = (pagesSeenCount + 1)
                fetchAddressFiltered()
            }
        }
        deleteaddress()
    }, [])

    useEffect(() => {
        page.current = 1
        setParams(route.params ? route.params : null)
        console.log("useeffect, setou o params:", route.params)

        fetchAddressFiltered()

    }, [route.params])

    return (

        <BackgroundView>

            <View>
                <ActivityIndicatorOnEnd size="large" color="white" animating={loading}
                    style={{ display: loading ? "flex" : "none" }}
                />

                <FlatList
                    data={dataSource}
                    onEndReached={() => {
                        page.current = (page.current + 1)
                        fetchAddressFiltered()
                        setLoading(true)
                    }
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    numColumns={1}
                    keyExtractor={(item: any, index: number) => item.id}
                    renderItem={({ item }) =>

                        <GridViewContainer
                            key={item.id}
                        >
                            <View style={{ display: "flex", flexDirection: "column" }}>

                                <GridViewContainerFlex>
                                    <View style={{ display: "flex", flexDirection: "row", alignContent: "flex-end" }}>

                                        <GreySmallText>
                                            CEP
                                        </GreySmallText>

                                        <PrimaryText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {cpfMask(item.cep)}
                                        </PrimaryText>
                                    </View>


                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Nome da rua
                                        </GreySmallText>
                                        <SecondaryText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.nome}
                                        </SecondaryText>
                                    </View>


                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Cidade
                                        </GreySmallText>
                                        <SmallText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.cidade}
                                        </SmallText>
                                    </View>



                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Bairro
                                        </GreySmallText>
                                        <SmallText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.bairro}

                                        </SmallText>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Estado
                                        </GreySmallText>
                                        <SecondaryTextBold
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.estado}
                                        </SecondaryTextBold>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Número
                                        </GreySmallText>
                                        <FineText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.numero}
                                        </FineText>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Complemento
                                        </GreySmallText>
                                        <SmallText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.complemento}
                                        </SmallText>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <GreySmallText>
                                            Usuário
                                        </GreySmallText>
                                        <SmallText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.name}
                                        </SmallText>
                                    </View>

                                </GridViewContainerFlex>

                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <PressableLeft onPress={() => navigation.navigate("CriarEnderecos", {
                                        id: item.id
                                    })}>
                                        <MaterialCommunityIcons name="pencil" color={"white"} size={30} />


                                    </PressableLeft>


                                    <PressableRight
                                        onPress={() => deleteAddress(item.id)}
                                    >
                                        <MaterialCommunityIcons name="trash-can-outline" color={"white"} size={30} />

                                    </PressableRight>
                                </View>
                            </View>

                        </GridViewContainer>


                    }

                />
            </View>

        </BackgroundView >
    )
}