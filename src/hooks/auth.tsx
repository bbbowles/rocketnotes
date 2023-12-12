import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, useCallback, createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { glbVars } from "../../globalVars";

interface ChildrenInterface {
    children: ReactNode
}
interface SignInData {
    email: string,
    password: string
}
interface SignInInterface {
    email: string | undefined,
    password: string | undefined
}
interface UserInterface {
    name: string,
    email: string,
    password: string,
    avatar: string,
}
interface UserAuth {
    user?: string | null,
    signInFunction: (data: SignInInterface) => void,
    signOutFunction: ()=>void,
    token? : string

}
interface SessionInterface {
    user: string | null,
    token: string | undefined
}

const AuthContext = createContext({} as UserAuth)

const Auth: React.FC<ChildrenInterface> = (({ children }) => {
    const [data, setData] = useState<SessionInterface | null>(null)
    const signInFunction = useCallback((data: SignInInterface) => {
        async function signIn() {
            try {
                const response = await axios.post(glbVars.BACKEND_URL + "sessions", { email: data.email, password: data.password })

                const { user, token } = response.data
                console.log("alo",user.name)

                await AsyncStorage.setItem("@rocketnotes:user", user.name);
                await AsyncStorage.setItem("@rocketnotes:token", token);

                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                setData({ user:user.name,token })
            } catch (e: any) {
                // Swal.fire({
                //   title: e.response.data.message,
                //   icon: 'warning',
                //   confirmButtonText: 'Ok',
                // })
                console.log(e.response.data.message)
            }

        }
        signIn()
    },[])

    const signOutFunction = useCallback(()=>{
        async function signOut(){
            AsyncStorage.clear()
            setData(null)
        }
        signOut()
    },[])

    const checkForToken = useCallback(()=>{
        async function check(){
        const token = await AsyncStorage.getItem("@rocketnotes:token")
        const user = await AsyncStorage.getItem("@rocketnotes:user");

            if(token){
                console.log(user)
                setData({ user ,token })
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            }
        }
        check()
    },[])

    useEffect(()=>{
        checkForToken()
    },[])

    return (
        //passamos no context o signin, signout e o user data, por isso podemos acessar a funcao pelo useAuth()
        <AuthContext.Provider value={{
            signInFunction,
            signOutFunction,
            user: data?.user,
            token: data?.token
        }}>
            {children}
        </AuthContext.Provider>
    )
})
function useAuth() {
    const context = useContext(AuthContext)

    return context

}
export { Auth, useAuth }
