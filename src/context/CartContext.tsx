import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Pack } from '../constants';

export interface CartContextType {
  selectedPack: Pack | null;
  setSelectedPack: (pack: Pack | null) => void;
  customPack: { [key: string]: number };
  setCustomPack: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  totalInPack: number;
  customerInfo: { name: string; phone: string; address: string };
  setCustomerInfo: React.Dispatch<React.SetStateAction<{ name: string; phone: string; address: string }>>;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  orderStatus: 'idle' | 'success' | 'error';
  setOrderStatus: (status: 'idle' | 'success' | 'error') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Load initial state from localStorage
  const [selectedPack, setSelectedPack] = useState<Pack | null>(() => {
    const saved = localStorage.getItem('vita_selected_pack');
    return saved ? JSON.parse(saved) : null;
  });

  const [customPack, setCustomPack] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem('vita_custom_pack');
    return saved ? JSON.parse(saved) : {};
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vita_selected_pack', JSON.stringify(selectedPack));
  }, [selectedPack]);

  useEffect(() => {
    localStorage.setItem('vita_custom_pack', JSON.stringify(customPack));
  }, [customPack]);

  const totalInPack = Object.values(customPack).reduce((sum, count) => (sum as number) + (count as number), 0);

  return (
    <CartContext.Provider value={{ 
      selectedPack, 
      setSelectedPack, 
      customPack, 
      setCustomPack, 
      isCheckoutOpen, 
      setIsCheckoutOpen,
      totalInPack,
      customerInfo,
      setCustomerInfo,
      isSubmitting,
      setIsSubmitting,
      orderStatus,
      setOrderStatus
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
