import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Users, ClipboardCheck, Gauge,
  BookOpen, Layers, Award, Target, MessageCircle, Star, Baby, Bell,
  Lock, ChevronDown, Plus, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

import courseCyber from "@/assets/course-cyber.png";
import coursePython from "@/assets/course-python.png";
import courseReact from "@/assets/course-react.png";
import courseMobile from "@/assets/course-mobile.png";
import courseDatabase from "@/assets/course-database.png";
import courseKids from "@/assets/course-kids.png";

const courseData: Record<string, { title: string; img: string; students: number; tests: number; level: string; lessons: number; sections: number }> = {
  "cybersecurity": { title: "أساسيات الأمن السيبراني", img: courseCyber, students: 1240, tests: 8, level: "متوسط", lessons: 98, sections: 12 },
  "python-basics": { title: "أساسيات Python", img: coursePython, students: 2100, tests: 12, level: "مبتدئ", lessons: 75, sections: 10 },
  "react-web": { title: "تطوير الويب بـ React", img: courseReact, students: 1850, tests: 10, level: "متوسط", lessons: 110, sections: 14 },
  "mobile-dev": { title: "تطبيقات الموبايل", img: courseMobile, students: 980, tests: 6, level: "متقدم", lessons: 88, sections: 11 },
  "databases": { title: "قواعد البيانات SQL", img: courseDatabase, students: 1500, tests: 7, level: "مبتدئ", lessons: 60, sections: 8 },
  "kids-programming": { title: "المبرمج الصغير", img: courseKids, students: 3200, tests: 5, level: "مبتدئ", lessons: 45, sections: 6 },
};

const courseInfoItems = [
  { icon: <BookOpen className="h-5 w-5" />, label: "درس" },
  { icon: <Layers className="h-5 w-5" />, label: "أقسام" },
  { icon: <Award className="h-5 w-5" />, label: "شهادة موثقة" },
  { icon: <Target className="h-5 w-5" />, label: "قياس مستوى التقدم والإنجاز عبر الدورة" },
  { icon: <MessageCircle className="h-5 w-5" />, label: "إجابة من مشرفي الطلاب على كل الأسئلة" },
  { icon: <Star className="h-5 w-5" />, label: "فعاليات حصرية" },
  { icon: <Baby className="h-5 w-5" />, label: "شارات تميز للطلبة المتقدمين" },
  { icon: <Bell className="h-5 w-5" />, label: "إشعارات تذكير وتحفيز لإنهاء الدورة" },
];

const curriculumSections = [
  { title: "المقدمة", lessons: ["مرحباً بك في الدورة", "ما ستتعلمه", "متطلبات الدورة"], unlocked: true },
  { title: "مواد الدورة", lessons: ["الدرس الأول", "الدرس الثاني", "الدرس الثالث", "اختبار القسم"], unlocked: false },
  { title: "كراسة التعديل السلوكي", lessons: ["التمرين العملي 1", "التمرين العملي 2"], unlocked: false },
  { title: "الدماغ والسلوك", lessons: ["المحاضرة 1", "المحاضرة 2", "المحاضرة 3", "اختبار"], unlocked: false },
];

const faqItems = [
  { q: "هل يوجد دورات لتعليم البرمجة من الصفر للمبتدئين؟", a: "نعم! لدينا دورات شاملة تبدأ معك من الصفر تماماً وتأخذك خطوة بخطوة حتى تصبح مبرمجاً محترفاً." },
  { q: "هل يمكنني التعلم بالعربية بالكامل؟", a: "بالطبع! جميع الدورات مشروحة بالكامل باللغة العربية مع مدربين محترفين." },
  { q: "هل الشهادة معتمدة؟", a: "نعم، تحصل على شهادة موثقة برقم تتبع فريد يمكن التحقق منه أونلاين." },
  { q: "هل هناك متابعة بعد الانتهاء من الدورة؟", a: "نعم! نقدم متابعة شخصية ودعم مستمر حتى بعد إتمام الدورة." },
];

const CourseDescription = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-right space-y-6">
    <p className="text-lg text-muted-foreground leading-relaxed">
      لم يعد دور المبرمج يقتصر على كتابة الكود فقط، بل أصبح مسؤولاً أيضاً عن حماية البيانات والمستخدمين والتطبيقات من الهجمات والاختراقات. ومع ازدياد الاعتماد على التطبيقات والمواقع والأنظمة الرقمية، فإن أي موقع أو تطبيق غير آمن أو مجرد ثغرة أمنية صغيرة قد تؤدي إلى خسائر كبيرة في البيانات وتُكلف الشركات خسائر مالية وسمعة يصعب تعويضها.
    </p>
    <p className="text-lg text-muted-foreground leading-relaxed">
      ستتعلّم في دورة أساسيات الأمن السيبراني كيف تفكر بعقلية أمنية أثناء تطوير البرمجيات، وستفهم أهم مفاهيم الأمن السيبراني (Cybersecurity)، وأساليب التشفير والمصادقة، وكيفية اكتشاف الثغرات الشائعة في التطبيقات وحمايتها.
    </p>

    <h3 className="font-display font-bold text-2xl text-foreground mt-8">ماذا ستتعلم في دورة أساسيات الأمن السيبراني؟</h3>
    <ul className="space-y-3 text-lg text-muted-foreground">
      {[
        "المبادئ الأساسية للأمن السيبراني وتأثيرها على تصميم التطبيقات",
        "كيفية حماية وتصنيف البيانات والتعامل مع البيانات الحساسة",
        "أساسيات الشبكات وكيف يعمل الإنترنت وبروتوكولات HTTP وHTTPS",
        "نموذج طبقات الشبكة ISO (OSI Model) وأهمية المنافذ والبروتوكولات",
        "أساسيات التشفير: التشفير المتماثل وغير المتماثل والتجزئة والتوقيع الرقمي",
        "الفرق بين المصادقة والتفويض وإدارة الجلسات وتأمين حسابات المستخدمين",
        "أدوات احترافية لاكتشاف الثغرات مثل Burp Suite",
        "ثغرات السيرفر الشائعة: SQL Injection, Broken Authentication, SSRF",
        "ثغرات الواجهة الأمامية: XSS, CSRF, Clickjacking",
        "قائمة OWASP Top 10 وكيفية تجنبها",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h3 className="font-display font-bold text-2xl text-foreground mt-8">لمن هذه الدورة؟</h3>
    <ul className="space-y-3 text-lg text-muted-foreground">
      {[
        "مهندسو البرمجيات الراغبون في أساس قوي لأمان التطبيقات والمواقع",
        "المبرمجون المبتدئون الراغبون في كتابة كود أكثر احترافية وأماناً",
        "العاملون في تطبيقات الويب أو API والراغبون في فهم الثغرات الشائعة",
        "الراغبون في تعلم أساسيات الأمن السيبراني ودخول هذا المجال",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h3 className="font-display font-bold text-2xl text-foreground mt-8">لماذا تشترك في دورة أساسيات الأمن السيبراني؟</h3>
    <ul className="space-y-3 text-lg text-muted-foreground">
      {[
        "فهم عملي لكيفية حماية تطبيقاتك من الثغرات الشائعة",
        "القدرة على اكتشاف الثغرات قبل أن يستغلها المخترقون",
        "أساس قوي يؤهلك للتخصص في الأمن السيبراني لاحقاً",
        "ميزة تنافسية قوية في سوق العمل كمهندس برمجيات واعٍ أمنياً",
        "مدرب خبير في مجاله مع أمثلة عملية حقيقية",
        "وصول مدى الحياة لمحتوى الدورة مع كل التحديثات المستقبلية مجاناً",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <p className="text-xl font-display font-bold text-primary mt-8">
      تميّز في سوق العمل واشترك الآن في الدورة لبناء تطبيقات ومواقع آمنة تماماً.
    </p>
  </motion.div>
);

const CourseCurriculum = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      {curriculumSections.map((section, i) => (
        <div key={i} className="bg-surface-mid rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-right"
          >
            <div className="flex items-center gap-3">
              {section.unlocked ? (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="font-display font-bold text-lg text-foreground">{section.title}</span>
            </div>
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openSection === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {openSection === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-2">
                  {section.lessons.map((lesson, j) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-xl hover:bg-background/50 transition-colors">
                      <div className="flex items-center gap-3">
                        {section.unlocked ? (
                          <Link to={`/course/${courseData ? Object.keys(courseData)[0] : "cybersecurity"}/learn/${j}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                            <Play className="h-4 w-4 text-primary" />
                            <span className="text-base">{lesson}</span>
                          </Link>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-base text-muted-foreground">{lesson}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

const CourseInstructor = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-right">
    <div className="flex items-center gap-6 mb-8">
      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
        <span className="text-primary-foreground font-display font-bold text-3xl">م</span>
      </div>
      <div>
        <h3 className="font-display font-bold text-2xl text-foreground">م. أحمد سعيد</h3>
        <p className="text-lg text-muted-foreground">مهندس برمجيات أول — Google</p>
        <p className="text-base text-primary mt-1">خبرة +11 سنة في تطوير البرمجيات والأمن السيبراني</p>
      </div>
    </div>
    <p className="text-lg text-muted-foreground leading-relaxed">
      مهندس برمجيات أول في شركة Google، متخصص في الأمن السيبراني وتطوير التطبيقات الآمنة. عمل سابقاً في عدة شركات تقنية كبرى وشارك في بناء أنظمة أمنية لملايين المستخدمين. شغوف بتعليم البرمجة بالعربية ونقل خبرته العملية للجيل الجديد من المبرمجين العرب.
    </p>
  </motion.div>
);

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = courseData[id || "cybersecurity"] || courseData["cybersecurity"];
  const [activeTab, setActiveTab] = useState<"description" | "curriculum" | "instructor">("description");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const tabs = [
    { key: "description" as const, label: "وصف الدورة" },
    { key: "curriculum" as const, label: "منهج الدورة" },
    { key: "instructor" as const, label: "عن المعلم" },
  ];

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Right – course info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-right pr-4 md:pr-8"
          >
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-8">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-lg">{course.students.toLocaleString()} طالب</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <span className="text-lg">{course.tests} اختبارات</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-5 w-5 text-primary" />
                <span className="text-lg">مستوى: {course.level}</span>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-12 text-lg h-14 mb-8">
              اشترك الآن
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </motion.div>

          {/* Left – video + info card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 max-w-lg"
          >
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-video group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  playsInline
                  preload="metadata"
                  onEnded={() => setPlaying(false)}
                />
                {!playing && (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                    <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 text-primary-foreground fill-primary-foreground mr-[-2px]" />
                    </div>
                  </div>
                )}
                {playing && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
                    <button onClick={togglePlay} className="h-9 w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
                      <Pause className="h-4 w-4 text-foreground" />
                    </button>
                    <button onClick={toggleMute} className="h-9 w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
                      {muted ? <VolumeX className="h-4 w-4 text-foreground" /> : <Volume2 className="h-4 w-4 text-foreground" />}
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-lg">{course.lessons} درس</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Layers className="h-5 w-5 text-primary" />
                  <span className="text-lg">{course.sections} أقسام</span>
                </div>
                {courseInfoItems.slice(2).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground">
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-base">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs section */}
        <div className="mb-16">
          <div className="flex gap-1 border-b border-border mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-4 font-display font-bold text-lg transition-all relative ${
                  activeTab === tab.key
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" && <CourseDescription key="desc" />}
            {activeTab === "curriculum" && <CourseCurriculum key="curr" />}
            {activeTab === "instructor" && <CourseInstructor key="inst" />}
          </AnimatePresence>
        </div>

        {/* FAQ */}
        <section className="py-16">
          <ScrollReveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground text-center mb-16">
              الأسئلة{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">الشائعة</span>
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-right"
                >
                  <span className="font-display font-bold text-lg md:text-xl text-foreground">{item.q}</span>
                  <motion.div
                    animate={{ rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0 mr-4"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <p className="text-lg text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetail;
