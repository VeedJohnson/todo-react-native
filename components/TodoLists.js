import { View, Text, FlatList, StyleSheet, Alert, Pressable } from "react-native";
import { TodosContext } from "../store/TodosContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

const TodoLists = ({data}) => {
    const todoContext = useContext(TodosContext);
    const navigation = useNavigation();

    function openEditTodoForm(id) {
        navigation.navigate('AddTodo', {
            todoId: id
        });
    }
    function openTodoOptions(name, id) {
        Alert.alert(
            'Manage Todo',
            name,
            [
                {
                    text: "Completed",
                    onPress: () => {todoContext.completeTodo(id)}
                },
                {
                    text: "Edit",
                    onPress: () => {openEditTodoForm(id)}
                },
                {
                    text: "Delete",
                    onPress: () => {todoContext.deleteTodo(id)},
                    style: "destructive"
                },
                {
                    text: "Cancel",
                }

            ]
        )
    }

    return (
        <View style={styles.todosContainer}>
                <FlatList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>{
                        return (
                            <Pressable onPress={openTodoOptions.bind(this, item.name, item.id)}>
                                <View style={item.isCompleted ? [styles.todoItemContainer, styles.todoCompleted] : styles.todoItemContainer}>
                                    <Text style={item.isCompleted ? styles.todoItemCompleted : null}>{item.name}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
    )
}

export default TodoLists;

const styles = StyleSheet.create({
    todosContainer: {
        height: "60%",
    },
    todoItemContainer: {
        marginHorizontal: 25,
        marginVertical: 10,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#fff"
    },
    todoCompleted: {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    todoItemCompleted: {
        color: "rgba(255, 255, 255, 0.5)"
    }
})