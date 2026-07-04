import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { product } = route.params;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('fr-FR') + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.badgeContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.reference}>Référence : {product.reference}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Catégorie</Text>
          <Text style={styles.value}>{product.category}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Quantité en stock</Text>
          <Text style={[
            styles.quantityValue,
            product.quantity === 0 ? styles.red : product.quantity <= product.alertThreshold ? styles.yellow : styles.green
          ]}>
            {product.quantity} unités
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Seuil d'alerte minimum</Text>
          <Text style={styles.value}>{product.alertThreshold} unités</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Description du produit</Text>
          <Text style={styles.descriptionText}>{product.description || "Aucune description fournie."}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Dernière mise à jour</Text>
          <Text style={styles.dateText}>{formatDate(product.updatedAt)}</Text>
        </View>
        
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
  },
  badgeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  reference: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  dateText: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
  },
  green: { color: '#10B981' },
  yellow: { color: '#F59E0B' },
  red: { color: '#EF4444' },
});