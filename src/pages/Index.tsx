import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Code, Wifi, MessageSquare, ArrowLeft, Play, Pause, Volume2, VolumeX,
  ChevronLeft, ChevronRight, GraduationCap, Users, Clock, FolderKanban, Star,
  Zap, BookOpen, Wrench, Baby, Globe, Lightbulb, Layers, UsersRound,
  UserCheck, Target, Award, CalendarCheck, Plus, Minus, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import ladderImg from "@/assets/ladder-success.png";
import studentsImg from "@/assets/students-laptops.png";
import whySchoolImg from "@/assets/why-school.png";
import goalPersonImg from "@/assets/goal-person.png";
import eng1 from "@/assets/engineer1.png";
import eng2 from "@/assets/engineer2.png";
import eng3 from "@/assets/engineer3.png";

/* ───────── Section 1: Hero – Learn Programming in Arabic ───────── */
const HeroIntro = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section className="relative py-24 sm:py-32 pt-28 sm:pt-36 overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-20 h-20 border border-primary/20 rounded-xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 left-[15%] w-14 h-14 border border-secondary/20 rounded-lg animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-right pr-2 sm:pr-4 md:pr-8"
          >
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 sm:mb-8">
              تعلّم البرمجة{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">بالعربية</span>
            </h1>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              لا تحتاج لإتقان الإنجليزية لتصبح مبرمجاً محترفاً وتتخرج ضمن مشروع جيل المبرمجين العرب.
              كل ما تحتاجه هو الانضمام للمدرسة في رحلة تعلّم تضمن لك الوصول لحيث تطمح وأكثر.
            </p>
            <Link to="/courses">
              <Button size="lg" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-8 sm:px-10 text-base sm:text-lg h-12 sm:h-14">
                ابدأ التعلم
                <ArrowLeft className="h-5 w-5 mr-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 max-w-xl w-full pl-2 sm:pl-4 md:pl-8"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card aspect-video group">
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
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 sm:h-9 sm:w-9 text-primary-foreground fill-primary-foreground mr-[-2px]" />
                  </div>
                </div>
              )}
              {playing && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3">
                  <button onClick={togglePlay} className="h-10 w-10 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
                    <Pause className="h-5 w-5 text-foreground" />
                  </button>
                  <button onClick={toggleMute} className="h-10 w-10 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
                    {muted ? <VolumeX className="h-5 w-5 text-foreground" /> : <Volume2 className="h-5 w-5 text-foreground" />}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Section 2: School Approach ───────── */
const SchoolApproach = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          <motion.div style={{ opacity, rotateY }} className="flex-1 text-right pr-2 sm:pr-4">
            <ScrollReveal direction="right">
              <p className="font-body text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                المدرسة تعتمد نهجاً جديداً في تعليم البرمجة خصوصاً للمتعلم العربي. لن تضطر لقضاء ساعات طويلة محاولاً الوصول لفهم صحيح وواضح لشروحات البرمجة وتطبيقاتها.
                <br /><br />
                المدرسة تضمن لك شروحات شاملة بالعربية مع خبراء من أكبر الشركات العالمية مثل{" "}
                <span className="text-primary font-semibold">Google</span> و{" "}
                <span className="text-primary font-semibold">Microsoft</span> و{" "}
                <span className="text-primary font-semibold">Amazon</span> و{" "}
                <span className="text-primary font-semibold">Meta</span>، مما يعني فهماً أعمق ومعلومات صحيحة 100%.
                <br /><br />
                المدرسة سترافقك في رحلة ممتعة من التعلم حتى تخطو خطواتك الأولى الثابتة في العمل.
              </p>
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-8 text-base">
                  ابدأ رحلتك التعليمية الآن
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </ScrollReveal>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
            style={{ perspective: "1000px" }}
          >
            <img src={ladderImg} alt="شخص يتسلق سلم النجاح" className="max-h-[350px] sm:max-h-[450px] object-contain drop-shadow-2xl" loading="lazy" width={512} height={640} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Section 3: Testimonials ───────── */
const testimonials = [
  { name: "أحمد محمد", text: "المدرسة غيّرت مساري المهني بالكامل. الشرح بالعربي مع مدربين من شركات عالمية جعل الفهم أسهل بكثير.", avatar: "أ" },
  { name: "سارة علي", text: "أفضل منصة تعليمية عربية جربتها. المتابعة الشخصية والمشاريع العملية ساعدتني أحصل على وظيفتي الأولى.", avatar: "س" },
  { name: "يوسف خالد", text: "من أول دورة شعرت بالفرق. المنهج منظم والمدربين محترفين ودايماً متواجدين للرد على أي سؤال.", avatar: "ي" },
  { name: "نور حسن", text: "الشهادة المعتمدة اللي حصلت عليها من المدرسة كانت سبب مباشر في قبولي بشركة كبيرة. شكراً Future Leaders!", avatar: "ن" },
  { name: "محمد عبدالله", text: "تجربة تعليمية فريدة من نوعها. المحتوى محدث والتطبيق العملي يخلّيك جاهز لسوق العمل فعلاً.", avatar: "م" },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10"
        >
          اسمع من طلاب{" "}
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">المدرسة</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl border border-border p-8 sm:p-12 text-center"
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary-foreground font-display font-bold text-xl sm:text-2xl">{testimonials[current].avatar}</span>
                </div>
                <p className="text-foreground text-lg sm:text-xl leading-relaxed mb-6">"{testimonials[current].text}"</p>
                <p className="font-display font-bold text-primary text-lg">{testimonials[current].name}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-surface-mid transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-3 w-3 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-border"}`} />
              ))}
              <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-surface-mid transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────── Section 5: Family / What Makes Us Different ───────── */
const FamilySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  return (
    <section ref={ref} className="py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div style={{ rotateX, scale, transformStyle: "preserve-3d" as any }} className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-right pr-2 sm:pr-4">
            <ScrollReveal direction="right">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 sm:mb-8">
                ماذا ستجد في المدرسة لن تجده في{" "}
                <span className="text-primary">أي مكان آخر</span>؟
              </h2>
              <p className="font-body text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4">
                الإجابة على هذا السؤال بكلمة واحدة: <span className="text-primary font-bold">عائلة</span>.
              </p>
              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                القائمون على المدرسة أخذوا على عاتقهم تحقيق رسالة يؤمنون بها: <span className="text-foreground font-semibold">إنشاء جيل كامل من المبرمجين العرب المتميزين</span> القادرين على المنافسة عالمياً.
              </p>
              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                راهنوا على تميّز العقول العربية وقرروا إنشاء وجهة تجمع هذه الطاقات والعقول تحت مظلة عائلة تسعى لتحقيق حلم مشترك.
              </p>
              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed">
                في المدرسة، <span className="text-primary font-bold">نجاحك هو نجاحنا!</span>
              </p>
            </ScrollReveal>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateZ: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <img src={studentsImg} alt="طلاب يتعلمون معاً" className="max-h-[320px] sm:max-h-[420px] object-contain drop-shadow-2xl" loading="lazy" width={640} height={512} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────── Section 6: Top Engineers ───────── */
const topEngineers = [
  { name: "م. أحمد سعيد", title: "مهندس برمجيات أول — Google", img: eng1 },
  { name: "م. ليلى عمر", title: "مهندسة شبكات — Amazon", img: eng2 },
  { name: "م. خالد يوسف", title: "مهندس اتصالات — Meta", img: eng3 },
];

const TopEngineersSection = () => (
  <section className="py-20 sm:py-28 bg-surface-low grid-bg">
    <div className="container mx-auto px-4 sm:px-6">
      <ScrollReveal>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 sm:mb-16">
          تعلم من{" "}
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">الأفضل</span>
        </h2>
      </ScrollReveal>
      <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
        {topEngineers.map((eng, i) => (
          <ScrollReveal key={i} delay={i * 0.15} direction="scale">
            <motion.div
              whileHover={{ y: -12, rotateY: 5 }}
              className="flex flex-col items-center"
              style={{ perspective: "800px" }}
            >
              <div className="h-32 w-32 sm:h-44 sm:w-44 rounded-full overflow-hidden border-4 border-primary/30 mb-5 shadow-lg shadow-primary/10">
                <img src={eng.img} alt={eng.name} className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">{eng.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{eng.title}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
      <div className="text-center">
        <Link to="/learn-from-best">
          <Button size="lg" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-10 text-lg">
            تعلّم من الأفضل
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

/* ───────── Section 7: Why the School ───────── */
const whyRightItems = [
  { icon: <Zap className="h-7 w-7" />, title: "تعلّم أسرع", desc: "تتعلم 3 أضعاف أسرع لأنك تتلقى الشرح وتتفاعل بلغتك الأم." },
  { icon: <BookOpen className="h-7 w-7" />, title: "دورات محددة", desc: "تعلم البرمجة من الصفر حتى الاحتراف في أي دورة برمجية تؤهلك للمنافسة في سوق العمل العالمي." },
  { icon: <Wrench className="h-7 w-7" />, title: "دراسة عملية", desc: "طبّق مشاريع حقيقية تترجم مهاراتك البرمجية وتصقل فهمك." },
  { icon: <Baby className="h-7 w-7" />, title: "دورات مخصصة للأطفال", desc: "حوّل طفلك إلى مبرمج موهوب من سن مبكر واختصر عليه الكثير من الخطوات." },
  { icon: <Globe className="h-7 w-7" />, title: "تعلم من أي مكان", desc: "تعلم من هاتفك أو حاسوبك من أي مكان وفي أي وقت." },
];

const whyLeftItems = [
  { icon: <Lightbulb className="h-7 w-7" />, title: "تعليم فعّال", desc: "تعلم البرمجة عبر وسائل بصرية ومكتوبة وعملية لضمان أدق فهم." },
  { icon: <Layers className="h-7 w-7" />, title: "محتوى متكامل", desc: "كل ما تحتاجه للفهم والتطبيق في مكان واحد دون التشتت بين مصادر مختلفة." },
  { icon: <UsersRound className="h-7 w-7" />, title: "مجتمع متنامٍ", desc: "انضم لمجتمع ديناميكي متنامٍ من طلاب المدرسة لبناء شبكتك المهنية." },
  { icon: <UserCheck className="h-7 w-7" />, title: "متابعة شخصية", desc: "إجابات على كل أسئلتك وتواصل تفاعلي مع مبرمجين محترفين في Microsoft وGoogle وMeta." },
  { icon: <Star className="h-7 w-7" />, title: "تعلم من الأفضل", desc: "تعلم من أفضل مهندسي البرمجيات في كبرى الشركات العالمية." },
];

const WhyItemCard = ({ item, index, fromRight }: { item: { icon: React.ReactNode; title: string; desc: string }; index: number; fromRight: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: fromRight ? 60 : -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    viewport={{ once: true }}
    className="flex items-start gap-4 sm:gap-5 text-right"
  >
    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0 mt-1">
      {item.icon}
    </div>
    <div className="min-w-0">
      <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-1 sm:mb-2">{item.title}</h3>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
    </div>
  </motion.div>
);

const WhySchoolSection = () => (
  <section className="py-20 sm:py-28 overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6">
      <ScrollReveal>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-14 sm:mb-20">
          لماذا{" "}
          <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">المدرسة!</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 sm:gap-16 items-start">
        <div className="space-y-8 sm:space-y-10">
          {whyRightItems.map((item, i) => (
            <WhyItemCard key={i} item={item} index={i} fromRight={true} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="hidden lg:flex items-start justify-center pt-8 shrink-0"
        >
          <img src={whySchoolImg} alt="لماذا المدرسة" className="w-[280px] object-contain drop-shadow-2xl" loading="lazy" width={640} height={800} />
        </motion.div>

        <div className="space-y-8 sm:space-y-10">
          {whyLeftItems.map((item, i) => (
            <WhyItemCard key={i} item={item} index={i} fromRight={false} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────── Section 8: School Goal ───────── */
const goalItems = [
  { icon: <CalendarCheck className="h-6 w-6" />, title: "جدول زمني واضح", desc: "قِس تقدمك في رحلتك التعليمية والوقت التقريبي الذي تقضيه في الدراسة." },
  { icon: <Award className="h-6 w-6" />, title: "شهادة موثقة", desc: "احصل على شهادة قابلة للتحقق أونلاين من المنصة وأضفها إلى سيرتك الذاتية." },
  { icon: <Star className="h-6 w-6" />, title: "فعاليات حصرية", desc: "اشترك في فعاليات حصرية لطلاب المدرسة تلتقي فيها بالمدربين مباشرة." },
  { icon: <Baby className="h-6 w-6" />, title: "المبرمج الصغير", desc: "دورة تعليمية متكاملة وممتعة مصممة خصيصاً للأطفال بشرح كامل بالعربية." },
];

const SchoolGoalSection = () => (
  <section className="py-20 sm:py-28 bg-surface-low grid-bg overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 text-right pr-2 sm:pr-4 md:pr-8">
          <ScrollReveal direction="right">
            <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              هدفنا في المدرسة دعم شغفك ومساعدتك لدفعك للاستمرار في النجاح وعدم التوقف في منتصف الطريق قبل الوصول لهدفك. المدرسة بيتك الثاني حيث نوفر لك العديد من عوامل النجاح والاعتمادية.
            </p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              المدرسة تضمن لك:
            </h3>
          </ScrollReveal>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-start mt-6"
          >
            <img src={goalPersonImg} alt="شخص يفكر" className="max-h-[250px] sm:max-h-[300px] object-contain drop-shadow-2xl" loading="lazy" width={640} height={640} />
          </motion.div>
        </div>

        <div className="flex-1 space-y-6 sm:space-y-8 pl-2 sm:pl-4 md:pl-8">
          {goalItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 sm:gap-5 text-right"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                {item.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────── Section 9: Stats ───────── */
const stats = [
  { icon: <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10" />, value: "1,250+", label: "طالب" },
  { icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10" />, value: "15,000+", label: "ساعة تعليمية" },
  { icon: <FolderKanban className="h-8 w-8 sm:h-10 sm:w-10" />, value: "850+", label: "مشروع" },
];

const StatsSection = () => (
  <section className="py-20 sm:py-28">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {stats.map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1} direction="scale">
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 1 }}
              className="bg-card rounded-2xl border border-border p-8 sm:p-12 text-center"
            >
              <div className="flex justify-center mb-4 sm:mb-6 text-primary">{s.icon}</div>
              <p className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-foreground mb-3 sm:mb-4">{s.value}</p>
              <p className="text-base sm:text-lg text-muted-foreground">{s.label}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ───────── Section 10: Contact & Subscribe ───────── */
const ContactSubscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 sm:py-28 bg-surface-low grid-bg overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8 sm:p-12 md:p-16">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12">
            <div className="flex-1 text-right">
              <ScrollReveal direction="right">
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-4">عندك استفسار؟</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  نرحب بجميع استفساراتك ويسعدنا خدمتك والعمل على توفير بيئة تعليمية سهلة ومتقدمة.
                </p>
              </ScrollReveal>
            </div>
            <div className="flex-1 text-right">
              <ScrollReveal direction="left">
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-4">اشترك في قائمتنا البريدية</h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  ابقَ على اطلاع بكل جديد.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 text-base bg-surface-mid border-border"
                  />
                  <Button className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-8 h-12 text-base shrink-0">
                    <Mail className="h-5 w-5 ml-2" />
                    اشتراك
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Section 11: FAQ ───────── */
const faqItems = [
  { q: "هل يوجد دورات لتعليم البرمجة من الصفر للمبتدئين؟", a: "نعم! لدينا دورات شاملة تبدأ معك من الصفر تماماً وتأخذك خطوة بخطوة حتى تصبح مبرمجاً محترفاً. لا تحتاج أي خبرة مسبقة — كل ما تحتاجه هو الرغبة في التعلم." },
  { q: "هل يمكنني التعلم بالعربية بالكامل؟", a: "بالطبع! جميع الدورات مشروحة بالكامل باللغة العربية مع مدربين محترفين يتحدثون العربية كلغة أم. ستفهم كل شيء بوضوح تام." },
  { q: "هل الشهادة معتمدة؟", a: "نعم، تحصل على شهادة موثقة برقم تتبع فريد يمكن التحقق منه أونلاين. يمكنك إضافتها لسيرتك الذاتية وحساباتك المهنية." },
  { q: "هل هناك متابعة بعد الانتهاء من الدورة؟", a: "نعم! نقدم متابعة شخصية ودعم مستمر حتى بعد إتمام الدورة. فريق المدربين متواجد دائماً للإجابة على أسئلتك ومساعدتك في رحلتك المهنية." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 sm:mb-16">
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
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-right"
              >
                <span className="font-display font-bold text-base sm:text-lg md:text-xl text-foreground">{item.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0 mr-4"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8">
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ───────── Page ───────── */
const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroIntro />
    <SchoolApproach />
    <TestimonialsSection />
    <FamilySection />
    <TopEngineersSection />
    <WhySchoolSection />
    <SchoolGoalSection />
    <StatsSection />
    <ContactSubscribe />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
