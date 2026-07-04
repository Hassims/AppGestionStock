import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useStockStore } from '../store/useStockStore';

export const ProductFormScreen = ({ route, navigation }: any) => {
  const productId = route.params?.productId;
  const { products, addProduct, updateProduct } = useStockStore();

  // États du formulaire
  const [name, setName] = useState('');
  const [reference, setReference] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [alertThreshold, setAlertThreshold] = useState('');
  const [description, setDescription] = useState('');

  // Si on est en mode modification, on pré-remplit les champs
  useEffect(() => {
    if (productId) {
      const existingProduct = products.find((p) => p.id === productId);
      if (existingProduct) {
        setName(existingProduct.name);
        setReference(existingProduct.reference);
        setCategory(existingProduct.category);
        setQuantity(existingProduct.quantity.toString());
        setAlertThreshold(existingProduct.alertThreshold.toString());
        setDescription(existingProduct.description);
      }
    }
  }, [productId, products]);

  const handleSave = () => {
    // Validation des champs textuels obligatoires
    if (!name.trim() || !reference.trim() || !category.trim()) {
      Alert.alert('Champs obligatoires', 'Veuillez renseigner le nom, la référence et la catégorie.');
      return;
    }

    // Validation des valeurs numériques
    const qty = parseInt(quantity, 10);
    const threshold = parseInt(alertThreshold, 10);

    if (isNaN(qty) || qty < 0 || isNaN(threshold) || threshold < 0) {
      Alert.alert('Valeurs invalides', "La quantité et le seuil d'alerte doivent être des nombres positifs ou nuls.");
      return;
    }

    const productData = {
      name: name.trim(),
      reference: reference.trim(),
      category: category.trim(),
      quantity: qty,
      alertThreshold: threshold,
      description: description.trim(),
    };

    if (productId) {
      // Mode Modification
      updateProduct(productId, productData);
      Alert.alert('Succès', 'Produit mis à jour avec succès !');
    } else {
      // Mode Ajout
      addProduct(productData);
      Alert.alert('Succès', 'Produit ajouté au stock !');
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formContent}>
        
        <Text style={styles.label}>Nom du produit *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: iPhone 15 Pro" />

        <Text style={styles.label}>Référence *</Text>
        <TextInput style={styles.input} value={reference} onChangeText={setReference} placeholder="Ex: REF-IPH15" />

        <Text style={styles.label}>Catégorie *</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Ex: Électronique" />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text style={styles.label}>Quantité Initiale *</Text>
            <TextInput 
              style={styles.input} 
              value={quantity} 
              onChangeText={setQuantity} 
              keyboardType="number-pad" 
              placeholder="0"
              editable={!productId} // bloque la modif de quantité initiale en mode edit
            />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.label}>Seuil d'alerte *</Text>
            <TextInput style={styles.input} value={alertThreshold} onChangeText={setAlertThreshold} keyboardType="number-pad" placeholder="5" />
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={description} 
          onChangeText={setDescription} 
          placeholder="Détails du produit..." 
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Enregistrer le produit</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  formContent: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { 
    backgroundColor: '#ffffff', 
    borderWidth: 1, 
    borderColor: '#D1D5DB', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 48, 
    fontSize: 16, 
    color: '#1F2937', 
    marginBottom: 16 
  },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  flex1: { flex: 1 },
  submitButton: { 
    backgroundColor: '#2563EB', 
    borderRadius: 8, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  submitButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});