import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TextInput, TouchableOpacity } from 'react-native';

import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';

export const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const refMatch = product.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || refMatch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit ou réf..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <ProductCard product={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit trouvé 😕</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: '#1F2937',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});