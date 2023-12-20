import { StyleSheet, View, Text, Button, TouchableOpacity, Pressable, Modal, Alert, ScrollView } from "react-native";
import { RNPickerView, CenteredView, ModalView, ModalText, ModalText2, ButtonStyle, TextStyle, CloseButton } from "./styles";
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../screens/app/Home";
import { CriarCarros } from "../../screens/app/CriarCarros";
import { ListarCarros } from "../../screens/app/ListarCarros";
import { CriarEndereco } from "../../screens/app/CriarEndereco";
import { ListarEndereco } from "../../screens/app/ListarEndereco";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { Input } from "../input";
import axios from "axios";
import { glbVars } from "../../../globalVars";
import { Configuracoes } from "../../screens/app/Configuracoes";
import { useTheme } from "../../hooks/themeContext";

function Carros({ navigation }: { navigation: any }) {
  const Stack = createNativeStackNavigator();
  const [dataSource, setDataSource] = useState<any>()
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSourceUsers, setDataSourceUsers] = useState<any>([])
  const user_id = useRef()

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

  const onSubmit = (data: any) => {
    console.log("onsubmit", data)
    navigation.navigate("ListarCarros",
      data
    )
    // fetchCars(data)

  }

  const fetchCars = useCallback((data?: any) => {
    async function fetch() {
      const response = await axios.get(glbVars.BACKEND_URL + `cars?names=${data?.names ? data.names : ""}&brand=${data?.brand ? data?.brand : ""}&year=${data?.year ? data.year : ""}&nome=${data?.nome ? data.nome : ""}`)
      console.log(response.data)
      return response.data
    }
    const response = fetch()
    return response

  }, [])

  const fetchusers = useCallback((): void => {
    async function fetch() {
      const response = await axios.get(glbVars.BACKEND_URL + "users/index")

      setDataSourceUsers(response.data)

    }
    fetch()
  }, [])

  useEffect(() => {
    async function awaitCars() {
      const response = await fetchCars()
      // setDataSource(response)
    }
    awaitCars()
    fetchusers()


  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarCarros" component={ListarCarros}
        options={{
          title: 'Lista De Carros',
          headerRight: () => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Modal
                style={{ display: "flex" }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <CenteredView >
                  <ModalView>
                    <CloseButton
                      onPress={() => setModalVisible(!modalVisible)}>
                      <MaterialCommunityIcons name="close" color={"white"} size={30} />
                    </CloseButton>
                    <ModalText>Nome</ModalText>
                    <Controller
                      control={control}
                      rules={{
                        required: false,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                          style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                        <Input
                          style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="year"
                    />

                    <ModalText >Dono</ModalText>

                    <Controller
                      control={control}
                      rules={{
                        required: false,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <RNPickerView>
                          <RNPickerSelect
                            // placeholder="Selecione um item..."
                            onValueChange={(value) => user_id.current = value}
                            items={dataSourceUsers.map((data: any) => {

                              return { label: data.name, value: data.id }
                            })}
                          />
                        </RNPickerView>

                      )}
                      name="user_id"
                    />


                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={handleSubmit(onSubmit)}>
                      <TextStyle>Pesquisar</TextStyle>
                    </Pressable>
                    {/* <Button title="Pesquisar" 
                        onPressAction={handleSubmit(onSubmit)}
                        /> */}
                  </ModalView>
                </CenteredView>
              </Modal>

              {/*  */}

              <Pressable
                onPress={() => navigation.navigate("CriarCarros")}
              >
                <Ionicons name="add-circle-outline" color={currentTheme.colors.lightest} size={30} />

              </Pressable>

              <Pressable
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="search" color={currentTheme.colors.lightest} size={30} />

              </Pressable>

              {/*  */}

            </View>
          ),
          headerStyle: {
            backgroundColor: currentTheme.colors.dark,
          },
          headerTintColor: currentTheme.colors.lightest,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen name="CriarCarros" component={CriarCarros}
        options={{
          title: "Criação de Carros",
          headerStyle: {
            backgroundColor: currentTheme.colors.dark,
          },
          headerTintColor: currentTheme.colors.lightest,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

    </Stack.Navigator>
  );
}

function Enderecos({ navigation }: { navigation: any }) {
  const Stack = createNativeStackNavigator();
  const { currentTheme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSourceUsers, setDataSourceUsers] = useState<any>([])
  const user_id = useRef()



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
      user_id: ""
    },
  })
  const onSubmit = (data: any) => {
    console.log("onsubmit", data)
    navigation.navigate("ListarEnderecos", {
      data
    })
    // fetchCars(data)

  }

  const fetchusers = useCallback((): void => {
    async function fetch() {
      const response = await axios.get(glbVars.BACKEND_URL + "users/index")

      setDataSourceUsers(response.data)

    }
    fetch()
  }, [])

  useEffect(() => {
    fetchusers()
  }, [])

  return (
    <Stack.Navigator
      initialRouteName='ListarEnderecos'

    >
      <Stack.Screen name="ListarEnderecos" component={ListarEndereco}
        options={{
          title: "Listar Endereços",
          headerRight: () => {
            return (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Modal
                  style={{ display: "flex" }}
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <CenteredView >
                    <View style={{ position: "absolute", backgroundColor: currentTheme.colors.darkest, width: "100%", bottom: 0, zIndex:99 }}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleSubmit(onSubmit)}>
                        <TextStyle>Pesquisar</TextStyle>
                      </Pressable>
                    </View>
                    <ScrollView style={{ width: "100%" }}>

                      <ModalView>

                        <CloseButton
                          onPress={() => setModalVisible(!modalVisible)}>
                          <MaterialCommunityIcons name="close" color={"white"} size={30} />
                        </CloseButton>
                        <ModalText>CEP</ModalText>
                        <Controller
                          control={control}
                          rules={{
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
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
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={{ width: "100%", backgroundColor: currentTheme.colors.dark, color: "black" }}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                          )}
                          name="numero"
                        />

                        <ModalText >Dono</ModalText>

                        <Controller
                          control={control}
                          rules={{
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <RNPickerView>
                              <RNPickerSelect
                                // placeholder="Selecione um item..."
                                onValueChange={(value) => user_id.current = value}
                                items={dataSourceUsers.map((data: any) => {

                                  return { label: data.name, value: data.id }
                                })}
                              />
                            </RNPickerView>

                          )}
                          name="user_id"
                        />



                        {/* <Button title="Pesquisar" 
                        onPressAction={handleSubmit(onSubmit)}
                        /> */}
                      </ModalView>
                    </ScrollView>

                  </CenteredView>
                </Modal>

                <Pressable
                  onPress={() => navigation.navigate("CriarEnderecos")}
                >
                  <Ionicons name="add-circle-outline" color={currentTheme.colors.lightest} size={30} />

                </Pressable>

                <Pressable
                  onPress={() => setModalVisible(true)}
                >
                  <Ionicons name="search" color={currentTheme.colors.lightest} size={30} />

                </Pressable>
              </View>
            )

          },
          headerStyle: {
            backgroundColor: currentTheme.colors.dark,
          },
          headerTintColor: currentTheme.colors.lightest,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      < Stack.Screen name="CriarEnderecos" component={CriarEndereco}
        options={{
          title: "Criar Endereços",
          headerStyle: {
            backgroundColor: currentTheme.colors.dark,
          },
          headerTintColor: currentTheme.colors.lightest,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

    </Stack.Navigator >
  )
}

export function BottomTab() {
  const Tab = createBottomTabNavigator();
  const { currentTheme } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.dark,

          height: 60,
        },
        tabBarItemStyle: {
          // backgroundColor:darkTheme.lightest,
          margin: 5,
          borderRadius: 10,
        }
      }}

    >
      <Tab.Screen name="Home" component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Carros" component={Carros}
        options={{
          title: 'Carros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name="Criar Carros" component={CriarCarros} 
            options={{tabBarShowLabel:false}}
            /> */}
      <Tab.Screen name="Enderecos" component={Enderecos}
        options={{
          title: 'Endereços',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="address" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Configuracoes" component={Configuracoes}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>

  )
}
const styles = StyleSheet.create({
  button: {
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%"
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  }
});