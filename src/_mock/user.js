import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// Array of farming product names
const farmingProductNames = [
  'Wheat',
  'Corn',
  'Soybeans',
  'Rice',
  'Cotton',
  'Barley',
  'Oats',
  'Rye',
  'Sorghum',
  'Canola',
  'Sunflower',
  'Sugarcane',
  'Potatoes',
  'Tomatoes',
  'Onions',
  'Garlic',
  'Carrots',
  'Cabbage',
  'Lettuce',
  'Peppers',
  'Eggplant',
  'Cucumbers',
  'Pumpkins',
  'Zucchini',
];

// Array of farm locations
const farmLocations = [
  'Green Valley Farm',
  'Sunny Meadows',
  'Blue Ridge Farm',
  'Golden Harvest Fields',
  'Prairie Fields Farm',
  'Evergreen Farm',
  'Harmony Hills',
  'Silver Creek Farm',
  'Oakwood Farm',
  'Maple Leaf Farm',
];

// Array of farming product statuses
const productStatuses = ['available', 'out of stock', 'seasonal', 'discontinued'];

// Array of farming product categories
const productCategories = [
  'Grains',
  'Vegetables',
  'Fruits',
  'Legumes',
  'Tubers',
  'Oilseeds',
];

// Generate farming products with relevant attributes
export const farmingProducts = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  imageUrl: `/assets/images/products/product_${index + 1}.jpg`,
  name: sample(farmingProductNames),
  farm: sample(farmLocations),
  isOrganic: faker.datatype.boolean(),
  status: sample(productStatuses),
  category: sample(productCategories),
  price: faker.finance.amount(1, 100, 2, 'INR '),
  sku: faker.finance.account(8),
  stock: faker.datatype.number({ min: 0, max: 100 }),
  addedDate: faker.date.recent(30),
}));

// Ensure the images directory contains images named product_1.jpg, product_2.jpg, ..., product_24.jpg.
