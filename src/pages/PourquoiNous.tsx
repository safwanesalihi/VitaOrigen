import { motion } from "motion/react";

export default function PourquoiNous() {
  return (
    <section className="py-[128px] px-[24px] md:px-[64px] bg-cream">
      <div className="text-center mb-[80px]">
        <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">Pourquoi VitaOrigen</span>
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-black text-espresso">L'Excellence du <em className="italic font-accent text-gold">Fruit</em></h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
        {[
          { label: "Focus Étudiant", val: "100%", dark: false, gold: false, desc: "Concentration optimale pour vos révisions." },
          { label: "Énergie Longue Durée", val: "4h+", dark: true, gold: false, desc: "Sans le crash de sucre des boissons énergisantes." },
          { label: "Vitamines Naturelles", val: "97%", dark: false, gold: true, desc: "Préservées par lyophilisation pour votre cerveau." },
          { label: "Snack Portable", val: "Zéro", dark: false, gold: false, desc: "Zéro préparation, parfait pour la bibliothèque." }
        ].map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`rounded-[32px] p-[48px_32px] text-center border transition-all duration-500 ease-spring hover:-translate-y-3 hover:shadow-2xl ${
              s.dark ? "bg-espresso border-espresso text-white shadow-xl" : 
              s.gold ? "bg-gold border-gold text-white shadow-xl" : 
              "bg-white border-taupe/10 text-espresso"
            }`}
          >
            <div className={`font-serif text-[clamp(44px,5vw,72px)] font-black leading-none mb-4 ${s.dark || s.gold ? "text-white" : "text-espresso"}`}>
              {s.val}
            </div>
            <div className={`text-[12px] font-black tracking-[0.2em] uppercase mb-4 ${s.dark || s.gold ? "text-white/70" : "text-taupe"}`}>
              {s.label}
            </div>
            <p className={`text-[13px] leading-relaxed font-medium ${s.dark || s.gold ? "text-white/50" : "text-taupe/60"}`}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 max-w-[1000px] mx-auto text-center">
        <div className="inline-block px-6 py-2 bg-gold/10 rounded-full text-gold text-[12px] font-black uppercase tracking-widest mb-8">Spécial Examens</div>
        <p className="text-[20px] md:text-[28px] leading-relaxed text-espresso font-serif italic font-medium">
          "Le snack ultime pour survivre aux nuits blanches et aux partiels sans sacrifier sa santé."
        </p>
      </div>
    </section>
  );
}
