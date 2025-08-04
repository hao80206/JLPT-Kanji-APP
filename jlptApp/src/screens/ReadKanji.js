import { View, StyleSheet, Text, ScrollView, ActivityIndicator, Alert} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import Button from "../components/Button";

export default function ReadKanji () {

    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading ] = useState(true);
    const [kanjiList, setKanjiList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { level, part } = route.params;

    // Calculate offset from part1 ~ part6
    const partNumber = parseInt(part.replace('part', ''));
    const offset = (partNumber - 1) * 100;


    useEffect( () => {
        setLoading(true);
        fetch(`http://10.128.116.241:3000/kanji/level/${level}?offset=${offset}&limit=100`)
        .then((res) => res.json())
        .then((data) => {
            setKanjiList(data);
            setCurrentIndex(0);
            setLoading(false);
        })
        .catch((error) => {
            console.log("Error fetching Kanji", error);
        });
    }, [level, part]);


    if(loading) {
        return (
            <View style = {styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    };

    const currentKanji = kanjiList[currentIndex];
    if(!currentKanji) {
        return (
            <View style={styles.container}>
              <Text>No Kanji found for this section.</Text>
            </View>
          );
    }
    const { character, meaning, onyomi, kunyomi} = currentKanji;

    // Handle info popups
    const showInfo = (type, value) => {
        Alert.alert(type, value || "No data");
    };

    //----------------- SCREEN VIEW ---------------------//

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>{level} -{part} </Text>

            <View style= {styles.board}>
                <Text style = {styles.character}>{character}</Text>

            </View>

        {/* --------- Reading button Panel ------------*/}
            <View style = {styles.yomiButtonPanel}>
                <Button
                    label={
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Onyomi</Text>
                        </View>
                    }
                    width={120}
                    backgroundColor="#e391ba"
                    fun={() => showInfo("Onyomi", onyomi)}
                />
                <Button
                    label={
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Kunyomi</Text>
                        </View>
                    }
                    width={120}
                    backgroundColor="#91d3e3"
                    fun={() => showInfo("Kunyomi", kunyomi)}
                />
            </View>
                <Button
                    label={
                        <View style={styles.meaningButton}>
                            <Text style={styles.buttonTitle}>Check Meaning</Text>
                        </View>
                    }
                    width={200}
                    backgroundColor="#a2aaf5"
                    fun={() => showInfo("Meaning", meaning)}
                />
        {/* --------- Navigation button Panel ------------*/}

            <View style = {styles.navigationButtonPanel}>
                <Button
                    label={
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Back</Text>
                        </View>
                    }
                    width={120}
                    backgroundColor="#84d9bd"
                    fun={() => navigation.goBack()}
                />
                <Button
                    label={
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Next</Text>
                        </View>
                    }
                    width={120}
                    backgroundColor="#84d9bd"
                    fun={() => navigation.goBack()}
                />
            </View>

        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    board: {
        width: "80%",
        height: 280,
        backgroundColor: '#2a5238',
        marginBottom: 12,
        paddingTop: 10,
        marginTop: 15,
        borderColor: 'white',
        alignItems: "center",
    },
    character: {
        fontSize: 220,
        color: "white",
        fontWeight: "bold",
        fontFamily: 'Mincho',

    },
    yomiButtonPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
        paddingTop: 20,
        marginBottom: 30,
        marginTop: 10,
    },
    navigationButtonPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
        paddingTop: 20,
        marginBottom: 30,
        marginTop: 40,
    },
    button: {
        alignItems: "center",
        paddingTop: 15,
        
    },
    meaningButton: {
        alignItems: "center",
        paddingTop: 15,
        
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: "bold",

    }
})

