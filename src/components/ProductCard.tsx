import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
 
  const getStatusIcon = () => {
    if (product.quantity === 0) return '🔴';
    if (product.quantity <= product.alertThreshold) return '🟡';
    return '🟢';
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.reference}>Réf : {product.reference}</Text>
        <Text style={styles.category}>Catégorie : {product.category}</Text>
      </View>
      
      <View style={styles.stockContainer}>
        <Text style={styles.quantity}>{product.quantity} en stock</Text>
        <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  reference: {
    fontSize: 12,
    color: '#6B7280',
  },
  category: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 4,
  },
  stockContainer: {
    alignItems: 'flex-end',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  statusIcon: {
    fontSize: 20,
  },
});