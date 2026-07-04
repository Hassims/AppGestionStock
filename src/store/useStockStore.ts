import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Product } from '../types/product';

interface StockState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'updatedAt'>) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  adjustStock: (id: string, amount: number) => void;
}

export const useStockStore = create<StockState>()(
  persist(
    (set) => ({
      // Données initiales si l'AsyncStorage est vide au tout premier démarrage
      products: MOCK_PRODUCTS, 
      
      addProduct: (newProd) => set((state) => ({
        products: [
          ...state.products,
          {
            ...newProd,
            id: Math.random().toString(36).substring(7),
            updatedAt: new Date().toISOString(),
          }
        ]
      })),

      updateProduct: (id, updatedFields) => set((state) => ({
        products: state.products.map((p) => 
          p.id === id ? { ...p, ...updatedFields, updatedAt: new Date().toISOString() } : p
        )
      })),

      adjustStock: (id, amount) => set((state) => ({
        products: state.products.map((p) => {
          if (p.id === id) {
            const newQty = Math.max(0, p.quantity + amount);
            return { ...p, quantity: newQty, updatedAt: new Date().toISOString() };
          }
          return p;
        })
      }))
    }),
    {
      name: 'stock-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);