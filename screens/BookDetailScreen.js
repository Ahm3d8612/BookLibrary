import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BookContext } from '../BookContext';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext';
import { getTheme } from '../theme';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { borrowedBooks, borrowBook } = useContext(BookContext);
  const { mode } = useContext(ThemeContext);
  const theme = getTheme(mode);

  const handleBorrow = () => {
    const alreadyBorrowed = borrowedBooks.find(b => b.id === book.id);
    if (alreadyBorrowed) {
      Alert.alert('Already Borrowed', 'You have already borrowed this book.');
      return;
    }

    const success = borrowBook(book);
    if (!success) {
      Alert.alert('Limit Reached', 'You cannot borrow more than 3 books at a time.');
    } else {
      Alert.alert('Success', 'Book borrowed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Ionicons name="book" size={64} color={theme.icon} style={styles.icon} />
      <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
      <Text style={[styles.author, { color: theme.subtext }]}>by {book.author}</Text>
      <Text style={[styles.description, { color: theme.text }]}>{book.description}</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handleBorrow}>
        <Ionicons name="bookmark-outline" size={20} color={theme.buttonText} />
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Borrow This Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
