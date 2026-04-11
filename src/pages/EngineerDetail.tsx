import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const engineersData: Record<string, { name: string; title: string; bio: string; social: { github?: string; linkedin?: string; twitter?: string } }> = {
  "1": { name: "م. أحمد حسن", title: "مهندس برمجيات أول", bio: "مهندس برمجيات بخبرة أكثر من 10 سنوات في تطوير تطبيقات الويب والموبايل. عمل في شركات عالمية مثل Google و Microsoft. متخصص في React و Node.js وبنية الأنظمة الموزعة.", social: { github: "#", linkedin: "#", twitter: "#" } },
  "2": { name: "م. سارة محمود", title: "مهندسة شبكات", bio: "خبيرة في تصميم وإدارة الشبكات المؤسسية. حاصلة على شهادات CCNP و CCIE. عملت في بنية تحتية لشركات اتصالات كبرى في الشرق الأوسط.", social: { linkedin: "#", twitter: "#" } },
  "3": { name: "م. خالد عبدالله", title: "خبير اتصالات", bio: "متخصص في أنظمة الاتصالات الحديثة وشبكات الجيل الخامس. ساهم في تطوير بنية تحتية لشبكات 5G في عدة دول عربية.", social: { linkedin: "#" } },
  "4": { name: "م. نورا أحمد", title: "مطورة Full-Stack", bio: "مطورة متكاملة بخبرة في بناء منصات SaaS. متخصصة في TypeScript و Python و Cloud Architecture.", social: { github: "#", linkedin: "#" } },
  "5": { name: "م. عمر فاروق", title: "مهندس DevOps", bio: "خبير في أتمتة البنية التحتية وإدارة الحاويات. متخصص في Kubernetes و AWS و CI/CD pipelines.", social: { github: "#", linkedin: "#" } },
  "6": { name: "م. فاطمة علي", title: "خبيرة أمن معلومات", bio: "متخصصة في الأمن السيبراني واختبار الاختراق. حاصلة على شهادات CEH و OSCP. عملت في حماية أنظمة بنوك ومؤسسات مالية.", social: { linkedin: "#", twitter: "#" } },
};

const sampleMessages = [
  { name: "محمد أحمد", text: "مهندس ممتاز، شرحه واضح وبسيط. استفدت كثيراً من الاستشارة." },
  { name: "ليلى حسين", text: "الاستشارة كانت مفيدة جداً، ساعدني في حل مشكلة كنت أعاني منها لأسابيع." },
  { name: "يوسف عمر", text: "أسلوب رائع في التدريس والشرح. أنصح الجميع بالاستشارة معه." },
  { name: "سلمى خالد", text: "تجربة ممتازة! المهندس متعاون جداً وصبور في الشرح." },
];

const EngineerDetail = () => {
  const { id } = useParams();
  const engineer = engineersData[id || "1"];
  const [message, setMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!engineer) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-foreground mb-4">المهندس غير موجود</h1>
          <Link to="/consultations" className="text-primary hover:underline">العودة للاستشارات</Link>
        </div>
      </div>
    );
  }

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % sampleMessages.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + sampleMessages.length) % sampleMessages.length);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back link */}
      <div className="container mx-auto px-6 py-6">
        <Link to="/consultations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowRight className="h-4 w-4" />
          العودة للاستشارات
        </Link>
      </div>

      {/* Engineer profile */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-5xl text-primary">{engineer.name[2]}</span>
                </div>
                <div className="text-center md:text-right flex-1">
                  <h1 className="font-display font-bold text-3xl text-foreground mb-2">{engineer.name}</h1>
                  <p className="text-primary font-medium mb-4">{engineer.title}</p>
                  <div className="flex gap-3 justify-center md:justify-start mb-6">
                    {engineer.social.github && (
                      <a href={engineer.social.github} className="h-10 w-10 rounded-lg bg-surface-mid flex items-center justify-center hover:bg-primary/10 transition-colors">
                        <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {engineer.social.linkedin && (
                      <a href={engineer.social.linkedin} className="h-10 w-10 rounded-lg bg-surface-mid flex items-center justify-center hover:bg-primary/10 transition-colors">
                        <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                    {engineer.social.twitter && (
                      <a href={engineer.social.twitter} className="h-10 w-10 rounded-lg bg-surface-mid flex items-center justify-center hover:bg-primary/10 transition-colors">
                        <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{engineer.bio}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leave a message */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="bg-card rounded-2xl border border-border p-8">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">اترك رسالة</h2>
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب تجربتك أو رسالتك هنا..."
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 flex-1"
                />
                <Button type="submit" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 px-6">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Messages carousel */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">ماذا قال الآخرون</h2>
            <div className="relative max-w-3xl mx-auto">
              <div ref={carouselRef} className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(${currentSlide * 100}%)` }}
                >
                  {sampleMessages.map((msg, i) => (
                    <div key={i} className="w-full shrink-0 px-4">
                      <div className="bg-card rounded-2xl border border-border p-8 text-center">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                          <span className="font-display font-bold text-lg text-primary">{msg.name[0]}</span>
                        </div>
                        <p className="text-foreground text-lg mb-4 leading-relaxed">"{msg.text}"</p>
                        <p className="text-muted-foreground text-sm font-medium">{msg.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-surface-mid transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-surface-mid transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {sampleMessages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default EngineerDetail;
