export interface PredefinedFood {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  category: string;
  portion: string;
}

export const predefinedFoods: PredefinedFood[] = [
  {
    id: '1',
    name: 'Poulet (grillé)',
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    category: 'Viandes',
    portion: '100g'
  },
  {
    id: '2',
    name: 'Riz blanc cuit',
    calories: 130,
    proteins: 2.7,
    carbs: 28,
    fats: 0.3,
    category: 'Céréales',
    portion: '100g'
  },
  {
    id: '3',
    name: 'Oeuf',
    calories: 72,
    proteins: 6.3,
    carbs: 0.4,
    fats: 4.8,
    category: 'Protéines',
    portion: '1 unité'
  },
  {
    id: '4',
    name: 'Banane',
    calories: 89,
    proteins: 1.1,
    carbs: 22.8,
    fats: 0.3,
    category: 'Fruits',
    portion: '1 moyenne'
  },
  {
    id: '5',
    name: 'Yaourt nature',
    calories: 59,
    proteins: 3.8,
    carbs: 4.7,
    fats: 3.2,
    category: 'Produits laitiers',
    portion: '100g'
  },
  {
    id: '6',
    name: 'Saumon',
    calories: 208,
    proteins: 22,
    carbs: 0,
    fats: 13,
    category: 'Poissons',
    portion: '100g'
  },
  {
    id: '7',
    name: 'Avocat',
    calories: 160,
    proteins: 2,
    carbs: 8.5,
    fats: 14.7,
    category: 'Légumes',
    portion: '100g'
  },
  {
    id: '8',
    name: 'Pain complet',
    calories: 247,
    proteins: 9.4,
    carbs: 41.3,
    fats: 3.3,
    category: 'Céréales',
    portion: '100g'
  }
];
