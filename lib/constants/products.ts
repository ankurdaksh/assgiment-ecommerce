export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Wearables',
  'Photography',
  'Accessories',
  'Appliances'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export interface ProductData {
  _id ?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  stock: number;
}

export const initialProducts: ProductData[] = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
    stock: 50
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, sleep tracking, and workout analytics.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "Wearables",
    stock: 75
  },
  {
    name: "Professional Camera Kit",
    description: "Complete photography kit including a professional DSLR camera, lenses, and accessories. Perfect for photography enthusiasts.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    category: "Photography",
    stock: 15
  },
  {
    name: "Minimalist Backpack",
    description: "Stylish and functional backpack perfect for daily commute or travel. Features multiple compartments and water-resistant material.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Accessories",
    stock: 100
  },
  {
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality. Control your smart home devices and enjoy your favorite music.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
    category: "Electronics",
    stock: 60
  },
  {
    name: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with programmable settings. Make barista-quality coffee at home.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    category: "Appliances",
    stock: 30
  }
];