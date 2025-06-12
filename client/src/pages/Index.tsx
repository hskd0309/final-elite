
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, Filter, Star, TrendingUp, Award } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, categories, brands } from '@/data/products';

const Index = () => {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const searchQuery = urlParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  // Clear search params when category is selected
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    window.history.pushState({}, '', '/');
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Featured: prioritize trending and bestsellers
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (b.trending && !a.trending) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (b.bestSeller && !a.bestSeller) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy, priceRange]);

  const trendingProducts = products.filter(p => p.trending).slice(0, 8);
  const bestSellers = products.filter(p => p.bestSeller).slice(0, 8);
  const topDeals = products.filter(p => (p.discount || 0) >= 20).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">EliteKart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TrendingUp className="w-5 h-5 mr-2" />
                10M+ Products
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                Trusted by 5M+ Users
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="w-5 h-5 mr-2" />
                Best Prices Guaranteed
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(1).map((category) => (
              <Card 
                key={category} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCategorySelect(category)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        {trendingProducts.length > 0 && !searchQuery && selectedCategory === 'All' && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 mr-2 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && !searchQuery && selectedCategory === 'All' && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 mr-2 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Top Deals */}
        {topDeals.length > 0 && !searchQuery && selectedCategory === 'All' && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 mr-2 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Top Deals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Filters and Search Results */}
        <section>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={(e) => handleCategorySelect(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Brand</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          value="All"
                          checked={selectedBrand === 'All'}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">All Brands</span>
                      </label>
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="brand"
                            value={brand}
                            checked={selectedBrand === brand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <Input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      />
                      <Input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Search Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {searchQuery ? `Search results for "${searchQuery}"` : 
                     selectedCategory !== 'All' ? `${selectedCategory} Products` : 'All Products'}
                  </h2>
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} products
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="discount">Highest Discount</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <Button onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setPriceRange([0, 200000]);
                    setSearchParams({});
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
