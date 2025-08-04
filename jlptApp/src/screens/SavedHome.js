import {View, StyleSheet, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

export default function SavedHome () {
    return (
        <View style = {styles.container}>
            <Text>This is SavedHome screen.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "100%"
    }
})