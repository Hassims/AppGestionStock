import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'; 
import { useStockStore } from '../store/useStockStore';

export const ProductDetailScreen = ({ route, navigation }: any) => {

  const { productId } = route.params;

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
        <TouchableOpacity 
            onPress={() => navigation.navigate('ProductForm', { productId })}
            style={{ marginRight: 10, padding: 8 }}
        >
            <Text style={{ color: '#2563EB', fontWeight: 'bold', fontSize: 16 }}>Modifier 📝</Text>
        </TouchableOpacity>
        ),
    });
  }, [navigation, productId]);
  
  // On récupère le produit en temps réel du store
  const product = useStockStore((state) => state.products.find(p => p.id === productId));
  const adjustStock = useStockStore((state) => state.adjustStock);

  const [inputQty, setInputQty] = useState('1');

  if (!product) {
    return <View style={styles.container}><Text>Produit introuvable</Text></View>;
  }

  const handleAdjust = (type: 'IN' | 'OUT') => {
    const amount = parseInt(inputQty, 10);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir une quantité valide');
      return;
    }
    adjustStock(product.id, type === 'IN' ? amount : -amount);
  };

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

        {/* SECTION AJUSTEMENT DE STOCK */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Mouvement de Stock</Text>
          <View style={styles.actionRow}>
            <TextInput 
              style={styles.qtyInput}
              keyboardType="number-pad"
              value={inputQty}
              onChangeText={setInputQty}
            />
            <TouchableOpacity style={[styles.btn, styles.btnOut]} onPress={() => handleAdjust('OUT')}>
              <Text style={styles.btnText}>- Sortie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnIn]} onPress={() => handleAdjust('IN')}>
              <Text style={styles.btnText}>+ Entrée</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Quantité en stock</Text>
          <Text style={[
            styles.quantityValue,
            product.quantity === 0 ? styles.red : product.quantity <= product.alertThreshold ? styles.yellow : styles.green
          ]}>
            {product.quantity} unités ({product.quantity === 0 ? "Rupture" : product.quantity <= product.alertThreshold ? "Faible" : "Normal"})
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Catégorie</Text>
          <Text style={styles.value}>{product.category}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.descriptionText}>{product.description || "Aucune description."}</Text>
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
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10
  },
  qtyInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 8,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnIn: { backgroundColor: '#10B981' },
  btnOut: { backgroundColor: '#EF4444' },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});