import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    reference: 'REF-PAIN-01',
    name: 'Farine de Blé Bio T55',
    description: 'Sac de 25kg de farine pour boulangerie.',
    category: 'Épicerie',
    quantity: 50,
    alertThreshold: 10,
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    reference: 'REF-SUCR-02',
    name: 'Sucre Canne Roux',
    description: 'Carton de 10kg de sucre roux en poudre.',
    category: 'Épicerie',
    quantity: 8,
    alertThreshold: 15,
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    reference: 'REF-CHOC-03',
    name: 'Chocolat Noir 65%',
    description: 'Pépites de chocolat pour pâtisserie.',
    category: 'Pâtisserie',
    quantity: 0,
    alertThreshold: 5,
    updatedAt: new Date().toISOString(),
  },
];