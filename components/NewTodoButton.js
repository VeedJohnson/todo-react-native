import { View, StyleSheet, Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const NewTodoButton = () => {
    const navigation = useNavigation();

    function openTodoForm() {
        navigation.navigate('AddTodo')
    }
    return (
        <View style={styles.rootContainer}>
            <Pressable onPress={openTodoForm} style={styles.buttonContainer}>
                <View style={styles.buttonContainer}>
                    <Ionicons name="add" size={60} color="white"/>
                </View>
            </Pressable>
        </View>
    )
}

export default NewTodoButton;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        backgroundColor: "green",
        width: 80,
        height: 80,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center"
    }
})