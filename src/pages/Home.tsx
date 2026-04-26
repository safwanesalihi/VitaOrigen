import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../constants";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  
  const cycleItems = [
    language === 'fr' ? "100% naturel freeze-dried fruit energy balls" : "كرات طاقة بالفواكه المجففة طبيعية 100%",
    language === 'fr' ? "No sugar added. No artificial flavors." : "بدون سكر مضاف. بدون نكهات اصطناعية.",
    language === 'fr' ? "Crafted with love in Morocco" : "صنع بكل حب في المغرب",
    language === 'fr' ? "8 fruity flavors to fuel your day" : "8 نكهات فواكه لتغذية يومك"
  ];

  return (
    <div className={language === 'ar' ? 'font-sans' : ''}>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-[84px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-1">
          <div className="absolute w-[180px] h-[180px] top-[10%] left-[5%] animate-f1 opacity-80">
            <img src={PRODUCTS[0].image} alt="" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <div className="absolute w-[150px] h-[150px] top-[12%] right-[8%] animate-f2 opacity-80">
            <img src={PRODUCTS[1].image} alt="" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <div className="absolute w-[130px] h-[130px] bottom-[15%] left-[10%] animate-f3 opacity-80">
            <img src={PRODUCTS[6].image} alt="" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <div className="absolute w-[160px] h-[160px] bottom-[10%] right-[10%] animate-f1 opacity-80" style={{ animationDirection: 'reverse' }}>
            <img src={PRODUCTS[7].image} alt="" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </div>

        <div className="relative z-10 text-center px-7 max-w-[900px]">
          <motion.span 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-gold mb-7"
          >
            {t('home_hero_tag')}
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="font-serif text-[clamp(44px,9.5vw,116px)] font-black leading-[1.0] tracking-tighter text-espresso mb-8"
          >
            {t('home_hero_title_1')}<br />{t('home_hero_title_2')} <em className="block italic font-accent font-semibold text-gold not-italic">{t('home_hero_title_3')}</em>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[18px] text-taupe font-medium mb-12"
          >
            {cycleItems[0]}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9 }}
          >
            <Link 
              to="/saveurs" 
              className="inline-flex items-center gap-[12px] px-[48px] py-[20px] bg-gradient-to-r from-gold to-[#FF7597] text-white rounded-full text-[14px] font-black uppercase tracking-[0.18em] hover:scale-105 hover:shadow-[0_24px_56px_rgba(240,78,125,0.45)] active:scale-95 transition-all duration-500 ease-spring group"
            >
              {t('btn_commander')}
              <ArrowRight size={18} className={`${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5'} transition-transform duration-500`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-espresso py-[20px] overflow-hidden">
        <motion.div 
          animate={{ x: language === 'ar' ? [1000, 0] : [0, -1000] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-[26px] px-[26px] text-[13px] font-black tracking-widest uppercase text-white/90">
              {t('home_marquee_1')} <span className="text-gold text-[12px]">✦</span> 
              {t('home_marquee_2')} <span className="text-gold text-[12px]">✦</span> 
              {t('home_marquee_3')} <span className="text-gold text-[12px]">✦</span> 
              {t('home_marquee_4')} <span className="text-gold text-[12px]">✦</span>
              {t('home_marquee_5')} <span className="text-gold text-[12px]">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── PROCESSUS ─── */}
      <section className="py-[120px] px-[20px] md:px-[64px] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-[80px]">
            <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">{t('home_how_tag')}</span>
            <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-black text-espresso">
              {t('home_how_title_1')} <em className="italic font-accent text-gold">{t('home_how_title_2')}</em> {t('home_how_title_3')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: t('home_step_1_title'), 
                desc: t('home_step_1_desc')
              },
              { 
                step: "02", 
                title: t('home_step_2_title'), 
                desc: t('home_step_2_desc')
              },
              { 
                step: "03", 
                title: t('home_step_3_title'), 
                desc: t('home_step_3_desc')
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`font-accent text-[80px] text-gold/10 absolute -top-10 ${language === 'ar' ? '-right-4' : '-left-4'} font-light group-hover:text-gold/20 transition-colors`}>{item.step}</div>
                <h3 className="font-serif text-2xl font-black text-espresso mb-4 relative z-10">{item.title}</h3>
                <p className="text-taupe leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STUDENT FOCUS SECTION ─── */}
      <section className="py-[120px] px-[20px] md:px-[64px] bg-cream-alt/30">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse" />
             <div className="relative z-10 rounded-[48px] overflow-hidden shadow-2xl border border-taupe/10 aspect-[4/5] bg-espresso">
               <img src="/Products/12.png" className="w-full h-full object-contain p-20 animate-f1" alt="Student Fuel" />
               <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                  <div className="text-gold font-black text-[10px] uppercase tracking-widest mb-2">{t('home_student_advice_tag')}</div>
                  <p className="text-white text-sm font-medium leading-relaxed">{t('home_student_advice_desc')}</p>
               </div>
             </div>
          </div>
          <div className={`lg:w-1/2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <span className="text-gold text-[12px] font-black uppercase tracking-[0.3em] mb-6 block">{t('student_fuel_subtitle')}</span>
            <h2 className="font-serif text-[clamp(40px,5.5vw,80px)] font-black text-espresso leading-[1] mb-10">
              {t('home_student_title_1')} <br /><span className="text-gold italic font-accent">{t('home_student_title_2')}</span> {t('home_student_title_3')}
            </h2>
            <div className="space-y-8">
              {[
                { t: t('home_student_feat_1_t'), d: t('home_student_feat_1_d') },
                { t: t('home_student_feat_2_t'), d: t('home_student_feat_2_d') },
                { t: t('home_student_feat_3_t'), d: t('home_student_feat_3_d') }
              ].map((item, i) => (
                <div key={i} className={`flex gap-6 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-taupe/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shrink-0">
                    <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-espresso mb-2">{item.t}</h3>
                    <p className="text-taupe leading-relaxed text-sm font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/saveurs" className={`mt-16 inline-flex items-center gap-3 text-espresso font-black uppercase tracking-widest text-[13px] group border-b-2 border-gold/30 pb-2 hover:border-gold transition-all`}>
              {t('home_student_cta')} <ArrowRight size={18} className={`${language === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'} transition-transform`} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-[120px] px-[20px] md:px-[64px] bg-cream">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-[64px]">
            <span className="text-[12px] font-black tracking-[0.25em] uppercase text-gold mb-4 block">{t('home_faq_tag')}</span>
            <h2 className="font-serif text-4xl font-black text-espresso">{t('home_faq_title')}</h2>
          </div>

          <div className="space-y-6">
            {[
              { q: t('home_faq_1_q'), a: t('home_faq_1_a') },
              { q: t('home_faq_2_q'), a: t('home_faq_2_a') },
              { q: t('home_faq_3_q'), a: t('home_faq_3_a') }
            ].map((faq, i) => (
              <div key={i} className={`bg-white p-8 rounded-[24px] border border-taupe/10 shadow-sm ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className="font-serif text-xl font-black text-espresso mb-3">{faq.q}</h3>
                <p className="text-taupe text-sm leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
