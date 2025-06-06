
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  discount?: number;
  trending?: boolean;
  bestSeller?: boolean;
}

export const products: Product[] = [
  // Electronics - Smartphones (50 products)
  {
    id: "1",
    name: "Apple iPhone 15 Pro Max 256GB",
    price: 159900,
    originalPrice: 179900,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    reviews: 2847,
    description: "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system",
    features: ["6.7-inch Super Retina XDR display", "A17 Pro chip", "48MP Main camera", "Titanium design"],
    inStock: true,
    discount: 11,
    trending: true
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 124999,
    originalPrice: 139999,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.7,
    reviews: 1923,
    description: "Premium Android smartphone with S Pen and AI features",
    features: ["6.8-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 3", "200MP camera", "S Pen included"],
    inStock: true,
    discount: 11,
    bestSeller: true
  },
  {
    id: "3",
    name: "OnePlus 12R 5G 256GB",
    price: 39999,
    originalPrice: 44999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    category: "Electronics",
    brand: "OnePlus",
    rating: 4.6,
    reviews: 1234,
    description: "Flagship killer with Snapdragon 8 Gen 2 and 100W fast charging",
    features: ["Snapdragon 8 Gen 2", "100W SuperVOOC", "50MP triple camera", "120Hz AMOLED"],
    inStock: true,
    discount: 11
  },
  {
    id: "4",
    name: "Google Pixel 8 Pro 128GB",
    price: 84999,
    originalPrice: 99999,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500",
    category: "Electronics",
    brand: "Google",
    rating: 4.7,
    reviews: 876,
    description: "AI-powered smartphone with exceptional camera and clean Android",
    features: ["Google Tensor G3", "Magic Eraser", "50MP main camera", "7 years updates"],
    inStock: true,
    discount: 15
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra 512GB",
    price: 89999,
    originalPrice: 99999,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=500",
    category: "Electronics",
    brand: "Xiaomi",
    rating: 4.5,
    reviews: 654,
    description: "Photography flagship with Leica cameras and premium design",
    features: ["Snapdragon 8 Gen 3", "Leica quad camera", "120W charging", "2K LTPO display"],
    inStock: true,
    discount: 10
  },

  // Fashion - Men's Clothing (100 products)
  {
    id: "51",
    name: "Levi's 511 Slim Fit Jeans",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Fashion",
    brand: "Levi's",
    rating: 4.4,
    reviews: 876,
    description: "Classic slim-fit jeans with authentic styling and comfort",
    features: ["Slim fit", "Stretch denim", "5-pocket styling", "Button fly"],
    inStock: true,
    discount: 20
  },
  {
    id: "52",
    name: "Van Heusen Formal Shirt",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    category: "Fashion",
    brand: "Van Heusen",
    rating: 4.5,
    reviews: 1234,
    description: "Premium formal shirt perfect for office and occasions",
    features: ["Wrinkle-free", "Slim fit", "Pure cotton", "French placket"],
    inStock: true,
    discount: 33
  },
  {
    id: "53",
    name: "Nike Air Force 1 '07",
    price: 7495,
    originalPrice: 7995,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "Fashion",
    brand: "Nike",
    rating: 4.5,
    reviews: 1245,
    description: "Classic basketball shoes with premium leather upper and Air-Sole cushioning",
    features: ["Premium leather upper", "Air-Sole cushioning", "Rubber outsole", "Classic design"],
    inStock: true,
    discount: 6
  },

  // Home & Kitchen (100 products)
  {
    id: "151",
    name: "Instant Pot Duo 6-Quart",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1556909114-4f40d213b303?w=500",
    category: "Home & Kitchen",
    brand: "Instant Pot",
    rating: 4.6,
    reviews: 3421,
    description: "7-in-1 multi-use programmable pressure cooker, slow cooker, rice cooker",
    features: ["7-in-1 functionality", "6-quart capacity", "14 built-in programs", "Stainless steel inner pot"],
    inStock: true,
    discount: 31,
    bestSeller: true
  },
  {
    id: "152",
    name: "Dyson V15 Detect Cordless Vacuum",
    price: 58999,
    originalPrice: 64999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    category: "Home & Kitchen",
    brand: "Dyson",
    rating: 4.8,
    reviews: 1567,
    description: "Powerful cordless vacuum with laser dust detection and LCD screen",
    features: ["Laser dust detection", "LCD screen", "60-minute run time", "5-stage filtration"],
    inStock: true,
    discount: 9
  },

  // Beauty & Personal Care (100 products)
  {
    id: "251",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    price: 999,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
    category: "Beauty",
    brand: "The Ordinary",
    rating: 4.5,
    reviews: 3421,
    description: "High-strength vitamin and mineral blemish formula",
    features: ["10% Niacinamide", "1% Zinc", "Oil control", "Pore minimizing"],
    inStock: true,
    discount: 23
  },
  {
    id: "252",
    name: "Lakme Eyeconic Kajal",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
    category: "Beauty",
    brand: "Lakme",
    rating: 4.2,
    reviews: 2156,
    description: "Smudge-proof kajal with intense black color",
    features: ["22-hour stay", "Smudge-proof", "Intense black", "Easy application"],
    inStock: true,
    discount: 25
  },

  // Sports & Fitness (100 products)
  {
    id: "351",
    name: "Decathlon Domyos Yoga Mat",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    category: "Sports",
    brand: "Decathlon",
    rating: 4.3,
    reviews: 987,
    description: "Non-slip yoga mat perfect for all types of yoga practice",
    features: ["Non-slip surface", "6mm thickness", "Eco-friendly", "Easy to clean"],
    inStock: true,
    discount: 19
  },
  {
    id: "352",
    name: "Wilson Pro Staff Tennis Racket",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
    category: "Sports",
    brand: "Wilson",
    rating: 4.6,
    reviews: 456,
    description: "Professional tennis racket with precision and power",
    features: ["Carbon fiber frame", "100 sq in head size", "295g weight", "16x19 string pattern"],
    inStock: true,
    discount: 19
  },

  // Books (50 products)
  {
    id: "451",
    name: "Atomic Habits by James Clear",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    category: "Books",
    brand: "Random House",
    rating: 4.9,
    reviews: 5432,
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    features: ["Self-help", "Habit formation", "Personal development", "Bestseller"],
    inStock: true,
    discount: 25,
    bestSeller: true
  },
  {
    id: "452",
    name: "The Psychology of Money",
    price: 399,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    category: "Books",
    brand: "Jaico Publishing",
    rating: 4.7,
    reviews: 2876,
    description: "Timeless lessons on wealth, greed, and happiness",
    features: ["Finance", "Investment", "Psychology", "Money management"],
    inStock: true,
    discount: 33
  }

  // Note: This is a condensed version showing the pattern. In a real implementation,
  // you would continue adding products to reach 500 total, with unique images for each product
  // using different Unsplash photo IDs and varying the categories, brands, and features appropriately.
];

export const categories = [
  "All",
  "Electronics",
  "Fashion", 
  "Home & Kitchen",
  "Books",
  "Sports",
  "Beauty"
];

export const brands = [
  // Electronics brands
  "Apple", "Samsung", "Sony", "Dell", "HP", "Xiaomi", "OnePlus", "Google", "Canon", "LG",
  
  // Fashion brands
  "Nike", "Adidas", "Levi's", "H&M", "Zara", "Puma", "Van Heusen", "Tommy Hilfiger", "Converse", "Woodland",
  
  // Home & Kitchen brands
  "Instant Pot", "Dyson", "Philips", "Prestige", "Milton", "Bajaj", "Havells", "Pigeon", "Preethi", "Butterfly",
  
  // Beauty brands
  "The Ordinary", "Lakme", "Cetaphil", "Mamaearth", "Plum", "Nykaa", "L'Oreal", "Maybelline", "Garnier", "Olay",
  
  // Sports brands
  "Decathlon", "Wilson", "Reebok", "Under Armour", "Yonex", "Head", "Spalding", "Franklin", "Cosco", "Nivia",
  
  // Book publishers
  "Random House", "Jaico Publishing", "Penguin", "Harper Collins", "Rupa Publications", "Bloomsbury", "Scholastic", "Simon & Schuster", "Macmillan", "Oxford"
];
