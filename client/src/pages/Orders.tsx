
import React from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Orders = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your orders</h2>
            <Button onClick={() => setLocation('/')}>Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  // Mock orders data
  const orders = [
    {
      id: 'ORD1703123456',
      date: '2024-01-15',
      status: 'delivered',
      total: 159900,
      items: [
        {
          name: 'Apple iPhone 15 Pro Max',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
          quantity: 1,
          price: 159900
        }
      ]
    },
    {
      id: 'ORD1703023456',
      date: '2024-01-10',
      status: 'shipped',
      total: 114900,
      items: [
        {
          name: 'MacBook Air M3',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
          quantity: 1,
          price: 114900
        }
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
            <Button onClick={() => navigate('/')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">Placed on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusText(order.status)}</span>
                      </div>
                      <div className="text-lg font-bold mt-1">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatPrice(item.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      )}
                    </div>
                    
                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
