
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface PaymentPageProps {
  totalAmount: number;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentPage = ({ totalAmount, onBack, onPaymentSuccess }: PaymentPageProps) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    postalCode: ''
  });
  const [upiId, setUpiId] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate based on payment method
      if (selectedPayment === 'card') {
        if (!cardData.cardHolder || !cardData.cardNumber || !cardData.expiry || !cardData.cvv) {
          toast.error('Please fill in all card details');
          return;
        }
      } else if (selectedPayment === 'upi') {
        if (!upiId) {
          toast.error('Please enter your UPI ID');
          return;
        }
      }

      toast.success('Payment successful!');
      onPaymentSuccess();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Payment Details</h1>
        </div>

        <form onSubmit={handlePayment}>
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Credit/Debit Card */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === 'card'}
                      onChange={() => setSelectedPayment('card')}
                    />
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                </div>

                {/* UPI */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={selectedPayment === 'upi'}
                      onChange={() => setSelectedPayment('upi')}
                    />
                    <Smartphone className="w-5 h-5" />
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-500">GPay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                </div>

                {/* Net Banking */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPayment('netbanking')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={selectedPayment === 'netbanking'}
                      onChange={() => setSelectedPayment('netbanking')}
                    />
                    <Building2 className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-gray-500">All major banks</p>
                    </div>
                  </div>
                </div>

                {/* Wallet */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPayment('wallet')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={selectedPayment === 'wallet'}
                      onChange={() => setSelectedPayment('wallet')}
                    />
                    <Wallet className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Digital Wallets</p>
                      <p className="text-sm text-gray-500">Paytm, Mobikwik, Amazon Pay</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            {selectedPayment === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardHolder">Cardholder Name</Label>
                    <Input
                      id="cardHolder"
                      value={cardData.cardHolder}
                      onChange={(e) => setCardData({...cardData, cardHolder: e.target.value})}
                      placeholder="Enter cardholder name"
                      required={selectedPayment === 'card'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                      placeholder="1111 2222 3333 4444"
                      maxLength={19}
                      required={selectedPayment === 'card'}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        placeholder="MM/YY"
                        maxLength={5}
                        required={selectedPayment === 'card'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={3}
                        required={selectedPayment === 'card'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={cardData.postalCode}
                        onChange={(e) => setCardData({...cardData, postalCode: e.target.value})}
                        placeholder="110001"
                        required={selectedPayment === 'card'}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === 'upi' && (
              <Card>
                <CardHeader>
                  <CardTitle>UPI Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@paytm"
                      required={selectedPayment === 'upi'}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === 'netbanking' && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Bank</CardTitle>
                </CardHeader>
                <CardContent>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </CardContent>
              </Card>
            )}

            {selectedPayment === 'wallet' && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">Paytm</Button>
                    <Button variant="outline" type="button">Mobikwik</Button>
                    <Button variant="outline" type="button">Amazon Pay</Button>
                    <Button variant="outline" type="button">Freecharge</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>{formatPrice(totalAmount * 0.18)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(totalAmount + (totalAmount * 0.18))}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pay Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ${formatPrice(totalAmount + (totalAmount * 0.18))}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
