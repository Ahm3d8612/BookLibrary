import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';
import { ThemeContext } from '../ThemeContext';

const BooksListScreen = ({ navigation }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = getTheme(mode);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const booksRef = ref(db, 'books');
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const booksArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setBooks(booksArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <View style={styles.cardHeader}>
        <Ionicons name="book-outline" size={24} color={theme.icon} />
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      </View>
      <Text style={[styles.author, { color: theme.subtext }]}>by {item.author}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <>
            <TouchableOpacity
              style={[styles.borrowedButton, { backgroundColor: theme.button }]}
              onPress={() => navigation.navigate('BorrowedBooks')}
            >
              <Ionicons name="library-outline" size={20} color={theme.buttonText} />
              <Text style={[styles.borrowedText, { color: theme.buttonText }]}>View Borrowed Books</Text>
            </TouchableOpacity>

            {/* Theme toggle switch */}
            <View style={styles.switchContainer}>
              <Text style={[styles.switchText, { color: theme.text }]}>
                {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Text>
              <Switch value={mode === 'dark'} onValueChange={toggleTheme} />
            </View>
          </>
        }
      />
    </View>
  );
};

export default BooksListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    flexShrink: 1,
  },
  author: {
    fontSize: 14,
  },
  borrowedButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borrowedText: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  switchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 16,
    marginRight: 8,
  },
});
