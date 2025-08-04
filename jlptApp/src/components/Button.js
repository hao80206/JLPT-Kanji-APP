import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Button ( {label,fun = ()=> {}, backgroundColor = "#a2aaf5",width = 150} ) {
    return (
        <Pressable
            style= { ({pressed}) => 
                pressed? [styles.button,{opacity: 0.5, width, backgroundColor}]:
                    [styles.button, {width, backgroundColor}]
                }
            onPress = {fun}
        >
            <View style = {styles.buttonContent}>
                <Text style ={styles.label}> {label} </Text>
            </View>
        </Pressable>
    )

};


const styles = StyleSheet.create({

    button: {
        backgroundColor: "#a2aaf5",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        height: 60,
        borderRadius: 10,
    } ,
    buttonContent: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: "center",

    },
    label: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 7,

    },
});