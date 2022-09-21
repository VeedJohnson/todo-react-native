import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodosContext = createContext(null);

const TodosProvider = ({children}) => {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const todosRaw = await AsyncStorage.getItem('MY_TODOS');
        if (todosRaw) {
            setTodos(JSON.parse(todosRaw));
        }
    };

    const addTodo = async (name, isCompleted=false) => {
        const id = Math.random().toString().split("").slice(2, 8).join("").toString();
        const todoDetail = {
            name: name,
            isCompleted: isCompleted,
            id: id
        };
        setTodos(currTodos => [todoDetail, ...currTodos]);

        const todosRaw = await AsyncStorage.getItem('MY_TODOS');

        let todoStore;
        if(todosRaw) {
            const todosParsed = JSON.parse(todosRaw);
            todoStore = JSON.stringify([todoDetail, ...todosParsed]);
        } else {
            todoStore = JSON.stringify([todoDetail]);
        }
        await AsyncStorage.setItem('MY_TODOS', todoStore);
    };

    const updateTodo = async (id, name) => {
        const selectedTodoIndex = todos.findIndex(todo => todo.id === id);
        const selectedTodo = todos[selectedTodoIndex];
        const updatedTodo = { ...selectedTodo, name: name};
        const updatedTodoList = [...todos];
        updatedTodoList[selectedTodoIndex] = updatedTodo;
        setTodos(updatedTodoList);
        await AsyncStorage.setItem('MY_TODOS', JSON.stringify(updatedTodoList));
    };

    const deleteTodo =  async (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        await AsyncStorage.setItem('MY_TODOS', JSON.stringify(newTodos));
    };

    const completeTodo = async (id) => {
        const selectedTodo = todos.find(todo => todo.id === id);
        selectedTodo.isCompleted = true;
        const newTodos = [...todos.filter(todo => todo.id !== id), selectedTodo];
        setTodos(newTodos);
        await AsyncStorage.setItem('MY_TODOS', JSON.stringify(newTodos));
    }

    const values = {
        todos,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        completeTodo
    }

    return (
        <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
    )
}

export default TodosProvider;