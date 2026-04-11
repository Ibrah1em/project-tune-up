import { Heart, Percent, MessageCircle, Calendar, Users, BookOpen, Award, Server, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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
              icon: <Heart className="h-8 w-8" />,
              title: "صدقة جارية",
              desc: "ستشارك في الأجر وتلعب دوراً فعالاً في تنمية المجتمع وتمكين الشباب",
            },
            {
              icon: <Percent className="h-8 w-8" />,
              title: "خصومات حصرية",
              desc: "ستحصل على خصم 60% على جميع مسارات ودورات المدرسة",
            },
            {
              icon: <MessageCircle className="h-8 w-8" />,
              title: "مجموعات دردشة",
              desc: "ستنضم لمجموعات خاصة للنقاش والتوجيه",
            },
            {
              icon: <Calendar className="h-8 w-8" />,
              title: "فعاليات خاصة",
              desc: "ستتمكن من مقابلتنا في فعالياتنا واجتماعاتنا الخاصة",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 text-center">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
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
                icon: <Users className="h-6 w-6" />,
                title: "استمرار دعم غير المقتدرين",
                desc: "الحفاظ على نسبة الدعم بنسبة 100% داخل وخارج مصر لضمان عدم وجود أي عائق مادي أمام أي طالب غير مقتدر.",
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "جوائز ومكافآت للمتفوقين",
                desc: "تنظيم لقاءات وفعاليات لتكريم الطلاب المتفوقين وتقديم جوائز نقدية وهدايا.",
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "توظيف مشرفين إضافيين",
                desc: "توظيف المزيد من المهندسين والمشرفين للتواصل مع الطلاب المدعومين وضمان حصولهم على الدعم الكامل كالاشتراكات المدفوعة.",
              },
              {
                icon: <Server className="h-6 w-6" />,
                title: "تطوير دورات جديدة",
                desc: "التعاقد مع مهندسين متخصصين لإنشاء دورات ومسارات جديدة غير متوفرة حالياً لتلبية احتياجات السوق وتعزيز مهارات الطلاب.",
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "تحسين البنية التحتية للمدرسة",
                desc: "تطوير أساسات المدرسة لضمان بيئة تعليمية أفضل وأكثر تفاعلية لجميع الطلاب.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-5 group">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
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
    <Footer />
  </div>
);

export default SchoolSponsors;
