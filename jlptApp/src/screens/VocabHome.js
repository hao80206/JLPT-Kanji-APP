import { View, StyleSheet, Text, ScrollView} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../components/Button";

export default function VocabHome () {
    const navigation = useNavigation();
    const levels = ['N1', 'N2', 'N3','N4','N5'];

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            {levels.map(level => (
                <View key={level} style={styles.buttonWrapper}>
                <Button
                    label={
                    <View style={styles.button}>
                        <Text style={styles.buttonTitle}>{level}</Text>
                    </View>
                    }
                    width={300}
                    backgroundColor="#a2aaf5"
                    fun={() => navigation.navigate('VocabList', { level })}
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