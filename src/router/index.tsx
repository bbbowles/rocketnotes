import { AuthRouter } from "./auth.router"
import { AppRouter } from "./app.router"
import { useCallback, useEffect, useState } from "react"
import { BottomTab } from "../components/bottomTab"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../hooks/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';
export function Router(){
    const { token } = useAuth()

    // const user = true

    console.log("token", token)
    return(
        token ? <BottomTab/> : <AuthRouter/>
    )
}