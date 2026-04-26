import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Facebook, 
  Menu, 
  X as CloseIcon, 
  ShoppingCart,
  CheckCircle2,
  Loader2,
  X,
  Trash2,
  ArrowRight,
  Package,
  Minus,
  Plus
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../hooks/useCheckout";
import { useLanguage } from "../context/LanguageContext";
import { PRODUCTS } from "../constants"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { pathname } = useLocation();
  const { 
    totalInPack, 
    selectedPack, 
    customPack,
    setCustomPack,
    setIsCheckoutOpen, 
    isCheckoutOpen, 
    orderStatus, 
    setOrderStatus,
    customerInfo,
    setCustomerInfo,
    isSubmitting
  } = useCart();
  const { handleCheckout } = useCheckout();

  // Animation for cart icon when items are added
  useEffect(() => {
    if (totalInPack > 0) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalInPack]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.scrollTo(0, 0); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    { name: t('nav_saveurs'), path: "/saveurs" },
    { name: t('nav_concept'), path: "/concept" },
    { name: t('nav_why'), path: "/pourquoi-nous" }
  ];

  return (
    <div className={`min-h-screen bg-cream selection:bg-gold/20 flex flex-col ${language === 'ar' ? 'font-sans' : ''}`}>
      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 h-[70px] md:h-[84px] z-[999] flex items-center justify-between px-[20px] md:px-[64px] backdrop-blur-[24px] border-b transition-all duration-500 ease-spring ${
        isScrolled 
        ? "bg-white/80 shadow-[0_8px_48px_rgba(26,77,92,0.12)] border-taupe/10" 
        : "bg-transparent border-transparent"
      }`}>
        <Link to="/" className="font-serif text-[24px] md:text-[28px] font-black text-espresso tracking-tight group shrink-0">
          Vita<span className="text-gold italic group-hover:tracking-wider transition-all duration-500">Origen</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-[44px] absolute left-1/2 -translate-x-1/2">
          {navItems.map(item => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`text-[12px] font-black tracking-[0.15em] uppercase transition-all duration-500 ease-spring relative group ${
                  pathname === item.path ? "text-espresso" : "text-espresso/60 hover:text-espresso"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-500 ease-spring ${
                  pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsCartOpen(true);
              }}
              className={`relative p-3 rounded-full transition-all duration-500 z-[100] cursor-pointer hover:bg-gold/5 ${totalInPack > 0 ? "text-gold scale-110" : "text-taupe/40"}`}
            >
              <ShoppingCart size={24} />
              {totalInPack > 0 && (
                <motion.span 
                  key={totalInPack}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 bg-gold text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalInPack}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {showNotification && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-12 right-0 bg-espresso text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-xl pointer-events-none z-10"
                >
                  Ajouté au panier !
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] font-black tracking-widest hidden md:flex uppercase">
            <button 
              onClick={() => setLanguage('fr')}
              className={`${language === 'fr' ? 'text-gold' : 'text-taupe/60 hover:text-espresso'} transition-colors cursor-pointer`}
            >
              FR
            </button>
            <span className="text-taupe/35 font-normal">·</span>
            <button 
              onClick={() => setLanguage('ar')}
              className={`${language === 'ar' ? 'text-gold' : 'text-taupe/60 hover:text-espresso'} transition-colors cursor-pointer`}
            >
              AR
            </button>
          </div>
          <Link to="/saveurs" className="bg-espresso text-white px-[18px] md:px-[26px] py-[8px] md:py-[10px] rounded-full text-[11px] md:text-[13px] font-semibold tracking-wider hover:scale-105 hover:shadow-[0_8px_28px_rgba(26,18,9,0.32)] transition-all ease-spring">
            {t('btn_commander')}
          </Link>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-espresso p-1"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-espresso/60 backdrop-blur-md z-[1001]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-cream z-[1002] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif text-xl font-bold text-espresso">Vita<span className="text-gold italic">Origen</span></span>
                <button onClick={() => setIsMenuOpen(false)} className="text-espresso p-2 hover:bg-gold/10 rounded-full transition-colors">
                  <CloseIcon size={24} />
                </button>
              </div>

              <ul className="space-y-8">
                {navItems.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-3xl font-serif font-bold transition-colors block ${
                        pathname === item.path ? "text-gold" : "text-espresso hover:text-gold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── CART DRAWER ─── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-espresso/60 backdrop-blur-md z-[1001]"
            />
            <motion.div 
              initial={{ x: language === 'ar' ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: language === 'ar' ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} bottom-0 w-[90%] max-w-[450px] bg-white z-[1002] shadow-2xl flex flex-col`}
            >
              <div className="p-8 md:p-10 border-b border-taupe/10 flex justify-between items-center bg-cream-alt/30">
                <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                  <h3 className="font-serif text-2xl font-black text-espresso">{language === 'fr' ? 'Votre Panier' : 'سلة التسوق'}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-taupe mt-1">
                    {language === 'fr' ? 'Résumé de la sélection' : 'ملخص الاختيارات'}
                  </p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-espresso p-2 hover:bg-gold/10 rounded-full transition-colors">
                  <CloseIcon size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white" style={{ minHeight: '200px' }}>
                {totalInPack === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 bg-cream-alt text-gold/30 rounded-full flex items-center justify-center mb-6">
                      <Package size={32} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-espresso mb-2">{t('cart_empty')}</h4>
                    <Link to="/saveurs" onClick={() => setIsCartOpen(false)} className="text-gold font-black uppercase tracking-widest text-[11px] underline underline-offset-8 decoration-gold/30">
                      {t('cart_discover')}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Product List */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-taupe">Contenu du Pack</span>
                        <button onClick={() => setCustomPack({})} className="text-[10px] font-bold text-taupe/40 hover:text-gold uppercase tracking-widest transition-colors">Vider tout</button>
                      </div>
                      
                      {Object.keys(customPack).map((id) => {
                        const count = customPack[id];
                        const product = PRODUCTS.find(x => x.id === id);
                        if (!product) return null;
                        return (
                          <div 
                            key={id} 
                            className="flex items-center gap-4 p-4 bg-cream-alt/40 rounded-[22px] border border-taupe/5"
                          >
                            <div className="w-14 h-14 bg-white rounded-xl border border-taupe/5 flex items-center justify-center p-2 shadow-sm shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif text-[17px] font-bold text-espresso truncate">{product.name}</div>
                              <div className="flex items-center gap-3 mt-2">
                                <button 
                                  onClick={() => setCustomPack(prev => {
                                    const next = { ...prev };
                                    if (next[id] > 1) next[id] -= 1;
                                    else delete next[id];
                                    return next;
                                  })}
                                  className="w-6 h-6 rounded-full border border-taupe/20 flex items-center justify-center text-espresso hover:border-gold hover:text-gold transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-black text-espresso text-sm">{count}</span>
                                <button 
                                  onClick={() => {
                                    if (totalInPack < (selectedPack?.size || 999)) {
                                      setCustomPack(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
                                    }
                                  }}
                                  className="w-6 h-6 rounded-full border border-taupe/20 flex items-center justify-center text-espresso hover:border-gold hover:text-gold transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            <button 
                              onClick={() => setCustomPack(prev => {
                                const next = { ...prev };
                                delete next[id];
                                return next;
                              })}
                              className="p-2 text-taupe/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {totalInPack > 0 && (
                <div className="p-8 md:p-10 border-t border-taupe/10 bg-white">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-bold text-espresso">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-espresso">
                        {totalInPack < (selectedPack?.size || 4) 
                          ? totalInPack * 25 
                          : (selectedPack?.price || 0)
                        }
                      </span>
                      <span className="text-sm font-bold text-taupe ml-1">MAD</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[13px] transition-all duration-500 shadow-xl flex items-center justify-center gap-3 active:scale-95 bg-gold text-white hover:shadow-2xl"
                  >
                    Finaliser ma commande
                    <ArrowRight size={18} />
                  </button>
                  {totalInPack < (selectedPack?.size || 4) && (
                    <p className="text-center text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] mt-4">
                      Tarif à l'unité (25 MAD/bille)
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-espresso text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="font-serif text-3xl font-black mb-6 tracking-tight">Vita<span className="text-gold italic">Origen</span></div>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-sm">
                {language === 'fr' 
                  ? "Le fuel naturel des étudiants. Énergie saine, fruits lyophilisés, sans compromis. Fait avec passion au Maroc." 
                  : "وقود الطلاب الطبيعي. طاقة صحية، فواكه مجففة، بدون مساومات. صنع بشغف في المغرب."}
              </p>
            </div>
            <div>
              <h5 className="text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">{t('nav_concept')}</h5>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-white/60 hover:text-white transition-colors text-sm font-bold">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">Social</h5>
              <div className="flex gap-4">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500 group">
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} VitaOrigen · {language === 'fr' ? 'Fait avec ❤️ pour les étudiants' : 'صنع بـ ❤️ للطلاب'}
          </div>
        </div>
      </footer>

      {/* ─── CHECKOUT MODAL ─── */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[500px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gold/10"
            >
              {orderStatus === 'success' ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-espresso mb-4">Merci pour votre commande !</h3>
                  <p className="text-taupe mb-8">Nous avons bien reçu votre commande. Notre équipe vous contactera sous peu pour confirmer la livraison.</p>
                  <button 
                    onClick={() => { setIsCheckoutOpen(false); setOrderStatus('idle'); }}
                    className="bg-espresso text-gold-lt px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-8 border-b border-gold/5 flex items-center justify-between bg-cream-alt/30">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-espresso">Finaliser votre commande</h3>
                      <p className="text-[12px] text-taupe font-medium uppercase tracking-widest mt-1">Étape finale · Livraison au Maroc</p>
                    </div>
                    <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-cream rounded-full transition-colors">
                      <X size={20} className="text-taupe" />
                    </button>
                  </div>

                  <form onSubmit={handleCheckout} className="p-8 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-taupe ml-1">Nom Complet</label>
                      <input 
                        required
                        type="text"
                        value={customerInfo.name}
                        onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Votre nom"
                        className="w-full px-5 py-4 bg-cream-alt/50 border border-gold/10 rounded-2xl focus:border-gold focus:ring-0 transition-all text-espresso placeholder:text-taupe/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-taupe ml-1">Téléphone</label>
                      <input 
                        required
                        type="tel"
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="06 00 00 00 00"
                        className="w-full px-5 py-4 bg-cream-alt/50 border border-gold/10 rounded-2xl focus:border-gold focus:ring-0 transition-all text-espresso placeholder:text-taupe/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-taupe ml-1">Adresse de livraison</label>
                      <textarea 
                        required
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Votre adresse complète"
                        rows={3}
                        className="w-full px-5 py-4 bg-cream-alt/50 border border-gold/10 rounded-2xl focus:border-gold focus:ring-0 transition-all text-espresso placeholder:text-taupe/40 resize-none"
                      />
                    </div>

                    {orderStatus === 'error' && (
                      <p className="text-red-500 text-xs font-medium text-center">Une erreur est survenue. Veuillez réessayer.</p>
                    )}

                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-espresso text-gold-lt py-5 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        `Confirmer la commande · ${selectedPack?.price} MAD`
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
