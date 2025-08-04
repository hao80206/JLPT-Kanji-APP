import { View, StyleSheet, Text, ScrollView} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../components/Button";

export default function ReadList () {

    const navigation = useNavigation();
    const route = useRoute();
    const { level } = route.params;
    const parts = ['part1','part2','part3','part4','part5', 'part6'];

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            {parts.map(part => (
                <View key={part} style={styles.buttonWrapper}>
                <Button
                    label={
                    <View style={styles.button}>
                        <Text style={styles.buttonTitle}>{level} {part}</Text>
                    </View>
                    }
                    width={300}
                    backgroundColor="#a2aaf5"
                    fun={() => navigation.navigate('ReadKanji', {level, part })}
                />
                </View>
            ))}
            </View>
      </View>     
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    buttonContainer:{
        alignContent: "center",
        padding: 10,
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
    },
    buttonTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
    }

});