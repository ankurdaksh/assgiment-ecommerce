const axios = require('axios');
require('dotenv').config();

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    const response = await axios.post('http://localhost:3000/api/products/seed');
    
    if (response.status === 200) {
      console.log('Database seeded successfully!');
      console.log(`Seeded ${response.data.count} products`);
    } else {
      throw new Error('Failed to seed database');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase().then(() => {
  console.log('Seeding process complete');
  process.exit(0);
});