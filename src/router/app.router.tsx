import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SignIn } from '../screens/auth/SignIn/index.';
// import { SignUp } from '../screens/auth/SignUp';
import { Home } from '../screens/app/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CriarCarros } from '../screens/app/CriarCarros';

export function AppRouter() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Criar Carros" component={CriarCarros} 
            />

        </Stack.Navigator>
    )
}