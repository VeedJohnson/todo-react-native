import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodosProvider from './store/TodosContext';

import TodoListScreen from './screens/TodoListScreen';
import NewTodoScreen from './screens/NewTodoScreen';

const AppStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TodosProvider>
        <AppStack.Navigator initialRouteName='AllTodos'>
          <AppStack.Screen name='AllTodos' component={TodoListScreen}
          options={{
            title: "All Tasks"
          }}
          />
          <AppStack.Screen name='AddTodo' component={NewTodoScreen}
          options={{
            presentation: 'modal',
          }}
          />
        </AppStack.Navigator>
      </TodosProvider>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}

