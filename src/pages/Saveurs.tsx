import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS, PACKS } from "../constants";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Saveurs() {
  const { selectedPack, setSelectedPack, setCustomPack, setIsCheckoutOpen, totalInPack } = useCart();
  const { t, language } = useLanguage();

  const addToCurrentPack = (productId: string) => {
    // If no pack is selected, default to the pack of 4
    let pack = selectedPack;
    if (!pack) {
      pack = PACKS.find(p => p.id === 'pack4') || PACKS[1];
      setSelectedPack(pack);
    }

    if (totalInPack < pack.size) {
      setCustomPack(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
    } else {
      const msg = language === 'fr' 
        ? `Votre ${pack.name} est déjà complet. Veuillez ajuster votre panier.`
        : `حزمة ${pack.name} ممتلئة بالفعل. يرجى تعديل سلتك.`;
      alert(msg);
    }
  };

  const buySingleProduct = (productId: string) => {
    setSelectedPack({ id: 'single', name: language === 'fr' ? 'À l\'unité' : 'بشكل فردي', size: 1, price: 7 });
    setCustomPack({ [productId]: 1 });
    setIsCheckoutOpen(true);
  };

  return (
    <section className={`py-[128px] px-[20px] md:px-[64px] bg-cream ${language === 'ar' ? 'font-sans' : ''}`}>
      <div className="text-center mb-[80px]">
        <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">{t('saveurs_tag')}</span>
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-black text-espresso">
          {t('saveurs_title_1')} <em className="italic font-accent text-gold">{t('saveurs_title_2')}</em> {t('saveurs_title_3')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
        {PRODUCTS.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`bg-white rounded-[32px] overflow-hidden border border-taupe/10 hover:-translate-y-3 hover:shadow-[0_40px_100px_rgba(26,77,92,0.12)] transition-all duration-500 ease-spring group cursor-pointer ${language === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <div className="aspect-square bg-cream-alt p-[32px] flex items-center justify-center overflow-hidden relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 ease-spring" />
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-8">
              <div className={`flex items-center justify-between mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="font-serif text-[22px] font-black text-espresso">{t(`flavor_${p.id}_name` as any)}</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCurrentPack(p.id); }}
                  className="text-gold lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-x-2 lg:group-hover:translate-x-0 p-2 hover:bg-gold/10 rounded-full"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
              <p className="text-[14px] text-taupe leading-relaxed mb-6 font-medium">{t(`flavor_${p.id}_desc` as any)}</p>
              <div className={`flex items-center justify-between pt-4 border-t border-taupe/5 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="px-4 py-1.5 bg-gold/10 rounded-full text-[10px] font-black text-gold tracking-widest">{t('tag_natural')}</span>
                <button 
                  onClick={() => buySingleProduct(p.id)}
                  className="text-[12px] font-black uppercase tracking-widest text-espresso hover:text-gold transition-colors underline decoration-gold/30 underline-offset-4"
                >
                  {t('btn_quick_buy')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
