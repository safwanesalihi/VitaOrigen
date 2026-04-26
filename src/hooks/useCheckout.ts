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
    if (totalInPack === 0 && !selectedPack) return;

    setIsSubmitting(true);
    setOrderStatus('idle');

    try {
      const finalPrice = totalInPack < (selectedPack?.size || 4) ? totalInPack * 7 : (selectedPack?.price || 0);

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
      
      const flavors = Object.keys(customPack).length > 0 
        ? Object.entries(customPack)
            .map(([id, count]) => {
              const p = PRODUCTS.find(x => x.id === id);
              return `- ${p?.name}: ${count}`;
            })
            .join('%0A')
        : "Sélection Découverte (Mix de saveurs)";



      const message = encodeURIComponent(`Bonjour VitaOrigen! 

Je souhaite commander:
*${selectedPack?.name || 'Commande à l\'unité'}*

*Total:* ${finalPrice} MAD

*Détails:*
${flavors.replace(/%0A/g, '\n')}

*Infos Client:*
- Nom: ${customerInfo.name}
- Tél: ${customerInfo.phone}
- Adresse: ${customerInfo.address}`);
      
      const whatsappUrl = `https://wa.me/212609742264?text=${message}`;
      
      // We set success state but redirect immediately
      setOrderStatus('success');
      
      // Use window.location.href directly for better mobile compatibility
      window.location.href = whatsappUrl;
      
      // Reset state for next time
      setCustomPack({});
      setSelectedPack(null);
      setCustomerInfo({ name: '', phone: '', address: '' });

    } catch (error) {
      console.error('Order failed:', error);
      setOrderStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCheckout };
};
