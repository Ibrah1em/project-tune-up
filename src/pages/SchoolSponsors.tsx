import { Heart, Percent, MessageCircle, Calendar, Users, BookOpen, Award, Server, Sparkles, TrendingUp, HandCoins } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

// Animated counter component
const AnimatedCounter = ({ value, duration = 2.5 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{display.toLocaleString("en-US")}</span>;
};

const SchoolSponsors = () => (
  <div className="min-h-screen bg-background pt-20">
    {/* Header */}
    <section className="py-20 grid-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="h-48 w-48 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10 flex items-center justify-center">
              <Heart className="h-24 w-24 text-primary/50" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6"
            >
              رعاة <span className="text-primary text-glow">المدرسة</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              شاركنا في تغيير مستقبل الشباب للأفضل وكن راعياً! نؤمن بأهمية التعلم للجميع (الميسور والمعسر)، خاصة في العالم العربي وشبابه الذين يواجهون العديد من التحديات والصعوبات. من خلال "رعاة المدرسة"، نهدف لتعليم البرمجة للطلاب الذين لا يستطيعون تحمل تكاليف الدورات، لكننا لا نستطيع ذلك بمفردنا، نحتاج مساعدتك. لذلك نهدف لجمع ألف داعم يساهمون شهرياً لتوفير فرص تعليمية تمكّن الشباب الطموح من تحقيق أحلامهم.
            </motion.p>
          </div>
        </div>
      </div>
    </section>

    {/* Why become a sponsor */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-16">
            لماذا تكون أحد <span className="text-primary">رعاة المدرسة</span>؟
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Heart,
              title: "صدقة جارية",
              desc: "ستشارك في الأجر وتلعب دوراً فعالاً في تنمية المجتمع وتمكين الشباب",
            },
            {
              icon: Percent,
              title: "خصومات حصرية",
              desc: "ستحصل على خصم 60% على جميع مسارات ودورات المدرسة",
            },
            {
              icon: MessageCircle,
              title: "مجموعات دردشة",
              desc: "ستنضم لمجموعات خاصة للنقاش والتوجيه",
            },
            {
              icon: Calendar,
              title: "فعاليات خاصة",
              desc: "ستتمكن من مقابلتنا في فعالياتنا واجتماعاتنا الخاصة",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 text-center">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* How your participation makes a difference */}
    <section className="py-24 bg-surface-low">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground text-center mb-16">
            كيف ستُحدث <span className="text-secondary">مشاركتك</span> فرقاً؟
          </h2>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Illustration */}
          <ScrollReveal direction="right" className="w-full lg:w-1/3 flex justify-center">
            <div className="h-64 w-64 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center">
              <Sparkles className="h-32 w-32 text-primary/30" />
            </div>
          </ScrollReveal>

          {/* Points */}
          <div className="w-full lg:w-2/3 space-y-6">
          {[
            {
              icon: Users,
              title: "استمرار دعم غير المقتدرين",
              desc: "الحفاظ على نسبة الدعم بنسبة 100% داخل وخارج مصر لضمان عدم وجود أي عائق مادي أمام أي طالب غير مقتدر.",
            },
            {
              icon: Award,
              title: "جوائز ومكافآت للمتفوقين",
              desc: "تنظيم لقاءات وفعاليات لتكريم الطلاب المتفوقين وتقديم جوائز نقدية وهدايا.",
            },
            {
              icon: BookOpen,
              title: "توظيف مشرفين إضافيين",
              desc: "توظيف المزيد من المهندسين والمشرفين للتواصل مع الطلاب المدعومين وضمان حصولهم على الدعم الكامل كالاشتراكات المدفوعة.",
            },
            {
              icon: Server,
              title: "تطوير دورات جديدة",
              desc: "التعاقد مع مهندسين متخصصين لإنشاء دورات ومسارات جديدة غير متوفرة حالياً لتلبية احتياجات السوق وتعزيز مهارات الطلاب.",
            },
            {
              icon: Sparkles,
              title: "تحسين البنية التحتية للمدرسة",
              desc: "تطوير أساسات المدرسة لضمان بيئة تعليمية أفضل وأكثر تفاعلية لجميع الطلاب.",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex gap-5 group">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </div>
    </section>

    {/* Payment methods */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-16">
            طرق الدفع <span className="text-primary">في مصر</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <ScrollReveal delay={0}>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/20 transition-all duration-300">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-2xl text-yellow-400">IP</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">InstaPay</h3>
              <p className="text-muted-foreground text-sm mb-2">حساب إنستاباي</p>
              <p className="font-display font-bold text-lg text-primary" dir="ltr">future.leaders@instapay</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:border-primary/20 transition-all duration-300">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-bold text-2xl text-red-400">VC</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">فودافون كاش</h3>
              <p className="text-muted-foreground text-sm mb-2">رقم التحويل</p>
              <p className="font-display font-bold text-lg text-primary" dir="ltr">01012345678</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Total Donations Counter */}
    <section className="py-24 bg-surface-low relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-lg shadow-primary/30"
            >
              <HandCoins className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              إجمالي <span className="text-primary text-glow">التبرعات</span> حتى الآن
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              شكراً لكل من ساهم في دعم تعليم الشباب العربي. كل جنيه يفرق ويصنع مستقبلاً أفضل.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-card via-card to-surface-low rounded-3xl border-2 border-primary/20 p-12 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">المجموع الكلي</span>
                </div>

                <div className="flex items-baseline justify-center gap-3 mb-2 flex-wrap" dir="ltr">
                  <span className="font-display font-extrabold text-6xl md:text-8xl bg-gradient-to-l from-primary via-secondary to-primary bg-clip-text text-transparent leading-none">
                    <AnimatedCounter value={125000} />
                  </span>
                  <span className="font-display font-bold text-2xl md:text-3xl text-foreground">
                    EGP
                  </span>
                </div>

                <p className="text-muted-foreground text-base mb-8">جنيه مصري</p>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-display font-bold text-2xl md:text-3xl text-primary mb-1">
                      <AnimatedCounter value={342} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">داعم</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-display font-bold text-2xl md:text-3xl text-secondary mb-1">
                      <AnimatedCounter value={87} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">طالب مستفيد</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-display font-bold text-2xl md:text-3xl text-primary mb-1">
                      <AnimatedCounter value={12} />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">دورة ممولة</p>
                  </motion.div>
                </div>

                {/* Progress bar towards goal */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-muted-foreground">الهدف: 500,000 جنيه</span>
                    <span className="font-bold text-primary">25%</span>
                  </div>
                  <div className="h-3 bg-surface-mid rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "25%" }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-l from-primary to-secondary rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default SchoolSponsors;
