import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BookContext } from '../BookContext';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext';
import { getTheme } from '../theme';

const BorrowedBooksScreen = () => {
  const { borrowedBooks, returnBook } = useContext(BookContext);
  const { mode } = useContext(ThemeContext);
  const theme = getTheme(mode);

  const handleReturn = (bookId, title) => {
    Alert.alert(
      'Return Book',
      `Are you sure you want to return "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Return',
          onPress: () => returnBook(bookId),
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.cardContent}>
        <Ionicons name="book" size={24} color={theme.icon} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.author, { color: theme.subtext }]}>by {item.author}</Text>
        </View>
        <TouchableOpacity onPress={() => handleReturn(item.id, item.title)}>
          <Ionicons name="trash-outline" size={24} color={theme.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {borrowedBooks.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.subtext }]}>
          You have not borrowed any books yet.
        </Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default BorrowedBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
