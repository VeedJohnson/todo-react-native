import { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TodosContext } from "../store/TodosContext";
import NewTodoButton from "../components/NewTodoButton";
import TodoLists from "../components/TodoLists";

const TodoListScreen = () => {
    
    const todoContext = useContext(TodosContext);
    const todoList = todoContext.todos;

    useEffect(() => {
        todoContext.fetchTodos();
    }, []);

    if (todoList.length <= 0) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.todosContainer}>
                    <Text style={styles.noTaskText}>No Tasks at the moment...</Text>
                </View>
                <NewTodoButton />
            </View>
        )
    }

    return(
        <View style={styles.rootContainer}>
            <TodoLists data={todoList}/>
            <NewTodoButton />
        </View>
    )
}

export default TodoListScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingVertical: 20
    },
    todosContainer: {
        height: "60%",
    },
    noTaskText: {
        alignSelf: "center",
        marginVertical: 40
    }
})