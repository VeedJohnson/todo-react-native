import { View, Text, TextInput, Button, StyleSheet} from "react-native";
import { useState, useContext, useLayoutEffect } from "react";
import { TodosContext } from "../store/TodosContext";

const NewTodoScreen = ({navigation, route}) => {
    const todoContext = useContext(TodosContext);

    const [newTodo, setNewTodo] = useState("");

    const todoId = route.params?.todoId;
    const isEditing = !!todoId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Todo' : 'New Todo'
        });
        const selectedTodo = todoContext.todos.find(todo => todo.id === todoId);
        setNewTodo(selectedTodo ? selectedTodo.name : "");

    }, [isEditing]);


    function addTodo() {
        todoContext.addTodo(newTodo);
        navigation.goBack();
    }

    function updateTodo() {
        todoContext.updateTodo(todoId, newTodo);
        navigation.goBack();
    }
        
    return(
        <View style={styles.rootContainer}>
            <View style={styles.formContainer}>
                <TextInput style={styles.formInput} onChangeText={text => setNewTodo(text)} value={newTodo}/>
                <Button title={isEditing ? 'Edit todo' : 'Add Todo'} onPress={isEditing ? updateTodo : addTodo}/>
            </View>
        </View>
    )
}

export default NewTodoScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 30
    },
    formContainer: {
        alignItems: "center",
    },
    formInput: {
        marginVertical: 20,
        backgroundColor: "rgba(0, 0, 0, 0.201)",
        width: "80%",
        padding: 20,
        borderRadius: 10,
        fontSize: 18
    }
})