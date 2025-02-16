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
  // Viandes
  {
    id: '1',
    name: 'Poulet (blanc, grillé)',
    calories: 165,
    proteins: 31,
    carbs: 0,
    fats: 3.6,
    category: 'Viandes',
    portion: '100g'
  },
  {
    id: '2',
    name: 'Bœuf (steak haché 5%)',
    calories: 141,
    proteins: 21,
    carbs: 0,
    fats: 5,
    category: 'Viandes',
    portion: '100g'
  },
  {
    id: '3',
    name: 'Porc (côtelette)',
    calories: 231,
    proteins: 25,
    carbs: 0,
    fats: 14,
    category: 'Viandes',
    portion: '100g'
  },
  {
    id: '4',
    name: 'Dinde (escalope)',
    calories: 135,
    proteins: 29,
    carbs: 0,
    fats: 2,
    category: 'Viandes',
    portion: '100g'
  },

  // Poissons
  {
    id: '5',
    name: 'Saumon (frais)',
    calories: 208,
    proteins: 22,
    carbs: 0,
    fats: 13,
    category: 'Poissons',
    portion: '100g'
  },
  {
    id: '6',
    name: 'Thon (en conserve)',
    calories: 128,
    proteins: 29,
    carbs: 0,
    fats: 1,
    category: 'Poissons',
    portion: '100g'
  },
  {
    id: '7',
    name: 'Cabillaud',
    calories: 82,
    proteins: 18,
    carbs: 0,
    fats: 0.7,
    category: 'Poissons',
    portion: '100g'
  },

  // Œufs et Produits laitiers
  {
    id: '8',
    name: 'Œuf entier',
    calories: 72,
    proteins: 6.3,
    carbs: 0.4,
    fats: 4.8,
    category: 'Œufs et Produits laitiers',
    portion: '1 unité'
  },
  {
    id: '9',
    name: 'Yaourt nature',
    calories: 59,
    proteins: 3.8,
    carbs: 4.7,
    fats: 3.2,
    category: 'Œufs et Produits laitiers',
    portion: '100g'
  },
  {
    id: '10',
    name: 'Fromage blanc 0%',
    calories: 43,
    proteins: 7.5,
    carbs: 4.0,
    fats: 0.2,
    category: 'Œufs et Produits laitiers',
    portion: '100g'
  },
  {
    id: '11',
    name: 'Mozzarella',
    calories: 280,
    proteins: 22,
    carbs: 2.2,
    fats: 21,
    category: 'Œufs et Produits laitiers',
    portion: '100g'
  },

  // Céréales et Féculents
  {
    id: '12',
    name: 'Riz blanc (cuit)',
    calories: 130,
    proteins: 2.7,
    carbs: 28,
    fats: 0.3,
    category: 'Céréales et Féculents',
    portion: '100g'
  },
  {
    id: '13',
    name: 'Pâtes (cuites)',
    calories: 158,
    proteins: 5.8,
    carbs: 31,
    fats: 0.9,
    category: 'Céréales et Féculents',
    portion: '100g'
  },
  {
    id: '14',
    name: 'Pain complet',
    calories: 247,
    proteins: 9.4,
    carbs: 41.3,
    fats: 3.3,
    category: 'Céréales et Féculents',
    portion: '100g'
  },
  {
    id: '15',
    name: 'Quinoa (cuit)',
    calories: 120,
    proteins: 4.4,
    carbs: 21.3,
    fats: 1.9,
    category: 'Céréales et Féculents',
    portion: '100g'
  },

  // Légumes
  {
    id: '16',
    name: 'Brocoli (cuit)',
    calories: 35,
    proteins: 2.4,
    carbs: 7.2,
    fats: 0.4,
    category: 'Légumes',
    portion: '100g'
  },
  {
    id: '17',
    name: 'Carottes (crues)',
    calories: 41,
    proteins: 0.9,
    carbs: 9.6,
    fats: 0.2,
    category: 'Légumes',
    portion: '100g'
  },
  {
    id: '18',
    name: 'Épinards (cuits)',
    calories: 23,
    proteins: 2.9,
    carbs: 3.6,
    fats: 0.4,
    category: 'Légumes',
    portion: '100g'
  },
  {
    id: '19',
    name: 'Pomme de terre (cuite)',
    calories: 87,
    proteins: 1.9,
    carbs: 20.1,
    fats: 0.1,
    category: 'Légumes',
    portion: '100g'
  },
  {
    id: '20',
    name: 'Avocat',
    calories: 160,
    proteins: 2,
    carbs: 8.5,
    fats: 14.7,
    category: 'Légumes',
    portion: '100g'
  },

  // Fruits
  {
    id: '21',
    name: 'Banane',
    calories: 89,
    proteins: 1.1,
    carbs: 22.8,
    fats: 0.3,
    category: 'Fruits',
    portion: '100g'
  },
  {
    id: '22',
    name: 'Pomme',
    calories: 52,
    proteins: 0.3,
    carbs: 14,
    fats: 0.2,
    category: 'Fruits',
    portion: '100g'
  },
  {
    id: '23',
    name: 'Orange',
    calories: 47,
    proteins: 0.9,
    carbs: 11.8,
    fats: 0.1,
    category: 'Fruits',
    portion: '100g'
  },
  {
    id: '24',
    name: 'Fraises',
    calories: 32,
    proteins: 0.7,
    carbs: 7.7,
    fats: 0.3,
    category: 'Fruits',
    portion: '100g'
  },

  // Légumineuses
  {
    id: '25',
    name: 'Lentilles (cuites)',
    calories: 116,
    proteins: 9,
    carbs: 20,
    fats: 0.4,
    category: 'Légumineuses',
    portion: '100g'
  },
  {
    id: '26',
    name: 'Pois chiches (cuits)',
    calories: 164,
    proteins: 8.9,
    carbs: 27,
    fats: 2.6,
    category: 'Légumineuses',
    portion: '100g'
  },
  {
    id: '27',
    name: 'Haricots rouges (cuits)',
    calories: 127,
    proteins: 8.7,
    carbs: 23,
    fats: 0.5,
    category: 'Légumineuses',
    portion: '100g'
  },

  // Noix et Graines
  {
    id: '28',
    name: 'Amandes',
    calories: 579,
    proteins: 21,
    carbs: 22,
    fats: 49,
    category: 'Noix et Graines',
    portion: '100g'
  },
  {
    id: '29',
    name: 'Noix',
    calories: 654,
    proteins: 15,
    carbs: 14,
    fats: 65,
    category: 'Noix et Graines',
    portion: '100g'
  },
  {
    id: '30',
    name: 'Graines de chia',
    calories: 486,
    proteins: 17,
    carbs: 42,
    fats: 31,
    category: 'Noix et Graines',
    portion: '100g'
  },

  // Produits transformés
  {
    id: '31',
    name: 'Pain de mie',
    calories: 265,
    proteins: 8,
    carbs: 49,
    fats: 3.2,
    category: 'Produits transformés',
    portion: '100g'
  },
  {
    id: '32',
    name: 'Céréales petit-déjeuner',
    calories: 379,
    proteins: 7,
    carbs: 84,
    fats: 0.8,
    category: 'Produits transformés',
    portion: '100g'
  },
  {
    id: '33',
    name: 'Pizza Margherita',
    calories: 266,
    proteins: 11,
    carbs: 33,
    fats: 10,
    category: 'Produits transformés',
    portion: '100g'
  },

  // Boissons
  {
    id: '34',
    name: 'Lait demi-écrémé',
    calories: 46,
    proteins: 3.3,
    carbs: 4.8,
    fats: 1.5,
    category: 'Boissons',
    portion: '100ml'
  },
  {
    id: '35',
    name: 'Jus d\'orange',
    calories: 45,
    proteins: 0.7,
    carbs: 10.4,
    fats: 0.2,
    category: 'Boissons',
    portion: '100ml'
  },
  {
    id: '36',
    name: 'Smoothie banane',
    calories: 89,
    proteins: 1.1,
    carbs: 20.2,
    fats: 0.3,
    category: 'Boissons',
    portion: '100ml'
  },

  // Sauces et Condiments
  {
    id: '37',
    name: 'Huile d\'olive',
    calories: 884,
    proteins: 0,
    carbs: 0,
    fats: 100,
    category: 'Sauces et Condiments',
    portion: '100ml'
  },
  {
    id: '38',
    name: 'Mayonnaise',
    calories: 680,
    proteins: 1,
    carbs: 0.6,
    fats: 75,
    category: 'Sauces et Condiments',
    portion: '100g'
  },
  {
    id: '39',
    name: 'Ketchup',
    calories: 112,
    proteins: 1.2,
    carbs: 26,
    fats: 0.2,
    category: 'Sauces et Condiments',
    portion: '100g'
  },
  {
    id: '40',
    name: 'Moutarde',
    calories: 66,
    proteins: 4.4,
    carbs: 6.4,
    fats: 3.8,
    category: 'Sauces et Condiments',
    portion: '100g'
  }
];
