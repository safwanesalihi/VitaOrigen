import { useState } from "react";
import { motion } from "motion/react";

export default function Concept() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-[128px] px-[24px] md:px-[64px] bg-white">
      <div className="text-center mb-[80px]">
        <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">Notre Savoir-Faire</span>
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-black text-espresso">We Craft with <em className="italic font-accent text-gold">Nature</em></h2>
      </div>

      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {["Recette Exclusive", "8 Saveurs Naturelles", "Coffrets & Cadeaux"].map((tab, i) => (
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

      <div className="max-w-[1400px] mx-auto min-h-[500px] md:min-h-[620px] flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[40px] shadow-[0_40px_120px_rgba(26,77,92,0.1)] border border-taupe/10 bg-cream-alt">
        <div className="lg:w-[48%] bg-gradient-to-br from-espresso to-espresso-2 p-10 md:p-20 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(240,78,125,0.15),transparent)] pointer-events-none" />
          <div className="font-accent text-[160px] italic text-white/5 leading-none -mb-10 font-light select-none">
            {activeTab === 0 ? "01" : activeTab === 1 ? "02" : "03"}
          </div>
          <h3 className="font-serif text-[clamp(32px,3.5vw,48px)] font-black text-white leading-[1.1] mb-8 relative z-10">
            {activeTab === 0 ? "Recette Exclusive" : activeTab === 1 ? "8 Saveurs Naturelles" : "Coffrets & Cadeaux"}
          </h3>
          <p className="text-[17px] leading-relaxed text-white/70 mb-10 font-medium relative z-10">
            {activeTab === 0 
              ? "Notre recette repose sur la lyophilisation — une technique qui préserve 97% des vitamines et saveurs naturelles du fruit."
              : activeTab === 1
              ? "Chaque boule VitaOrigen est une saveur unique issue de fruits lyophilisés purs."
              : "Nos coffrets sont pensés pour offrir une expérience sensorielle complète. Emballage premium, présentation soignée."
            }
          </p>
          <ul className="space-y-6 relative z-10">
            {(activeTab === 0 
              ? ["Fruits lyophilisés purs", "Flocons d'avoine Premium", "Zéro sucre ajouté", "Zéro arôme artificiel"]
              : activeTab === 1
              ? ["Fraise · Framboise · Cerise · Myrtille", "Banane · Ananas · Orange · Kiwi", "Texture unique", "Goût authentique"]
              : ["Coffrets à partir de 89 MAD", "Coffret Découverte Signature", "Format 12 boules Prestige", "Personnalisation complète"]
            ).map(bullet => (
              <li key={bullet} className="flex items-center gap-5 text-[16px] font-bold text-white/90 group">
                <div className="w-2.5 h-2.5 bg-gold rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(240,78,125,0.8)]" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-[52%] relative min-h-[450px] overflow-hidden flex items-center justify-center">
          <motion.img 
            key={activeTab}
            initial={{ scale: 1.2, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            src={activeTab === 0 ? "/Products/1.png" : activeTab === 1 ? "/Products/12.png" : "/Products/11.png"} 
            className="w-[80%] h-[80%] object-contain z-10 drop-shadow-[0_20px_50px_rgba(26,77,92,0.2)]" 
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 rounded-full blur-[100px]" />
        </div>
      </div>
    </section>
  );
}
