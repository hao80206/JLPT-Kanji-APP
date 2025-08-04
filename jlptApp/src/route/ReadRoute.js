import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ReadHome from "../screens/ReadHome";
import ReadList from "../screens/ReadList";
import ReadKanji from "../screens/ReadKanji";

const Stack = createStackNavigator();

export default function ReadRoute(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ReadHome" component={ReadHome} />
            <Stack.Screen name="ReadList" component={ReadList} />
            <Stack.Screen name="ReadKanji" component={ReadKanji} />
        </Stack.Navigator>
    );
}