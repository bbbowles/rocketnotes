// import { View, Text } from "./styles"
import { useEffect } from "react";
import { StyleSheet,View, Text } from "react-native";

export function PopUp({ hidden }: { hidden: boolean }) {
    useEffect(() => {
        if (hidden == false) {
            const timer = setTimeout(() => {
                console.log('This will run after 5 second!')
                hidden=true
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, []);
    return (
        <View style={hidden ? styles.hiddenStyle : styles.viewStyle}>
            <Text style={hidden ? styles.hiddenStyle : styles.textStyle}>Deu certo!</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle:{
        position:"absolute",
        top:"2%",
        right:0,
        width:"50%",
        height:"10%",
        zIndex:99,
        backgroundColor:"white"
    },
    textStyle:{
        color:"black",
        fontSize:30
    },
    hiddenStyle:{
        display:"none"
    }
})
// export const View = styled.View`
//     position: absolute;
//     top:2%;
//     right:0;
//     width:50%;
//     height:10%;
//     z-index:99;
//     background-color:white;
// `

// export const Text = styled.Text`
//     color:black;
//     font-size:30px;
// `