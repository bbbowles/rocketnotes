import { Pressable, Text } from "react-native"
import { CustomPressable, CustomText } from "./styles"
export function Button(values:any){
    console.log(values)
    return(
        <CustomPressable onPress={values.onPressAction} >
            <CustomText>
                {values.title ? values.title : ""}
            </CustomText>
        </CustomPressable >
    )
}