import mongoose from "mongoose";
import {
  connectDB,
  Category,
  Tag,
  Author,
  Post,
} from "@workspace/db";

async function main() {
  console.log("Connecting to MongoDB...");
  await connectDB();

  console.log("Clearing existing seed data...");
  await Post.deleteMany({});
  await Tag.deleteMany({});
  await Category.deleteMany({});
  await Author.deleteMany({});

  console.log("Seeding authors...");
  const authors = await Author.insertMany([
    {
      slug: "omar-hassan",
      name: "عمر حسان",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=omar&backgroundColor=0ea5e9",
      bio: "مهندس برمجيات متخصص في TypeScript و Node.js وأدوات المطورين.",
    },
    {
      slug: "sarah-chen",
      name: "سارة تشن",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=sarah&backgroundColor=ec4899",
      bio: "مهندسة تطبيقات جوال تعمل في مجالات Flutter و Android.",
    },
    {
      slug: "jin-park",
      name: "جين بارك",
      avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=jin&backgroundColor=10b981",
      bio: "أخصائي واجهات أمامية مهتم بأداء React وتجربة المطورين.",
    },
  ]);

  const omar = authors.find(a => a.slug === "omar-hassan");
  const sarah = authors.find(a => a.slug === "sarah-chen");
  const jin = authors.find(a => a.slug === "jin-park");

  console.log("Seeding categories...");
  const categories = await Category.insertMany([
    {
      slug: "dev-tools",
      name: "أدوات المطورين",
      description: "أدلة عملية للأدوات التي يستخدمها المطورون يومياً: مديري الحزم، أنظمة البناء، Docker، وأدوات CLI.",
      color: "#ff6b35",
    },
    {
      slug: "content",
      name: "المحتوى",
      description: "مقالات رأي، نصائح مهنية، وقصص من مطورين حول كيفية ولماذا يبنون ما يبنونه.",
      color: "#a78bfa",
    },
    {
      slug: "programming",
      name: "البرمجة",
      description: "حلول عملية لأخطاء البرمجة الحقيقية في React، Node.js، Flutter، JavaScript، TypeScript، Python، والمزيد.",
      color: "#22c55e",
    },
  ]);

  const devTools = categories.find(c => c.slug === "dev-tools");
  const programming = categories.find(c => c.slug === "programming");

  console.log("Seeding tags...");
  const tags = await Tag.insertMany([
    { slug: "errors", name: "أخطاء" },
    { slug: "performance", name: "الأداء" },
    { slug: "debugging", name: "تصحيح الأخطاء" },
    { slug: "build-tools", name: "أدوات البناء" },
    { slug: "state", name: "الحالة" },
    { slug: "async", name: "غير متزامن" },
    { slug: "typescript", name: "TypeScript" },
    { slug: "gradle", name: "Gradle" },
    { slug: "null-safety", name: "سلامة القيم الفارغة" },
    { slug: "hooks", name: "Hooks" },
    { slug: "npm", name: "npm" },
    { slug: "docker", name: "Docker" },
  ]);

  const tagMap = new Map(tags.map(t => [t.slug, t._id]));

  console.log("Seeding posts...");
  await Post.insertMany([
    {
      slug: "why-choose-flutter-2026",
      title: "لماذا يجب أن تختار Flutter في عام 2026؟",
      excerpt: "اكتشف الأسباب التي تجعل Flutter الخيار الأمثل لتطوير تطبيقات الجوال وعبر المنصات في عام 2026، من الأداء العالي إلى سرعة التطوير.",
      content: "# لماذا يجب أن تختار Flutter في عام 2026؟\n\nيعتبر Flutter اليوم أحد أقوى الأطر البرمجية لتطوير التطبيقات...",
      coverImageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 7,
      viewsCount: 15400,
      featured: true,
      publishedAt: new Date("2026-04-20T11:00:00Z"),
      authorId: sarah!._id,
      categoryId: programming!._id,
      tags: [tagMap.get("null-safety"), tagMap.get("performance")],
    },
    {
      slug: "programming-advice-beginners-2026",
      title: "نصائح ذهبية للمبرمجين المبتدئين في عام 2026",
      excerpt: "إذا كنت تبدأ رحلتك في عالم البرمجة الآن، فهذه النصائح ستساعدك على تجنب الأخطاء الشائعة والوصول إلى أهدافك بشكل أسرع.",
      content: "# نصائح ذهبية للمبرمجين المبتدئين\n\n1. ركز على المفاهيم الأساسية قبل الأدوات...\n2. ابنِ مشاريع حقيقية...",
      coverImageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 10,
      viewsCount: 22100,
      featured: true,
      publishedAt: new Date("2026-04-22T09:00:00Z"),
      authorId: omar!._id,
      categoryId: categories.find(c => c.slug === "content")!._id,
      tags: [tagMap.get("debugging")],
    },
    {
      slug: "find-engineering-jobs-2026",
      title: "كيف تجد وظيفة برمجية مرموقة في عام 2026؟",
      excerpt: "سوق العمل يتغير باستمرار. تعرف على أفضل الطرق للبحث عن وظائف الهندسة البرمجية في عام 2026، من بناء الشبكات إلى إتقان المقابلات التقنية.",
      content: "# كيف تجد وظيفة برمجية مرموقة في عام 2026؟\n\nلم يعد البحث عن وظيفة يقتصر على إرسال السيرة الذاتية فحسب...",
      coverImageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 12,
      viewsCount: 31000,
      featured: true,
      publishedAt: new Date("2026-04-24T08:30:00Z"),
      authorId: omar!._id,
      categoryId: categories.find(c => c.slug === "content")!._id,
      tags: [tagMap.get("performance")],
    },
    {
      slug: "software-learning-roadmap-2026",
      title: "خارطة طريق تعلم البرمجة من الصفر حتى الاحتراف",
      excerpt: "دليل شامل وشامل يأخذك من أول سطر برمجيات إلى أن تصبح مهندساً متمكناً، مع التركيز على التقنيات الأكثر طلباً في 2026.",
      content: "# خارطة طريق تعلم البرمجة 2026\n\nالمرحلة الأولى: الأساسيات والمنطق...\nالمرحلة الثانية: التخصص...",
      coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 15,
      viewsCount: 45000,
      featured: true,
      publishedAt: new Date("2026-04-25T10:00:00Z"),
      authorId: jin!._id,
      categoryId: programming!._id,
      tags: [tagMap.get("typescript"), tagMap.get("build-tools")],
    },
    {
      slug: "career-growth-for-engineers",
      title: "استراتيجيات النمو المهني للمهندسين في العصر الرقمي",
      excerpt: "كيف تنتقل من مطور جونيور إلى مطور سينيور أو قائد تقني؟ اكتشف المهارات الناعمة والتقنية التي تحتاجها للنمو في مسيرتك المهنية.",
      content: "# استراتيجيات النمو المهني\n\nالتعلم المستمر هو المفتاح في عالم التكنولوجيا سريع التغير...",
      coverImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 9,
      viewsCount: 18900,
      featured: false,
      publishedAt: new Date("2026-04-25T14:00:00Z"),
      authorId: jin!._id,
      categoryId: categories.find(c => c.slug === "content")!._id,
      tags: [tagMap.get("performance")],
    },
    {
      slug: "fix-flutter-null-safety-errors",
      title: "كيفية إصلاح أخطاء Null Safety في Flutter (خطوة بخطوة)",
      excerpt: "سلامة القيم الفارغة في Flutter قد تكون محيرة في البداية. إليك دليل عملي لإصلاح الأخطاء الأكثر شيوعاً.",
      content: "# كيفية إصلاح أخطاء Null Safety في Flutter...",
      coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 6,
      viewsCount: 12480,
      featured: true,
      publishedAt: new Date("2026-04-12T10:00:00Z"),
      authorId: sarah!._id,
      categoryId: programming!._id,
      tags: [tagMap.get("errors"), tagMap.get("null-safety"), tagMap.get("debugging")],
    },
    {
      slug: "android-gradle-build-failed-solutions",
      title: "فشل بناء Android Gradle: 7 حلول حقيقية فعالة",
      excerpt: "من تعارضات التبعيات إلى عدم تطابق JDK، إليك سبعة إخفاقات في بناء Gradle تحدث فعلياً في المشاريع الحقيقية.",
      content: "# فشل بناء Android Gradle: 7 حلول حقيقية...",
      coverImageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 8,
      viewsCount: 9870,
      featured: true,
      publishedAt: new Date("2026-04-08T14:30:00Z"),
      authorId: sarah!._id,
      categoryId: devTools!._id,
      tags: [tagMap.get("errors"), tagMap.get("gradle"), tagMap.get("build-tools")],
    },
    {
      slug: "react-state-not-updating-fix",
      title: "لماذا لا يتم تحديث حالة React (وكيفية إصلاح ذلك)",
      excerpt: "الإغلاقات القديمة، التحديثات المجمعة، وتغيير الحالة مباشرة هي الأسباب الثلاثة التي تجعل حالة React تبدو مجمدة. إليك كيفية اكتشاف كل منها.",
      content: "# لماذا لا يتم تحديث حالة React...",
      coverImageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80&auto=format&fit=crop",
      readingMinutes: 5,
      viewsCount: 18230,
      featured: true,
      publishedAt: new Date("2026-04-15T09:00:00Z"),
      authorId: jin!._id,
      categoryId: programming!._id,
      tags: [tagMap.get("state"), tagMap.get("hooks"), tagMap.get("debugging")],
    },
  ]);

  console.log("Seeding completed successfully.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
