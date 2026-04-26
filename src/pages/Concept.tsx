import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { PACKS } from "../constants";

export default function Concept() {
  const [activeTab, setActiveTab] = useState(0);
  const { t, language } = useLanguage();
  const { setSelectedPack, setIsCheckoutOpen, setCustomPack } = useCart();

  const handleOrder = (tabIndex: number) => {
    // Map tab index to pack size
    // Tab 0 -> Pack 4
    // Tab 1 -> Pack 8
    // Tab 2 -> Pack 16
    const packSizes = [4, 8, 16];
    const targetSize = packSizes[tabIndex];
    const pack = PACKS.find(p => p.size === targetSize);
    
    if (pack) {
      setSelectedPack(pack);
      // Optional: Prefill with a message or just open checkout
      // We open checkout directly as per user "Commander" request
      setIsCheckoutOpen(true);
    }
  };

  const tabs = [
    t('concept_tab_1' as any),
    t('concept_tab_2' as any),
    t('concept_tab_3' as any)
  ];

  return (
    <section className={`py-[128px] px-[24px] md:px-[64px] bg-white ${language === 'ar' ? 'font-sans' : ''}`}>
      <div className="text-center mb-[80px]">
        <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">{t('concept_tag' as any)}</span>
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-black text-espresso">
          {t('concept_title_1' as any)} <em className="italic font-accent text-gold">{t('concept_title_2' as any)}</em>
        </h2>
      </div>

      <div className={`flex justify-center gap-4 mb-16 flex-wrap ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-8 py-4 rounded-full border-2 text-[14px] font-black tracking-widest transition-all duration-500 ease-spring ${
              activeTab === i 
              ? "bg-espresso border-espresso text-white shadow-xl" 
              : "border-taupe/20 text-taupe hover:border-gold hover:text-gold"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`max-w-[1400px] mx-auto min-h-[500px] md:min-h-[620px] flex flex-col ${language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch overflow-hidden rounded-[40px] shadow-[0_40px_120px_rgba(26,77,92,0.1)] border border-taupe/10 bg-cream-alt`}>
        <div className={`lg:w-[48%] bg-gradient-to-br from-espresso to-espresso-2 p-10 md:p-20 flex flex-col justify-center text-white relative overflow-hidden ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(240,78,125,0.15),transparent)] pointer-events-none" />
          <div className={`font-accent text-[160px] italic text-white/5 leading-none -mb-10 font-light select-none ${language === 'ar' ? 'text-left' : 'text-right'}`}>
            {activeTab === 0 ? "01" : activeTab === 1 ? "02" : "03"}
          </div>
          <h3 className="font-serif text-[clamp(32px,3.5vw,48px)] font-black text-white leading-[1.1] mb-8 relative z-10">
            {tabs[activeTab]}
          </h3>
          <p className="text-[17px] leading-relaxed text-white/70 mb-10 font-medium relative z-10">
            {t(`concept_desc_${activeTab + 1}` as any)}
          </p>
          <ul className="space-y-6 relative z-10">
            {(t(`concept_bullets_${activeTab + 1}` as any).split(',')).map((bullet: string) => (
              <li key={bullet} className={`flex items-center gap-5 text-[16px] font-bold text-white/90 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="w-2.5 h-2.5 bg-gold rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(240,78,125,0.8)] shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOrder(activeTab)}
            className="mt-12 w-fit px-10 py-5 bg-gold text-white rounded-[20px] font-black uppercase tracking-[0.2em] text-[13px] shadow-xl hover:shadow-gold/20 transition-all z-10"
          >
            {t('btn_commander')}
          </motion.button>
        </div>
        <div className="lg:w-[52%] relative min-h-[450px] overflow-hidden flex items-center justify-center">
          <motion.img 
            key={activeTab}
            initial={{ scale: 1.2, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            src={activeTab === 0 ? "/Products/7.png" : activeTab === 1 ? "/Products/11.png" : "/Products/10.png"} 
            className="w-[80%] h-[80%] object-contain z-10 drop-shadow-[0_20px_50px_rgba(26,77,92,0.2)]" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 rounded-full blur-[100px]" />
        </div>
      </div>
    </section>
  );
}
