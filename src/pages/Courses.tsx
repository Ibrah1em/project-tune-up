import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import LazyImage from "@/components/LazyImage";

import courseCyber from "@/assets/course-cyber.png";
import coursePython from "@/assets/course-python.png";
import courseReact from "@/assets/course-react.png";
import courseMobile from "@/assets/course-mobile.png";
import courseDatabase from "@/assets/course-database.png";
import courseKids from "@/assets/course-kids.png";

const placeholderCourses = [
  { id: "cybersecurity", title: "أساسيات الأمن السيبراني", hours: 24, img: courseCyber },
  { id: "python-basics", title: "أساسيات Python", hours: 32, img: coursePython },
  { id: "react-web", title: "تطوير الويب بـ React", hours: 40, img: courseReact },
  { id: "mobile-dev", title: "تطبيقات الموبايل", hours: 36, img: courseMobile },
  { id: "databases", title: "قواعد البيانات SQL", hours: 20, img: courseDatabase },
  { id: "kids-programming", title: "المبرمج الصغير", hours: 18, img: courseKids },
];

const CoursesHero = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  }, [playing]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  }, [muted]);

  return (
    <section className="relative py-24 sm:py-32 pt-28 sm:pt-36 overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="light-orb light-orb-1" style={{ top: "10%", right: "5%" }} />
        <div className="light-orb light-orb-2" style={{ bottom: "15%", left: "10%" }} />
        <div className="light-orb light-orb-3" style={{ top: "60%", right: "40%" }} />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, z: -200, rotateY: -15 }}
            animate={{ opacity: 1, z: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 text-right pr-2 sm:pr-4 md:pr-10"
            style={{ perspective: "1200px" }}
          >
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 sm:mb-8">
              مسارات المدرسة لتعلم البرمجة{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">من الصفر</span>
            </h1>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              مساراتنا التعليمية أُعدت بعناية من قبل أفضل المبرمجين العاملين في كبرى الشركات العالمية مثل Google وAmazon بخبرة تزيد عن 11 عاماً.
            </p>
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl">
              مسارات المدرسة تغطي أغلب جوانب البرمجة من مسار برمجة الأطفال وأساسيات البرمجة إلى المواضيع المتخصصة مثل الخوارزميات وهياكل البيانات وتطوير الواجهات الأمامية والخلفية.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, z: -200, rotateY: 15 }}
            animate={{ opacity: 1, z: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 max-w-xl w-full pl-2 sm:pl-4 md:pl-10"
            style={{ perspective: "1200px" }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card aspect-video group">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                playsInline
                preload="none"
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

const CourseCardsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <ScrollReveal>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-4">
            الدورات{" "}
            <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">المتاحة</span>
          </h2>
          <p className="text-center text-base sm:text-lg text-muted-foreground mb-12 sm:mb-16">اختر الدورة التي تناسبك وابدأ رحلتك</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {placeholderCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, rotateY: 90, scale: 0.7 }}
              animate={hasAnimated ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                type: "spring",
                stiffness: 60,
                damping: 12,
              }}
              style={{ perspective: "1200px" }}
            >
              <Link to={`/course/${course.id}`}>
                <motion.div
                  whileHover={{ y: -8, rotateY: 5, scale: 1.03 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative h-44 sm:h-52 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center overflow-hidden">
                    <LazyImage
                      src={course.img}
                      alt={course.title}
                      className="h-32 w-32 sm:h-40 sm:w-40 object-contain group-hover:scale-110 transition-transform duration-500"
                      width={640}
                      height={512}
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{course.hours} ساعة</span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-5 flex-1">{course.title}</h3>
                    <Button className="w-full bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl text-sm sm:text-base h-11 sm:h-12">
                      سجّل الآن
                      <ArrowLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Courses = () => (
  <div className="min-h-screen bg-background pt-20">
    <CoursesHero />
    <CourseCardsSection />
    <Footer />
  </div>
);

export default Courses;
