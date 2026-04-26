import React from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { PRODUCTS } from '../constants';

export const useCheckout = () => {
  const { 
    selectedPack, 
    customPack, 
    customerInfo, 
    setIsSubmitting, 
    setOrderStatus, 
    setCustomPack, 
    setSelectedPack, 
    setCustomerInfo,
    totalInPack
  } = useCart();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalInPack === 0) return;

    setIsSubmitting(true);
    setOrderStatus('idle');

    try {
      const finalPrice = totalInPack < (selectedPack?.size || 4) ? totalInPack * 25 : (selectedPack?.price || 0);

      const { error } = await supabase
        .from('orders')
        .insert({
          customer_name: customerInfo.name,
          phone: customerInfo.phone,
          address: customerInfo.address,
          pack_type: selectedPack?.name || 'Unité',
          pack_size: selectedPack?.size || totalInPack,
          total_price: finalPrice,
          items: customPack
        });

      if (error) throw error;
      
      const flavors = Object.entries(customPack)
        .map(([id, count]) => {
          const p = PRODUCTS.find(x => x.id === id);
          return `- ${p?.name}: ${count}`;
        })
        .join('%0A');



      const message = `Bonjour VitaOrigen! %0A%0AJe souhaite commander:%0A*${selectedPack?.name || 'Commande à l\'unité'}*%0A%0A*Total:* ${finalPrice} MAD%0A%0A*Détails:*%0A${flavors}%0A%0A*Infos Client:*%0A- Nom: ${customerInfo.name}%0A- Tél: ${customerInfo.phone}%0A- Adresse: ${customerInfo.address}`;
      
      const whatsappUrl = `https://wa.me/212609742264?text=${message}`;
      
      setOrderStatus('success');
      setCustomPack({});
      setSelectedPack(null);
      setCustomerInfo({ name: '', phone: '', address: '' });

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 800);

    } catch (error) {
      console.error('Order failed:', error);
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCheckout };
};
