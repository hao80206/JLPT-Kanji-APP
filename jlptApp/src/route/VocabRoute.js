import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import VocabHome from "../screens/VocabHome";

const Stack = createStackNavigator();

export default function VocabRoute(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="VocabHome" component={VocabHome} />
        </Stack.Navigator>
    );
}