
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                EliteKart
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <SearchBar />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Wishlist (placeholder) */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center space-x-2 hover:bg-gray-100"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
              </Button>

              {/* User button */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 hover:bg-gray-100"
                >
                  {isAuthenticated && user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}
                  </span>
                </Button>

                {/* User Dropdown */}
                {isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">
                        My Profile
                      </Link>
                      <Link to="/orders" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">
                        <Package className="w-4 h-4 inline mr-2" />
                        My Orders
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart button */}
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                  <span className="hidden sm:inline ml-2">Cart</span>
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-4 animate-fade-in">
              <div className="mb-4">
                <SearchBar />
              </div>
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 inline mr-3" />
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Package className="w-4 h-4 inline mr-3" />
                  My Orders
                </Link>
                <button
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="w-4 h-4 inline mr-3" />
                  Wishlist
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Header;
