import { Link } from "react-router-dom";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const engineers = [
  { id: "1", name: "م. أحمد حسن", title: "مهندس برمجيات أول", specialty: "البرمجة" },
  { id: "2", name: "م. سارة محمود", title: "مهندسة شبكات", specialty: "الشبكات" },
  { id: "3", name: "م. خالد عبدالله", title: "خبير اتصالات", specialty: "الاتصالات" },
  { id: "4", name: "م. نورا أحمد", title: "مطورة Full-Stack", specialty: "البرمجة" },
  { id: "5", name: "م. عمر فاروق", title: "مهندس DevOps", specialty: "الشبكات" },
  { id: "6", name: "م. فاطمة علي", title: "خبيرة أمن معلومات", specialty: "الشبكات" },
];

const Consultations = () => (
  <div className="min-h-screen bg-background pt-20">
    {/* Header */}
    <section className="py-20 grid-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="h-48 w-48 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/10 flex items-center justify-center">
              <Users className="h-24 w-24 text-secondary/50" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6"
            >
              استشارات <span className="text-secondary text-glow-secondary">المدرسة</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              وفّر جهدك وطاقتك واحصل على استشارة متخصصة. في المدرسة نجمع بين الخبرة العملية في مختلف مجالات البرمجة وشغف التكنولوجيا لنقدم لك استشارات تقنية وغير تقنية مبتكرة ومخصصة تحل مشكلتك وتحقق أهدافك. نؤمن بأن كل تحدٍ أو مشكلة يمكن تحويلها إلى فرص بالمعرفة الصحيحة.
            </motion.p>
          </div>
        </div>
      </div>
    </section>

    {/* Engineers grid */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-16">
            المهندسون <span className="text-primary">المتخصصون</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineers.map((eng, i) => (
            <ScrollReveal key={eng.id} delay={i * 0.1}>
              <Link to={`/engineer/${eng.id}`}>
                <motion.div
                  className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/20 transition-all duration-500 cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="font-display font-bold text-2xl text-primary">{eng.name[2]}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground text-center mb-2">{eng.name}</h3>
                  <p className="text-muted-foreground text-center text-sm mb-3">{eng.title}</p>
                  <div className="flex justify-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {eng.specialty}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>عرض الملف</span>
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Consultations;
