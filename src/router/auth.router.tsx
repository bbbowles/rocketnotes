import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../screens/auth/SignIn';
import { SignUp } from '../screens/auth/SignUp';

export function AuthRouter() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='SignIn'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}