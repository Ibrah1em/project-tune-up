import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, Users, Globe, Award, Rocket, Layers, Briefcase, BookOpen,
  Facebook, Linkedin, Instagram,
  Target, Gem, Wrench, UserCheck,
  GraduationCap, Clock, FolderKanban, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import presenterImg from "@/assets/presenter.png";
import eggImg from "@/assets/egg-lightbulb.png";
import personLaptopImg from "@/assets/person-laptop.png";
import eng1 from "@/assets/engineer1.png";
import eng2 from "@/assets/engineer2.png";
import eng3 from "@/assets/engineer3.png";

/* ───── Hero ───── */
const Hero = () => (
  <section className="py-28 pt-36 grid-bg overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-right">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-foreground leading-tight mb-6">
            <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">Vector</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2 font-semibold">حين تجتمع احترافية البرمجة مع شغف التعليم</p>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            نحن في منصة المدرسة مجموعة من المحترفين جمعنا شغف التعليم وخبرة تقنية عالمية، حول هدف واحد:
            <span className="text-primary font-semibold"> تخريج مليون مبرمج عربي</span> يتقن البرمجة بكل فروعها ويقود التغيير في خريطة البرمجة عالمياً وعربياً.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            مشاركتنا في قرارات التوظيف لمئات المبرمجين خلال عملنا في شركات كبرى مثل Amazon وGoogle وMeta أكسبتنا معرفة بنقاط قوة وضعف المبرمجين واحتياجات السوق. كما يجمعنا حب التدريب ونقل الخبرة — تلك الخبرات التي اكتسبها فريقنا من خلال التدريس الأكاديمي والتقني.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -60, rotateY: -20 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.9 }} className="flex-1 flex justify-center" style={{ perspective: "1000px" }}>
          <img src={presenterImg} alt="مدرب يشرح" className="max-h-[400px] object-contain drop-shadow-2xl" loading="lazy" width={640} height={512} />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ───── Our Values ───── */
const values = [
  { icon: <Globe className="h-7 w-7" />, title: "البرمجة للجميع", desc: "البرمجة مجالنا، وهدفنا جعلها متاحة لكل من يسعى لإتقانها وممارستها." },
  { icon: <Users className="h-7 w-7" />, title: "دورنا", desc: "دعمك وتعليمك وتوجيهك ومتابعتك رسالتنا التي نعتز بها." },
  { icon: <BookOpen className="h-7 w-7" />, title: "لغتنا", desc: "تعليم البرمجة بالعربية على مستوى عالمي مهمتنا المميزة." },
  { icon: <Award className="h-7 w-7" />, title: "القيادة", desc: "قيادتك وتميّزك هو ما نسعى لتحقيقه معك ولأجلك!" },
  { icon: <Layers className="h-7 w-7" />, title: "التكامل", desc: "دمج الرؤية بالواقع رسالتنا حتى تتعلم وتجني ثمار التعلم في واقعك." },
  { icon: <Briefcase className="h-7 w-7" />, title: "مهارات سوق العمل", desc: "مهارات سوق العمل العالمي وتطبيقات البرمجة المختلفة متوفرة ومتجددة." },
  { icon: <Rocket className="h-7 w-7" />, title: "سهولة الشرح", desc: "سهولة الشرح وسلامته لتأسيس المعرفة وتطبيقها أولويتنا." },
];

const ValuesSection = () => (
  <section className="py-28 bg-surface-low overflow-hidden">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground text-center mb-4">
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">قيمنا</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          نحن في المدرسة نعيش بمجموعة من القيم الجوهرية المصممة لتضعنا على أفضل مسار لتحقيق رسالتنا في تعريب مهارات البرمجة للجميع.
        </p>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, rotateX: 40, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 80, damping: 15 }}
            viewport={{ once: true }}
            whileHover={{ y: -14, rotateY: 8, scale: 1.06, boxShadow: "0 25px 50px -12px rgba(0, 212, 255, 0.25)" }}
            className="bg-card rounded-2xl border border-border p-10 text-right group"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            <div className="h-18 w-18 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-7 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
              {v.icon}
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-4">{v.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───── Engineers Grid ───── */
const allEngineers = [
  { name: "م. أحمد سعيد", title: "مهندس برمجيات أول", img: eng1, fb: "#", li: "#", ig: "#" },
  { name: "م. ليلى عمر", title: "مهندسة شبكات", img: eng2, fb: "#", li: "#", ig: "#" },
  { name: "م. خالد يوسف", title: "مهندس اتصالات", img: eng3, fb: "#", li: "#", ig: "#" },
  { name: "م. منى حسين", title: "مطورة ويب", img: eng2, fb: "#", li: "#", ig: "#" },
  { name: "م. عمر فاروق", title: "مهندس DevOps", img: eng1, fb: "#", li: "#", ig: "#" },
  { name: "م. دينا أشرف", title: "مهندسة بيانات", img: eng2, fb: "#", li: "#", ig: "#" },
];

const EngineersGrid = () => (
  <section className="py-28 overflow-hidden">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display font-bold text-4xl text-foreground text-center mb-16">فريق المدربين</h2>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {allEngineers.map((eng, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, type: "spring", stiffness: 90 }}
            viewport={{ once: true }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="bg-card rounded-2xl border border-border overflow-hidden group"
            style={{ perspective: "800px" }}
          >
            <div className="relative overflow-hidden h-64">
              <img src={eng.img} alt={eng.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-6">
                <a href={eng.fb} className="h-10 w-10 rounded-full bg-card/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href={eng.li} className="h-10 w-10 rounded-full bg-card/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href={eng.ig} className="h-10 w-10 rounded-full bg-card/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>
            <div className="p-7 text-center">
              <h3 className="font-display font-bold text-xl text-foreground">{eng.name}</h3>
              <p className="text-base text-muted-foreground mt-2">{eng.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───── Timeline ───── */
const timelineItems = [
  { side: "right" as const, title: "البداية", text: "البرمجة للجميع — البرمجة مجالنا، وهدفنا جعلها متاحة لكل من يسعى لإتقانها وممارستها." },
  { side: "left" as const, title: "الواقع", text: "منصتنا بدأت تتلمس طريقها في واقع الساعين لتعلم البرمجة بنسختها التجريبية." },
  { side: "right" as const, title: "المجتمع", text: "بعد الدعم الصادق من مجتمع المدرسة من طلاب ومتطوعين ومحبين وداعمين، خرجت المنصة بثوبها الجديد كخطوة جادة لتلبية تطلعاتكم." },
  { side: "left" as const, title: "التطوير", text: "فصول قصة المدرسة مستمرة في التطور حتى نحقق رؤيتنا التي تنبثق منها المزيد من الأفكار والإنتاجات لدعم واقع المبرمج العربي." },
];

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
  const barHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-28 bg-surface-low grid-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-4xl text-foreground text-center mb-20">
            <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">Timeline</span>
          </h2>
        </ScrollReveal>
        <div className="relative max-w-4xl mx-auto">
          {/* Bar */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full">
            <motion.div style={{ height: barHeight }} className="w-full bg-gradient-to-b from-primary to-secondary rounded-full" />
          </div>
          <div className="space-y-20">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === "right" ? 80 : -80, rotateY: item.side === "right" ? 15 : -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex ${item.side === "left" ? "justify-start" : "justify-end"} relative`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 h-5 w-5 rounded-full bg-primary border-4 border-background z-10" />
                <div className={`w-5/12 bg-card rounded-2xl border border-border p-10 ${item.side === "right" ? "text-right" : "text-left"}`}>
                  <h3 className="font-display font-bold text-2xl text-primary mb-3">{item.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───── We Feel You ───── */
const feelCards = [
  { icon: <Target className="h-6 w-6" />, title: "التأسيس", desc: "نُرسّخ قاعدة معرفية وتطبيقية صلبة يمكن البناء عليها وتطويرها بسهولة." },
  { icon: <Gem className="h-6 w-6" />, title: "الاحترافية", desc: "نقدم حزمة متكاملة من المواد التعليمية والإرشاد الشخصي لتطوير مهارات الطالب نحو الاحترافية." },
  { icon: <Wrench className="h-6 w-6" />, title: "التطبيق", desc: "نقدم مشاريع تطبيقية تغطي احتياجات السوق العالمي وأغلب التفاصيل التقنية." },
  { icon: <UserCheck className="h-6 w-6" />, title: "الطالب أولاً", desc: "نركز على رفع القيمة المقدمة لمجتمع طلاب المدرسة وتحسين تجربة التعلم." },
];

const WeFeelYou = () => (
  <section className="py-28 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-right">
          <ScrollReveal direction="right">
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">نحس فيك</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              نعرف إنك تخاف تضيع وقتك وفلوسك على مصادر مختلفة ومعلومات ناقصة، لذلك اعتمدنا مجموعة من الأطر الحاكمة لمنصة المدرسة.
            </p>
          </ScrollReveal>
          <img src={personLaptopImg} alt="" className="max-h-[250px] object-contain mx-auto md:mx-0" loading="lazy" width={512} height={512} />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8">
          {feelCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.06, boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.3)" }}
              className="bg-card rounded-2xl border border-border p-10 text-right"
              style={{ perspective: "600px" }}
            >
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">{c.icon}</div>
              <h3 className="font-display font-bold text-xl text-foreground mb-4">{c.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───── What Distinguishes ───── */
const DistinguishSection = () => (
  <section className="py-28 bg-surface-low grid-bg overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-right">
          <ScrollReveal direction="right">
            <h2 className="font-display font-bold text-3xl text-foreground mb-6">ما يميّز المدرسة عن منافسيها؟</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              لا وجه للمقارنة بين ما تقدمه المدرسة وما تقدمه أي منصة أخرى، لأن المدرسة كما ذكرنا سابقاً عالم متكامل من التجربة التعليمية. بينما يعتمد الآخرون على نسخ الدورات الأجنبية وسردها على المتلقي بأسعار باهظة دون تفاعل أو متابعة أو إرشاد أو تطبيق ثم تقييم وغيرها من المميزات التي تقدمها المدرسة — التي توفر لك كل هذا وأكثر، بالإضافة لشهادة معتمدة موثقة برقم تتبع خاص بكل متعلم.
              <br /><br />
              والأهم: <span className="text-primary font-bold">تقدر تتعلم بالعربي!</span>
            </p>
          </ScrollReveal>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
          style={{ perspective: "1000px" }}
        >
          <img src={eggImg} alt="" className="max-h-[380px] object-contain drop-shadow-2xl" loading="lazy" width={640} height={512} />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ───── Stats ───── */
const pageStats = [
  { icon: <GraduationCap className="h-8 w-8" />, value: "1,250+", label: "طالب" },
  { icon: <Clock className="h-8 w-8" />, value: "15,000+", label: "ساعة دراسية" },
  { icon: <FolderKanban className="h-8 w-8" />, value: "850+", label: "مشروع" },
];

const StatsSection = () => (
  <section className="py-28">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <p className="text-center font-display font-bold text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          المدرسة بدأت بحلم تسعى لتحقيقه، وستستمر في مسيرة النجاح{" "}
          <span className="text-primary">معك ومن خلالك</span>
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
        {pageStats.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1} direction="scale">
            <motion.div whileHover={{ scale: 1.06 }} className="bg-card rounded-2xl border border-border p-8 text-center">
              <div className="flex justify-center mb-4 text-primary">{s.icon}</div>
              <p className="font-display font-extrabold text-3xl text-foreground mb-2">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ───── Page ───── */
const LearnFromBest = () => (
  <div className="min-h-screen bg-background">
    <Hero />
    <ValuesSection />
    <EngineersGrid />
    <TimelineSection />
    <WeFeelYou />
    <DistinguishSection />
    <StatsSection />
    <Footer />
  </div>
);

export default LearnFromBest;
