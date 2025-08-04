import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import ReadRoute from "./ReadRoute";
import SavedHome from "../screens/SavedHome";
import VocabRoute from "../screens/VocabHome";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabRoute() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Reading" 
                component={ReadRoute} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="book-outline" size= {25} color="grey"/>
                    ),
                }}
            />
            <Tab.Screen name="Vocabulary" 
                component={VocabRoute} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="chatbubble-ellipses-outline" size= {25} color="grey"/>
                    ),
                }}
            />
            <Tab.Screen name="Saved" 
                component={SavedHome} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="bookmark-outline" size= {25} color="grey"/>
                    ),
                }}
            />
            <Tab.Screen name="Profile" 
                component={Profile} 
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="people-outline" size= {25} color="grey"/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}