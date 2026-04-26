import { motion } from "motion/react";
import { Plus, Minus, Trash2, Package } from "lucide-react";
import { PRODUCTS, PACKS } from "../constants";
import { useCart } from "../context/CartContext";

export default function Coffrets() {
  const { 
    selectedPack, 
    setSelectedPack, 
    customPack, 
    setCustomPack, 
    setIsCheckoutOpen,
    totalInPack
  } = useCart();

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
    <section className="py-[100px] md:py-[160px] px-[20px] md:px-[64px] bg-[#F8FDFF]">
      <div className="max-w-[1400px] mx-auto bg-white rounded-[48px] shadow-[0_40px_120px_rgba(26,77,92,0.1)] overflow-hidden border border-taupe/10 flex flex-col lg:flex-row min-h-[750px]">
        {/* Builder Sidebar */}
        <div className="lg:w-[38%] bg-gradient-to-b from-espresso to-espresso-2 p-10 md:p-16 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-gold text-[12px] font-black uppercase tracking-[0.3em] mb-6 block">Artisanat sur mesure</span>
            <h3 className="font-serif text-[48px] md:text-[56px] font-black leading-[1] mb-12">
              Composez votre <br /><span className="text-gold italic">Chef-d'œuvre</span>
            </h3>
            
            <div className="space-y-4">
              {PACKS.map(pack => (
                <button
                  key={pack.id}
                  onClick={() => { setSelectedPack(pack); setCustomPack({}); }}
                  className={`w-full p-6 rounded-[28px] border-2 transition-all duration-500 flex items-center justify-between group relative overflow-hidden ${
                    selectedPack?.id === pack.id 
                    ? "border-gold bg-gold/10 shadow-[0_0_32px_rgba(240,78,125,0.2)]" 
                    : "border-white/5 hover:border-white/20 bg-white/5"
                  }`}
                >
                  <div className="text-left relative z-10">
                    <div className={`font-black text-[15px] uppercase tracking-[0.18em] mb-1 ${selectedPack?.id === pack.id ? "text-gold" : "text-white/80"}`}>
                      {pack.name}
                    </div>
                    <div className="text-[12px] text-white/40 font-bold">Capacité: {pack.size} {pack.size === 1 ? 'bille' : 'billes'}</div>
                  </div>
                  <div className="text-[24px] font-black text-gold relative z-10">{pack.price} MAD</div>
                </button>
              ))}
            </div>
          </div>

          {selectedPack && (
            <div className="mt-16 pt-10 border-t border-white/10 relative z-10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white/40">Remplissage</span>
                <span className="text-[32px] font-serif italic text-gold">{totalInPack} / {selectedPack.size}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalInPack / selectedPack.size) * 100}%` }}
                  className="h-full bg-gradient-to-r from-gold to-[#FF7597]"
                />
              </div>
              <button 
                onClick={() => {
                  if (totalInPack < selectedPack.size) {
                    alert(`Veuillez ajouter encore ${selectedPack.size - totalInPack} boules pour compléter votre ${selectedPack.name}.`);
                  } else {
                    setIsCheckoutOpen(true);
                  }
                }}
                className={`w-full mt-10 py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-[14px] transition-all duration-500 shadow-2xl active:scale-95 ${
                  totalInPack > 0
                  ? "bg-gold text-white hover:shadow-[0_20px_50px_rgba(240,78,125,0.4)]"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {totalInPack === 0 ? "Panier Vide" : totalInPack < selectedPack.size ? "Compléter le Coffret" : "Passer à la Caisse"}
              </button>
            </div>
          )}
        </div>

        {/* Flavor Selection */}
        <div className="lg:w-[62%] p-8 md:p-16 bg-white relative">
          {!selectedPack ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 bg-cream-alt text-gold rounded-full flex items-center justify-center mb-10 shadow-inner">
                <Package size={44} />
              </div>
              <h4 className="font-serif text-4xl font-black text-espresso mb-4">Choisir un coffret</h4>
              <p className="text-[17px] text-taupe font-medium max-w-[400px]">Sélectionnez la taille de votre coffret sur la gauche pour commencer la composition.</p>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {PRODUCTS.map(product => {
                  const count = customPack[product.id] || 0;
                  return (
                    <div key={product.id} className="relative group">
                      <button
                        onClick={() => addToPack(product.id)}
                        disabled={totalInPack >= selectedPack.size}
                        className={`w-full aspect-square rounded-[28px] flex flex-col items-center justify-center gap-3 border-2 transition-all duration-500 p-6 ${
                          count > 0 
                          ? "border-gold bg-[#FFF0F4] shadow-xl" 
                          : "border-taupe/10 bg-cream-alt/40 hover:border-gold/30 hover:bg-white"
                        } ${totalInPack >= selectedPack.size && count === 0 ? "opacity-30 grayscale" : ""}`}
                      >
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-espresso line-clamp-1">{product.name}</span>
                      </button>
                      
                      {count > 0 && (
                        <div className="absolute -top-3 -right-2 flex flex-col items-center gap-2">
                           <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-black text-xs ring-4 ring-white shadow-xl mb-1">
                            {count}
                          </div>
                          <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => addToPack(product.id)} disabled={totalInPack >= selectedPack.size} className="w-7 h-7 bg-espresso text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-md disabled:opacity-20"><Plus size={14} /></button>
                            <button onClick={() => removeFromPack(product.id)} className="w-7 h-7 bg-white text-espresso rounded-full flex items-center justify-center hover:scale-110 active:scale-90 border border-gold/20 transition-all shadow-md"><Minus size={14} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {totalInPack > 0 && (
                <div className="mt-auto pt-10 border-t border-taupe/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[13px] font-black uppercase tracking-[0.2em] text-espresso">Récapitulatif</span>
                    <button onClick={() => setCustomPack({})} className="text-gold hover:text-espresso transition-colors flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                      <Trash2 size={16} /> Tout vider
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(customPack).map(([id, count]) => {
                      const p = PRODUCTS.find(x => x.id === id);
                      return (
                        <div key={id} className="relative group">
                          <div className="w-20 h-20 bg-cream-alt rounded-[24px] border border-gold/10 flex items-center justify-center p-3 group-hover:border-gold transition-all duration-500">
                            <img src={p?.image} alt={p?.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold text-white rounded-full flex items-center justify-center text-[11px] font-black shadow-xl ring-4 ring-white">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
