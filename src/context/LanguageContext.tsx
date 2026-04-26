import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    nav_saveurs: "Saveurs",
    nav_concept: "Concept",
    nav_coffrets: "Coffrets",
    nav_why: "Pourquoi nous",
    hero_title: "Là où la Nature devient Énergie",
    hero_subtitle: "Billes d'énergie aux fruits lyophilisés 100% naturels",
    hero_cta: "Commander maintenant",
    student_fuel_title: "Boostez vos Révisions naturellement",
    student_fuel_subtitle: "Le Fuel des Étudiants",
    cart_empty: "Votre panier est vide",
    cart_discover: "Découvrir la collection",
    cart_total: "Total",
    cart_checkout: "Finaliser ma commande",
    checkout_title: "Finaliser votre commande",
    checkout_name: "Nom Complet",
    checkout_phone: "Téléphone",
    checkout_address: "Adresse de livraison",
    checkout_confirm: "Confirmer la commande",
    unit_price_note: "Tarif à l'unité (25 MAD/bille)",
    btn_commander: "Commander",
    btn_discover: "Découvrir",
    btn_add_cart: "Ajouter au panier",
    btn_quick_buy: "Achat rapide",
    footer_tagline: "Le fuel naturel des étudiants. Énergie saine, fruits lyophilisés, sans compromis. Fait avec passion au Maroc.",
    footer_made_with: "Fait avec ❤️ pour les étudiants",
    home_hero_tag: "VitaOrigen · Energy Balls by VitaVie",
    home_hero_title_1: "Là où la Nature",
    home_hero_title_2: "devient",
    home_hero_title_3: "Énergie",
    home_marquee_1: "100% Naturel",
    home_marquee_2: "Fruits Lyophilisés",
    home_marquee_3: "Sans Sucre",
    home_marquee_4: "Énergie Saine",
    home_marquee_5: "Fait au Maroc",
    home_how_tag: "Comment ça marche",
    home_how_title_1: "Un Voyage de la",
    home_how_title_2: "Nature",
    home_how_title_3: "à votre main",
    home_step_1_title: "Lyophilisation Pure",
    home_step_1_desc: "Nous utilisons des fruits cueillis à maturité, puis lyophilisés pour préserver 97% des nutriments et du goût authentique.",
    home_step_2_title: "Pressage à Froid",
    home_step_2_desc: "Les fruits sont mélangés à des flocons d'avoine premium et pressés à froid sans aucune cuisson pour garder toute l'énergie.",
    home_step_3_title: "Zéro Compromis",
    home_step_3_desc: "Aucun sucre ajouté, aucun conservateur. Juste la pureté du fruit dans une bille d'énergie pratique.",
    home_student_advice_tag: "Conseil Révision",
    home_student_advice_desc: "Une bille VitaOrigen toutes les 2 heures permet de maintenir un niveau de glucose stable pour une concentration maximale.",
    home_student_title_1: "Boostez vos",
    home_student_title_2: "Révisions",
    home_student_title_3: "naturellement",
    home_student_feat_1_t: "Zéro Crash Énergétique",
    home_student_feat_1_d: "Contrairement au café ou aux boissons sucrées, nos fruits lyophilisés libèrent l'énergie progressivement.",
    home_student_feat_2_t: "Prêt pour la Bibliothèque",
    home_student_feat_2_d: "Silencieux, sans odeur et ne tache pas les doigts. Le snack discret idéal pour bosser en silence.",
    home_student_feat_3_t: "Focus & Mémoire",
    home_student_feat_3_d: "Riche en antioxydants naturels qui aident à combattre la fatigue mentale pendant les examens.",
    home_student_cta: "Découvrir la collection Étudiant",
    home_faq_tag: "Des questions ?",
    home_faq_title: "Questions Fréquentes",
    home_faq_1_q: "Qu'est-ce que la lyophilisation ?",
    home_faq_1_a: "C'est un processus de séchage à froid qui retire l'eau du fruit tout en préservant sa structure, ses vitamines et ses saveurs naturelles.",
    home_faq_2_q: "Y a-t-il du sucre ajouté ?",
    home_faq_2_a: "Absolument aucun. La sucrosité de nos billes provient uniquement du sucre naturel présent dans les fruits.",
    home_faq_3_q: "Quelle est la durée de conservation ?",
    home_faq_3_a: "Grâce à notre processus de fabrication, nos billes se conservent parfaitement pendant 6 mois dans un endroit sec."
  },
  ar: {
    nav_saveurs: "النكهات",
    nav_concept: "المفهوم",
    nav_coffrets: "الصناديق",
    nav_why: "لماذا نحن",
    hero_title: "حيثما تصبح الطبيعة طاقة",
    hero_subtitle: "كرات طاقة بالفواكه المجففة طبيعية 100%",
    hero_cta: "اطلب الآن",
    student_fuel_title: "عزز تركيزك في المراجعة بشكل طبيعي",
    student_fuel_subtitle: "وقود الطلاب",
    cart_empty: "سلتك فارغة",
    cart_discover: "اكتشف المجموعة",
    cart_total: "المجموع",
    cart_checkout: "إتمام الطلب",
    checkout_title: "إتمام طلبك",
    checkout_name: "الاسم الكامل",
    checkout_phone: "رقم الهاتف",
    checkout_address: "عنوان التوصيل",
    checkout_confirm: "تأكيد الطلب",
    unit_price_note: "سعر الحبة (25 درهم)",
    btn_commander: "اطلب الآن",
    btn_discover: "اكتشف",
    btn_add_cart: "أضف إلى السلة",
    btn_quick_buy: "شراء سريع",
    footer_tagline: "وقود الطلاب الطبيعي. طاقة صحية، فواكه مجففة، بدون مساومات. صنع بشغف في المغرب.",
    footer_made_with: "صنع بـ ❤️ للطلاب",
    home_hero_tag: "VitaOrigen · كرات الطاقة من VitaVie",
    home_hero_title_1: "حيثما تصبح",
    home_hero_title_2: "الطبيعة",
    home_hero_title_3: "طاقة",
    home_marquee_1: "100% طبيعي",
    home_marquee_2: "فواكه مجففة",
    home_marquee_3: "بدون سكر",
    home_marquee_4: "طاقة صحية",
    home_marquee_5: "صنع في المغرب",
    home_how_tag: "كيف يعمل؟",
    home_how_title_1: "رحلة من",
    home_how_title_2: "الطبيعة",
    home_how_title_3: "إلى يدك",
    home_step_1_title: "تجفيف طبيعي نقي",
    home_step_1_desc: "نستخدم فواكه مقطوفة عند النضج، ثم نجففها للحفاظ على 97٪ من العناصر الغذائية والطعم الأصلي.",
    home_step_2_title: "ضغط بارد",
    home_step_2_desc: "تُخلط الفواكه مع رقائق الشوفان الفاخرة وتُضغط على البارد بدون أي طهي للحفاظ على كل الطاقة.",
    home_step_3_title: "بدون مساومات",
    home_step_3_desc: "لا سكر مضاف، لا مواد حافظة. فقط نقاء الفاكهة في كرة طاقة عملية.",
    home_student_advice_tag: "نصيحة للمراجعة",
    home_student_advice_desc: "حبة واحدة من VitaOrigen كل ساعتين تساعد في الحفاظ على مستوى مستقر من السكر لتركيز أقصى.",
    home_student_title_1: "عزز",
    home_student_title_2: "مراجعتك",
    home_student_title_3: "بشكل طبيعي",
    home_student_feat_1_t: "بدون هبوط مفاجئ في الطاقة",
    home_student_feat_1_d: "على عكس القهوة أو المشروبات السكرية، تطلق فواكهنا المجففة الطاقة تدريجيًا.",
    home_student_feat_2_t: "مثالي للمكتبة",
    home_student_feat_2_d: "صامت، بدون رائحة ولا يترك أثراً على الأصابع. الوجبة الخفيفة المثالية للعمل في صمت.",
    home_student_feat_3_t: "التركيز والذاكرة",
    home_student_feat_3_d: "غني بمضادات الأكسدة الطبيعية التي تساعد في محاربة التعب الذهني أثناء الامتحانات.",
    home_student_cta: "اكتشف مجموعة الطلاب",
    home_faq_tag: "هل لديك أسئلة؟",
    home_faq_title: "الأسئلة المتكررة",
    home_faq_1_q: "ما هو التجفيف بالتجميد (Lyophilisation)؟",
    home_faq_1_a: "هي عملية تجفيف باردة تزيل الماء من الفاكهة مع الحفاظ على بنيتها وفيتاميناتها ونكهاتها الطبيعية.",
    home_faq_2_q: "هل يوجد سكر مضاف؟",
    home_faq_2_a: "أبداً. حلاوة كراتنا تأتي فقط من السكر الطبيعي الموجود في الفاكهة.",
    home_faq_3_q: "ما هي مدة الصلاحية؟",
    home_faq_3_a: "بفضل عملية التصنيع لدينا، تبقى الكرات في حالة ممتازة لمدة 6 أشهر في مكان جاف."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vita_lang');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('vita_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    const langData = translations[language] || translations.fr;
    return (langData as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
