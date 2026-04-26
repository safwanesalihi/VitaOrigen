/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight,
  Download,
  Instagram,
  Facebook,
  Package,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import { PRODUCTS, PACKS, Pack } from "./constants";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [customPack, setCustomPack] = useState<{ [key: string]: number }>({});

  const cycleItems = [
    "100% naturel freeze-dried fruit energy balls",
    "No sugar added. No artificial flavors.",
    "Crafted with love in Morocco",
    "8 fruity flavors to fuel your day"
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const interval = setInterval(() => {
      setCycleIndex(prev => (prev + 1) % cycleItems.length);
    }, 2900);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const totalInPack = Object.values(customPack).reduce((sum, count) => sum + count, 0);

  const addToPack = (productId: string) => {
    if (!selectedPack) return;
    if (totalInPack >= selectedPack.size) return;
    setCustomPack(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromPack = (productId: string) => {
    setCustomPack(prev => {
      const next = { ...prev };
      if (next[productId] > 1) {
        next[productId] -= 1;
      } else {
        delete next[productId];
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-gold/20 flex flex-col">
      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 h-[76px] z-[999] flex items-center justify-between px-[52px] backdrop-blur-[24px] border-b transition-all duration-400 ease-out-custom ${
        isScrolled 
        ? "bg-cream/97 shadow-[0_2px_48px_rgba(26,18,9,0.07)] border-gold/20" 
        : "bg-cream/86 border-gold/22"
      }`}>
        <a href="#" className="font-serif text-[22px] font-bold text-espresso tracking-tight">
          Vita<span className="text-gold italic">Origen</span>
        </a>

        <ul className="hidden lg:flex items-center gap-[38px] absolute left-1/2 -translate-x-1/2">
          {["Saveurs", "Concept", "Coffrets", "Pourquoi nous"].map(item => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase().replace(" ", "-")}`} 
                className="text-[13px] font-medium tracking-widest uppercase text-taupe hover:text-espresso relative group transition-colors"
              >
                {item}
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-widest">
            <button className="text-gold font-bold">FR</button>
            <span className="text-taupe/35">·</span>
            <button className="text-taupe">AR</button>
          </div>
          <a href="#commander" className="bg-espresso text-gold-lt px-[26px] py-[10px] rounded-full text-[13px] font-semibold tracking-wider hover:scale-105 hover:shadow-[0_8px_28px_rgba(26,18,9,0.32)] transition-all ease-spring">
            Commander
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-[76px] overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none z-1">
          <div className="absolute w-[180px] h-[180px] top-[10%] left-[5%] animate-f1 opacity-80"><span className="text-8xl">🍓</span></div>
          <div className="absolute w-[150px] h-[150px] top-[12%] right-[8%] animate-f2 opacity-80"><span className="text-7xl">🫐</span></div>
          <div className="absolute w-[130px] h-[130px] bottom-[15%] left-[10%] animate-f3 opacity-80"><span className="text-7xl">🍊</span></div>
          <div className="absolute w-[160px] h-[160px] bottom-[10%] right-[10%] animate-f1 opacity-80" style={{ animationDirection: 'reverse' }}><span className="text-8xl">🥝</span></div>
        </div>

        <div className="relative z-10 text-center px-7 max-w-[900px]">
          <motion.span 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-gold mb-7"
          >
            VitaOrigen · Energy Balls by VitaVie
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="font-serif text-[clamp(60px,9.5vw,116px)] font-black leading-[1.0] tracking-tighter text-espresso mb-8"
          >
            Where Nature<br />becomes <em className="block italic font-accent font-semibold text-gold not-italic">Energy</em>
          </motion.h1>

          <div className="h-[30px] overflow-hidden mb-[52px]">
            <motion.div 
              animate={{ translateY: -cycleIndex * 30 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              {cycleItems.map((item, i) => (
                <div key={i} className="h-[30px] flex items-center justify-center text-[17px] text-taupe tracking-tight whitespace-nowrap">
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.a 
            href="#saveurs" 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9 }}
            className="inline-flex items-center gap-[10px] px-[44px] py-[17px] border-[1.5px] border-gold rounded-full text-[14px] font-semibold uppercase tracking-widest text-espresso hover:bg-gold hover:text-cream hover:scale-105 hover:shadow-[0_16px_48px_rgba(201,151,58,0.35)] transition-all ease-spring group"
          >
            Découvrir nos saveurs
            <ArrowRight size={16} className="group-hover:translate-x-1 duration-300" />
          </motion.a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80">
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-taupe-lt">Scroll</span>
          <div className="w-[1px] h-[52px] bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-espresso py-[17px] overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-[26px] px-[26px] text-[12.5px] font-semibold tracking-widest uppercase text-gold-lt">
              100% Naturel <span className="text-gold text-[10px] opacity-65">✦</span> 
              Fruits Lyophilisés <span className="text-gold text-[10px] opacity-65">✦</span> 
              Sans Sucre <span className="text-gold text-[10px] opacity-65">✦</span> 
              Énergie Saine <span className="text-gold text-[10px] opacity-65">✦</span>
              Fait au Maroc <span className="text-gold text-[10px] opacity-65">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── CONCEPT / TABS ─── */}
      <section className="py-[116px] px-[52px] bg-cream" id="concept">
        <div className="text-center mb-[64px]">
          <span className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-gold mb-[14px] block">Notre Savoir-Faire</span>
          <h2 className="font-serif text-[clamp(34px,4.8vw,58px)] font-bold text-espresso leading-[1.15]">
            We Craft with <em className="italic font-accent text-gold">Nature</em>
          </h2>
        </div>

        <div className="flex justify-center gap-[10px] mb-[60px] flex-wrap">
          {["Recette Exclusive", "8 Saveurs Naturelles", "Coffrets & Cadeaux"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-[34px] py-[12px] rounded-full border-[1.5px] text-[13.5px] font-semibold tracking-wide transition-all ease-out-custom ${
                activeTab === i 
                ? "bg-espresso border-espresso text-gold-lt" 
                : "border-gold/28 text-taupe hover:border-gold hover:text-espresso"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[580px] flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[20px] shadow-2xl border border-gold/10">
          <div className="lg:w-[44%] bg-espresso p-[76px] lg:p-[64px] flex flex-col justify-center text-cream">
            <div className="font-accent text-[80px] italic text-gold/18 leading-none -mb-[18px] font-light">
              {activeTab === 0 ? "01" : activeTab === 1 ? "02" : "03"}
            </div>
            <h3 className="font-serif text-[clamp(26px,3vw,40px)] font-bold text-cream leading-[1.2] mb-[18px]">
              {activeTab === 0 ? "Recette Exclusive" : activeTab === 1 ? "8 Saveurs Naturelles" : "Coffrets & Cadeaux"}
            </h3>
            <p className="text-[15px] leading-relaxed text-cream/68 mb-[30px]">
              {activeTab === 0 
                ? "Notre recette repose sur la lyophilisation — une technique qui préserve 97% des vitamines et saveurs naturelles du fruit."
                : activeTab === 1
                ? "Chaque boule VitaOrigen est une saveur unique issue de fruits lyophilisés purs."
                : "Nos coffrets sont pensés pour offrir une expérience sensorielle complète. Emballage premium, présentation soignée."
              }
            </p>
            <ul className="space-y-[10px]">
              {(activeTab === 0 
                ? ["Fruits lyophilisés comme ingrédient principal", "Flocons d'avoine pour l'énergie durable", "Zéro sucre ajouté", "Zéro arôme artificiel"]
                : activeTab === 1
                ? ["Fraise · Framboise · Cerise · Myrtille", "Banane · Ananas · Orange · Kiwi", "Texture unique", "Goût authentique du fruit"]
                : ["Coffrets 4 boules à partir de 89 MAD", "Coffret découverte 8 saveurs à 149 MAD", "Grand coffret Signature 12 boules à 249 MAD", "Personnalisation disponible"]
              ).map(bullet => (
                <li key={bullet} className="flex items-start gap-3 text-[14px] font-medium text-cream/82">
                  <span className="text-gold text-2xl leading-none -mt-1">·</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-[56%] bg-cream-alt relative min-h-[400px]">
            <img 
              src={activeTab === 0 ? "Ongs/1.png" : activeTab === 1 ? "Ongs/12.png" : "Ongs/11.png"} 
              className="absolute inset-0 w-full h-full object-contain p-[48px] animate-pulse" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/22 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── PACK BUILDER (Integrated after Coffrets) ─── */}
      <section className="py-[116px] px-[52px] bg-cream-alt border-y border-gold/10" id="coffrets">
        <div className="max-w-[1220px] mx-auto bg-white rounded-[22px] shadow-[0_28px_72px_rgba(26,18,9,0.11)] overflow-hidden border border-gold/11 flex flex-col lg:flex-row min-h-[600px]">
          {/* Builder Sidebar */}
          <div className="lg:w-[40%] bg-espresso p-12 flex flex-col justify-between text-cream">
            <div>
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Excellence sur mesure</span>
              <h3 className="font-serif text-[38px] font-bold leading-tight mb-6">
                Créez votre <br /><span className="text-gold italic">Coffret Idéal</span>
              </h3>
              <p className="text-cream/60 text-[14px] leading-relaxed mb-10">
                Composez votre assortiment parfait. Choisissez une taille de coffret et remplissez-le de vos saveurs favorites.
              </p>

              <div className="space-y-4">
                {PACKS.map(pack => (
                  <button
                    key={pack.id}
                    onClick={() => { setSelectedPack(pack); setCustomPack({}); }}
                    className={`w-full p-5 rounded-[16px] border-[1.5px] transition-all flex items-center justify-between group ${
                      selectedPack?.id === pack.id 
                      ? "border-gold bg-gold/10" 
                      : "border-white/10 hover:border-gold/30"
                    }`}
                  >
                    <div className="text-left">
                      <div className={`font-bold text-[13px] uppercase tracking-widest ${selectedPack?.id === pack.id ? "text-gold" : "text-white"}`}>
                        {pack.name}
                      </div>
                      <div className="text-[11px] text-white/40 font-medium">Capacité: {pack.size} billes</div>
                    </div>
                    <div className="text-[19px] font-bold text-gold-lt">{pack.price} MAD</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedPack && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Remplissage</span>
                  <span className="text-[26px] font-serif italic text-gold">{totalInPack} / {selectedPack.size}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalInPack / selectedPack.size) * 100}%` }}
                    className="h-full bg-gold"
                  />
                </div>
                <button 
                  disabled={totalInPack < selectedPack.size}
                  className={`w-full mt-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] transition-all ${
                    totalInPack === selectedPack.size
                    ? "bg-gold text-espresso hover:scale-[1.02] active:scale-95 shadow-[0_12px_40px_rgba(201,151,58,0.3)]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  Ajouter au panier
                </button>
              </div>
            )}
          </div>

          {/* Flavor Selection */}
          <div className="lg:w-[60%] p-12 bg-white">
            {!selectedPack ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-cream-alt text-gold rounded-full flex items-center justify-center mb-6">
                  <Package size={32} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-espresso mb-2">Choisir un coffret</h4>
                <p className="text-[14px] text-taupe">Commencez par sélectionner une taille de coffret à gauche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.map(product => {
                  const count = customPack[product.id] || 0;
                  return (
                    <div key={product.id} className="relative group">
                      <button
                        onClick={() => addToPack(product.id)}
                        disabled={totalInPack >= selectedPack.size}
                        className={`w-full aspect-square rounded-[18px] flex flex-col items-center justify-center gap-2 border-[1.5px] transition-all p-4 ${
                          count > 0 
                          ? "border-gold bg-cream-alt shadow-lg" 
                          : "border-gold/10 bg-cream-alt/40 hover:border-gold/30 hover:bg-cream-alt"
                        } ${totalInPack >= selectedPack.size && count === 0 ? "opacity-30 grayscale" : ""}`}
                      >
                        <span className="text-4xl group-hover:scale-110 duration-300">{product.emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-espresso line-clamp-1">{product.name}</span>
                      </button>
                      
                      {count > 0 && (
                        <div className="absolute -top-2 -right-1 flex flex-col items-center gap-2">
                           <div className="w-7 h-7 bg-gold text-espresso rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-md mb-1">
                            {count}
                          </div>
                          <div className="flex flex-col gap-1">
                            <button onClick={() => addToPack(product.id)} disabled={totalInPack >= selectedPack.size} className="w-6 h-6 bg-espresso text-gold-lt rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-sm disabled:opacity-20"><Plus size={12} /></button>
                            <button onClick={() => removeFromPack(product.id)} className="w-6 h-6 bg-cream text-espresso rounded-full flex items-center justify-center hover:scale-110 active:scale-90 border border-gold/20 transition-all shadow-sm"><Minus size={12} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {totalInPack > 0 && selectedPack && (
              <div className="mt-12 pt-8 border-t border-gold/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(customPack).map(([id, count]) => {
                    const p = PRODUCTS.find(x => x.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2 bg-cream-alt px-3 py-1.5 rounded-full border border-gold/15">
                        <span className="text-base">{p?.emoji}</span>
                        <span className="text-[10px] font-bold text-espresso">{count}</span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setCustomPack({})} className="text-taupe-lt hover:text-espresso transition-colors"><Trash2 size={18} /></button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SAVEURS GRID ─── */}
      <section className="py-[116px] px-[52px] bg-cream" id="saveurs">
        <div className="text-center mb-[64px]">
          <span className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-gold mb-[14px] block">La Collection</span>
          <h2 className="font-serif text-[clamp(34px,4.8vw,58px)] font-bold text-espresso">Nos 8 <em className="italic font-accent text-gold">Saveurs</em></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[22px] max-w-[1220px] mx-auto">
          {PRODUCTS.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.9 }}
              className="bg-white rounded-[20px] overflow-hidden border border-gold/11 hover:-translate-y-2 hover:shadow-[0_28px_72px_rgba(26,18,9,0.11)] transition-all duration-450 ease-spring cursor-pointer group"
            >
              <div className="aspect-square bg-cream-alt p-[18px] flex items-center justify-center overflow-hidden">
                <span className="text-8xl group-hover:scale-105 group-hover:rotate-2 transition-transform duration-550 ease-spring">{p.emoji}</span>
              </div>
              <div className="p-[16px_20px_22px]">
                <div className="font-serif text-[17px] font-bold text-espresso mb-1">{p.name}</div>
                <div className="text-[12px] text-taupe tracking-wide">{p.description}</div>
                <span className="inline-block mt-[10px] px-[13px] py-[5px] bg-gold/10 rounded-full text-[11px] font-semibold text-gold tracking-widest">100% Naturel</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-[116px] px-[52px] bg-cream">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1220px] mx-auto">
          {[
            { label: "Saveurs Naturelles", val: "8+", dark: false, gold: false },
            { label: "Vitamines Préservées", val: "97%", dark: true, gold: false },
            { label: "Sucres Ajoutés", val: "0%", dark: false, gold: true },
            { label: "Ingrédients Naturels", val: "100%", dark: false, gold: false }
          ].map((s, i) => (
            <div 
              key={i} 
              className={`rounded-[20px] p-[44px_32px] text-center border transition-all duration-400 ease-spring hover:-translate-y-1.5 hover:shadow-xl ${
                s.dark ? "bg-espresso border-espresso text-gold-lt shadow-lg" : 
                s.gold ? "bg-gold border-gold text-cream shadow-lg" : 
                "bg-white border-gold/12 text-espresso"
              }`}
            >
              <div className={`font-serif text-[clamp(52px,5.5vw,76px)] font-black leading-none mb-2 ${s.dark ? "text-gold-lt" : s.gold ? "text-cream" : "text-espresso"}`}>
                {s.val}
              </div>
              <div className={`text-[13px] font-medium tracking-widest uppercase ${s.dark ? "text-cream/55" : s.gold ? "text-cream/85 font-semibold" : "text-taupe"}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="bg-espresso flex flex-col lg:flex-row min-h-[600px] overflow-hidden" id="commander">
        <div className="flex-1 flex flex-col justify-center p-[96px_80px] lg:p-[96px_80px]">
          <span className="text-[10.5px] font-bold tracking-widest uppercase text-gold mb-[18px]">Commencez votre voyage naturel</span>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-black leading-[1.1] text-cream mb-[18px]">
            Where Your Energy<br />Begins <em className="italic font-accent text-gold-lt not-italic">Naturally</em>
          </h2>
          <p className="text-[16px] leading-[1.75] text-cream/60 max-w-[460px] mb-[48px]">
            Choisissez votre saveur, savourez l'énergie naturelle. Chaque boule est une promesse de goût authentique.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="bg-gold text-espresso px-[38px] py-[17px] rounded-full text-[14px] font-bold tracking-wide hover:scale-105 hover:shadow-[0_18px_52px_rgba(201,151,58,0.42)] transition-all ease-spring flex items-center gap-2">
              Commander maintenant <ArrowRight size={16} />
            </a>
            <a href="#" className="border-[1.5px] border-cream/28 text-cream/80 px-[38px] py-[17px] rounded-full text-[14px] font-semibold tracking-wide hover:border-gold hover:text-gold-lt hover:scale-105 transition-all ease-spring flex items-center gap-2">
              Catalogue <Download size={16} />
            </a>
          </div>
        </div>
        <div className="lg:w-[42%] relative bg-cream-alt flex items-center justify-center p-12 overflow-hidden">
          <img src="Ongs/10.png" className="w-full h-full object-contain relative z-10 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso to-transparent z-0 opacity-10" />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-espresso-2 p-[52px_52px_36px] text-cream">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gold/10 pb-7 mb-[22px] gap-6">
          <div className="font-serif text-2xl font-bold text-gold-lt">VitaOrigen</div>
          <ul className="flex flex-wrap gap-[30px] uppercase text-[11.5px] font-semibold tracking-[0.1em] text-cream/35">
            <li><a href="#saveurs" className="hover:text-gold-lt transition-colors">Saveurs</a></li>
            <li><a href="#concept" className="hover:text-gold-lt transition-colors">Concept</a></li>
            <li><a href="#coffrets" className="hover:text-gold-lt transition-colors">Coffrets</a></li>
            <li><a href="#commander" className="hover:text-gold-lt transition-colors">Commander</a></li>
          </ul>
          <div className="flex gap-2.5">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-[38px] h-[38px] rounded-full border border-gold/18 flex items-center justify-center text-cream/45 hover:border-gold hover:text-gold-lt hover:scale-112 transition-all ease-spring">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-[11.5px] tracking-[0.07em] text-cream/25">
          All Rights Reserved &nbsp;·&nbsp; VitaOrigen by VitaVie &nbsp;·&nbsp; 2026
        </div>
      </footer>
    </div>
  );
}
