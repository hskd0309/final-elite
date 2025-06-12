
import React, { useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Eye, Heart, Star, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 shadow-md ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-100">
          {/* Product Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.discount && (
              <Badge className="bg-red-500 text-white font-bold shadow-lg">
                {product.discount}% OFF
              </Badge>
            )}
            {product.trending && (
              <Badge variant="secondary" className="bg-orange-500 text-white shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {product.bestSeller && (
              <Badge variant="secondary" className="bg-green-500 text-white shadow-lg">
                <Award className="w-3 h-3 mr-1" />
                Bestseller
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-10 h-10 p-0 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-10 h-10 p-0 rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast.info('Wishlist feature coming soon!');
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative">
            {!imageLoaded && (
              <div className="w-full h-56 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-56 object-cover transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500';
                setImageLoaded(true);
              }}
            />
          </div>

          {/* Quick Add to Cart Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <Button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="mb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center bg-green-100 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-green-600 fill-current" />
            <span className="text-sm font-semibold text-green-700 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews.toLocaleString()})</span>
          {!product.inStock && (
            <Badge variant="destructive" className="ml-auto text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full text-sm font-semibold py-2.5 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
