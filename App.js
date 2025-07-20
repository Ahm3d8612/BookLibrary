import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BooksListScreen from './screens/BooksListScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import BorrowedBooksScreen from './screens/BorrowedBooksScreen';
import { BookProvider } from './BookContext';
import { ThemeProvider } from './ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BookProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BooksList">
            <Stack.Screen name="BooksList" component={BooksListScreen} options={{ title: 'Book Library' }} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Book Detail' }} />
            <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} options={{ title: 'Borrowed Books' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </BookProvider>
  );
}
