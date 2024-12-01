import { connectDB } from '@/lib/db';
import { Product } from '@/lib/models/product';
import { ProductData } from '@/lib/constants/products';

export async function getAllProducts() {
  await connectDB();
  return Product.find({}).sort({ createdAt: -1 });
}

export async function createProduct(productData: ProductData) {
  await connectDB();
  return Product.create(productData);
}

export async function seedProducts(products: ProductData[]) {
  await connectDB();
  await Product.deleteMany({});
  return Product.insertMany(products);
}