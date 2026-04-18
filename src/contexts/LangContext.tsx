import React, { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "mm";

const translations = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Experience", contact: "Contact", resume: "Resume" },
    hero: {
      greeting: "Hi, my name is",
      name: "Kaung Pyae Thein Tun.",
      tagline: "I build things for the web.",
      description: "I'm a full-stack developer specializing in building exceptional digital experiences. Currently focused on building accessible, human-centered products with modern technologies.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
    },
    about: {
      title: "About Me",
      frontend: "Frontend",
      frontendDesc: "HTML5, CSS3, bootstrap5, Tailwind, React",
      backend: "Backend",
      backendDesc: "PHP, Laravel, ASP.NET, REST/GraphQL",
      database: "Database",
      databaseDesc: "MySQL, MSSQL, Redis",
      p1: "Hello! I'm a passionate full-stack developer with 2+ years of experience crafting digital solutions. I enjoy turning complex problems into simple, beautiful, and intuitive applications.",
      p2: "My journey in web development started back in college when I decided to build a custom CMS — turns out hacking together a website taught me a lot about HTML & CSS. Since then, I've had the privilege of working across startups and established companies.",
    },
    skills: { title: "Skills & Technologies" },
    projects: { title: "Featured Projects" },
    experience: { title: "Experience" },
    contact: {
      subtitle: "What's Next?",
      title: "Get In Touch",
      description: "I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — drop me a message!",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "Your message...",
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successDesc: "Thanks for reaching out. I'll get back to you as soon as possible.",
      sendAnother: "Send another message",
      errorRequired: "Please fill in all fields.",
      errorEmail: "Please enter a valid email address.",
      errorLength: "One or more fields exceed the maximum length.",
      errorGeneric: "Something went wrong. Please try again later.",
    },
    footer: { builtWith: "Built with React & Tailwind CSS" },
  },
  mm: {
    nav: { about: "အကြောင်း", skills: "ကျွမ်းကျင်မှု", projects: "ပရောဂျက်", experience: "အတွေ့အကြုံ", contact: "ဆက်သွယ်ရန်", resume: "အကျဉ်းချုပ်" },
    hero: {
      greeting: "မင်္ဂလာပါ၊ ကျွန်တော့်နာမည်က",
      name: "ကောင်းပြည့်သိန်းထွန်း။",
      tagline: "ဝဘ်အတွက် အရာတွေကို တည်ဆောက်ပါတယ်။",
      description: "ကျွန်တော်ဟာ ထူးခြားတဲ့ ဒစ်ဂျစ်တယ် အတွေ့အကြုံတွေကို တည်ဆောက်ရာမှာ အထူးပြုတဲ့ full-stack developer တစ်ယောက်ပါ။",
      viewWork: "လက်ရာကြည့်ရန်",
      getInTouch: "ဆက်သွယ်ရန်",
    },
    about: {
      title: "ကျွန်တော့်အကြောင်း",
      frontend: "Frontend",
      frontendDesc: "React, TypeScript, Tailwind",
      backend: "Backend",
      backendDesc: "PHP, Laravel, ASP.NET, REST/GraphQL",
      database: "Database",
      databaseDesc: "MySQL, MSSQL, Redis",
      p1: "မင်္ဂလာပါ! ကျွန်တော်ဟာ ၅ နှစ်ကျော် အတွေ့အကြုံရှိတဲ့ စိတ်အားထက်သန်တဲ့ full-stack developer တစ်ယောက်ပါ။",
      p2: "ကျွန်တော့်ရဲ့ ဝဘ် ဖွံ့ဖြိုးရေး ခရီးစဉ်ဟာ တက္ကသိုလ်မှာ စတင်ခဲ့ပါတယ်။",
    },
    skills: { title: "ကျွမ်းကျင်မှုများ" },
    projects: { title: "ထင်ရှားသော ပရောဂျက်များ" },
    experience: { title: "အတွေ့အကြုံ" },
    contact: {
      subtitle: "နောက်ထပ်ဘာလဲ?",
      title: "ဆက်သွယ်ရန်",
      description: "ကျွန်တော် အခွင့်အလမ်းသစ်တွေအတွက် အဆင်သင့်ပါ။ မေးခွန်းရှိရင်၊ ပရောဂျက် အိုင်ဒီယာရှိရင် သို့မဟုတ် နှုတ်ဆက်ချင်ရင် — စာပို့လိုက်ပါ!",
      name: "အမည်",
      email: "အီးမေးလ်",
      message: "မက်ဆေ့ခ်ျ",
      namePlaceholder: "သင့်အမည်",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "သင့်မက်ဆေ့ခ်ျ...",
      send: "ပို့ရန်",
      sending: "ပို့နေသည်...",
      successTitle: "ပို့ပြီးပါပြီ!",
      successDesc: "ဆက်သွယ်မှုအတွက် ကျေးဇူးတင်ပါတယ်။ တတ်နိုင်သမျှ အမြန်ဆုံး ပြန်လည်ဆက်သွယ်ပါမည်။",
      sendAnother: "နောက်ထပ် မက်ဆေ့ခ်ျ ပို့ရန်",
      errorRequired: "အကွက်အားလုံး ဖြည့်ပါ။",
      errorEmail: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပါ။",
      errorLength: "အကွက်တစ်ခု သို့မဟုတ် တစ်ခုထက်ပိုသော အကွက်များ အရှည်ဆုံး ကျော်လွန်နေပါသည်။",
      errorGeneric: "တစ်ခုခု မှားသွားပါတယ်။ နောက်မှ ပြန်ကြိုးစားပါ။",
    },
    footer: { builtWith: "React နှင့် Tailwind CSS ဖြင့် တည်ဆောက်ထားသည်" },
  },
};

type Translations = typeof translations.en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};
