import {View, StyleSheet, Text, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

export default function Profile () {
    return (
        <View style = {styles.container}>
            <Text>This is Profile screen.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "100%"
    }
})