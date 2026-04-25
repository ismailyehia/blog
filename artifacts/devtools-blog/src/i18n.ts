import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  ar: {
    translation: {
      "nav": {
        "tools": "الأدوات",
        "blog": "المدونة",
        "categories": "الأقسام",
        "about": "عن الموقع",
        "contact": "اتصل بنا",
        "home": "الرئيسية"
      },
      "common": {
        "search": "بحث...",
        "search_docs": "البحث في التوثيق...",
        "logo": "بلو رايفن",
        "toggle_theme": "تبديل المظهر",
        "loading": "جاري التحميل...",
        "error": "حدث خطأ ما",
        "view_all": "عرض الكل",
        "min": "دقيقة"
      },
      "home": {
        "hero_badge": "تم تهيئة بيئة المطور",
        "hero_title": "مجموعة أدوات Blue Raven النهائية",
        "hero_subtitle": "أدوات برمجية سريعة وموثوقة وتعمل في المتصفح بالكامل. بنيت بواسطة المطورين، للمطورين.",
        "explore_tools": "تصفح الأدوات",
        "read_blog": "اقرأ المدونة",
        "featured_posts": "حلول برمجية مختارة",
        "latest_articles": "أحدث المقالات",
        "popular_posts": "الأكثر قراءة",
        "explore_topics": "استكشف الأقسام",
        "instant_tools": "أدوات برمجية فورية",
        "instant_tools_sub": "سريعة، مجانية، وتعمل في المتصفح مباشرة.",
        "stats": {
          "articles": "المقالات",
          "tools": "أدوات مجانية",
          "topics": "الأقسام",
          "reads": "إجمالي القراءات"
        }
      },
      "footer": {
        "description": "أدوات Blue Raven مجانية للمطورين تعمل في المتصفح فقط، بالإضافة إلى مقالات تقنية وحلول برمجية.",
        "rights": "جميع الحقوق محفوظة.",
        "resources": "المصادر",
        "newsletter": "النشرة البريدية",
        "newsletter_sub": "احصل على أحدث الأدوات والمقالات التقنية في بريدك الوارد. لا رسائل مزعجة أبدًا.",
        "subscribe": "اشترك",
        "subscribing": "جاري الاشتراك...",
        "privacy": "سياسة الخصوصية",
        "terms": "شروط الخدمة",
        "success_title": "تم الاشتراك!",
        "success_desc": "لقد انضممت بنجاح إلى نشرتنا البريدية.",
        "error_title": "فشل الاشتراك",
        "error_desc": "يرجى المحاولة مرة أخرى لاحقًا."
      },
      "contact": {
        "title": "اتصل بنا",
        "subtitle": "هل وجدت خللاً؟ تريد أداة جديدة؟ لديك فكرة لمقال؟ Blue Raven يستمع إليك.",
        "header": "تواصل معنا",
        "name": "الاسم",
        "email": "البريد الإلكتروني",
        "subject": "الموضوع",
        "message": "الرسالة",
        "send": "إرسال الرسالة",
        "sending": "جاري الإرسال...",
        "success_title": "شكراً لتواصلك معنا",
        "success_desc": "لقد استلمنا رسالتك وسنرد عليك قريباً.",
        "send_another": "إرسال رسالة أخرى"
      },
      "blog": {
        "title": "المدونة التقنية",
        "subtitle": "حلول حقيقية للأخطاء البرمجية من Blue Raven. نصوص الخطأ، الأسباب الجذرية، والحلول الفعالة.",
        "search_placeholder": "ابحث في المقالات...",
        "no_posts": "لم يتم العثور على مقالات.",
        "prev": "السابق",
        "next": "التالي",
        "page_info": "الصفحة {{page}} من {{total}}",
        "all_categories": "كل الأقسام",
        "tags": "الوسوم",
        "tagged_with": "مقالات موسومة بـ \"{{tag}}\""
      },
      "about": {
        "title": "عن الموقع",
        "subtitle": "Blue Raven هو مجموعة أدوات عملية ومدونة تقنية بنيت بواسطة مطورين، للمطورين.",
        "header": "عن Blue Raven",
        "intro": "نحن في Blue Raven نهتم بالتفاصيل الصغيرة - ملف JSON الذي لا يمكنك تحليله، توكن JWT الذي لا يمكنك قراءته، خطأ البناء الذي لم يتمكن Stack Overflow من حله.",
        "p1_title": "السرعة أولاً",
        "p1_body": "كل أداة تعمل بالكامل في متصفحك. لا توجد رحلات ذهاب وإياب للخادم، ولا توجد مؤشرات تحميل تخفي تأخير الشبكة.",
        "p2_title": "الخصوصية افتراضياً",
        "p2_body": "بياناتك لا تغادر جهازك أبداً. نحن لا نسجل المدخلات، ولا نخزن التوكنات، ولا نتجسس على البيانات.",
        "p3_title": "بني بواسطة مهندسين",
        "p3_body": "المقالات تقدم نص الخطأ الحقيقي، الحل الحقيقي، والمنطق الكامن وراءه. بدون حشو.",
        "p4_title": "مجاني للأبد",
        "p4_body": "الأدوات والمقالات ممولة بالإعلانات فقط. لا توجد جدران دفع، ولا فئات مدفوعة، ولا محاولات بيع إضافية.",
        "why_title": "لماذا بنينا هذا؟",
        "why_body": "لقد سئمنا من التنقل بين خمسة مواقع مختلفة فقط لتنسيق ملف JSON، أو فك تشفير JWT، أو تذكر أي تعبير نمطي (regex) يطابق UUID. لذلك بنينا مكاناً واحداً يفعل كل ذلك بشكل جيد، وأضفنا مقالات حول الأخطاء التي كنا نواجهها باستمرار في الإنتاج.",
        "how_title": "كيف يعمل؟",
        "how_body": "الأدوات عبارة عن React خالص من جانب العميل. المدونة مصيرة بشكل ثابت للسرعة وتحسين محركات البحث. البحث والتصفية يتمان عبر Node API بسيط. هذا هو كل ما في الأمر.",
        "contact_title": "تواصل معنا",
        "contact_body": "هل لديك أداة تتمنى لو كانت موجودة؟ خطأ لا يمكنك التخلص منه؟ اترك لنا رسالة في صفحة الاتصال وسنلقي نظرة."
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "tools": "Tools",
        "blog": "Blog",
        "categories": "Categories",
        "about": "About",
        "contact": "Contact",
        "home": "Home"
      },
      "common": {
        "search": "Search...",
        "search_docs": "Search documentation...",
        "logo": "Blue Raven",
        "toggle_theme": "Toggle theme",
        "loading": "Loading...",
        "error": "Something went wrong",
        "view_all": "View All",
        "min": "min"
      },
      "home": {
        "hero_badge": "Developer workspace initialized",
        "hero_title": "The Ultimate Blue Raven Toolset",
        "hero_subtitle": "Free, fast, browser-only utilities for modern developers. Built by developers, for developers.",
        "explore_tools": "Explore Tools",
        "read_blog": "Read Blog",
        "featured_posts": "Featured Solutions",
        "latest_articles": "Latest Articles",
        "popular_posts": "Popular Right Now",
        "explore_topics": "Explore Topics",
        "instant_tools": "Instant Dev Tools",
        "instant_tools_sub": "Client-side, fast, and always free.",
        "stats": {
          "articles": "Articles",
          "tools": "Free Tools",
          "topics": "Topics",
          "reads": "Total Reads"
        }
      },
      "footer": {
        "description": "Free browser-only tools for developers from Blue Raven, combined with technical blog posts and programming fixes.",
        "rights": "All rights reserved.",
        "resources": "Resources",
        "newsletter": "Newsletter",
        "newsletter_sub": "Get the latest tools and tech articles delivered to your inbox. No spam, ever.",
        "subscribe": "Subscribe",
        "subscribing": "Subscribing...",
        "privacy": "Privacy Policy",
        "terms": "Terms of Service",
        "success_title": "Subscribed!",
        "success_desc": "You've successfully joined our newsletter.",
        "error_title": "Subscription failed",
        "error_desc": "Please try again later."
      },
      "contact": {
        "title": "Contact",
        "subtitle": "Found a bug? Want a new tool? Have an article idea? We're listening.",
        "header": "Get in touch",
        "name": "Name",
        "email": "Email",
        "subject": "Subject",
        "message": "Message",
        "send": "Send message",
        "sending": "Sending...",
        "success_title": "Thanks for reaching out",
        "success_desc": "We've received your message.",
        "send_another": "Send another message"
      },
      "blog": {
        "title": "Tech Blog",
        "subtitle": "Real fixes for real errors. Stack traces, root causes, and the patches that work.",
        "search_placeholder": "Search articles...",
        "no_posts": "No posts found.",
        "prev": "Previous",
        "next": "Next",
        "page_info": "Page {{page}} of {{total}}",
        "all_categories": "All Categories",
        "tags": "Tags",
        "tagged_with": "Posts tagged \"{{tag}}\""
      },
      "about": {
        "title": "About",
        "subtitle": "Blue Raven is a no-fluff toolbelt and tech blog built by working developers, for working developers.",
        "header": "About Blue Raven",
        "intro": "We at Blue Raven obsess over the small stuff — the JSON you can't quite parse, the JWT you can't read, the build error Stack Overflow can't solve.",
        "p1_title": "Fast first",
        "p1_body": "Every tool runs entirely in your browser. No server round-trips, no spinners hiding network latency.",
        "p2_title": "Private by default",
        "p2_body": "Your data never leaves your machine. We don't log inputs, store tokens, or sniff payloads.",
        "p3_title": "Built by engineers",
        "p3_body": "Articles ship the actual stack trace, the actual fix, and the reasoning behind it. No filler.",
        "p4_title": "Free, forever",
        "p4_body": "Tools and articles are funded by ads only. No paywalls, no premium tiers, no upsells.",
        "why_title": "Why we built this",
        "why_body": "We were tired of bouncing between five different sites just to format some JSON, decode a JWT, or remember what regex matches a UUID. So we built one place that does all of it, well, and added articles about the errors we kept hitting in production.",
        "how_title": "How it works",
        "how_body": "The tools are pure client-side React. The blog is statically rendered for speed and SEO. Search and filtering happen on a small Node API. That's the entire stack.",
        "contact_title": "Get in touch",
        "contact_body": "Have a tool you wish existed? An error you can't shake? Drop us a line on the contact page and we'll take a look."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
