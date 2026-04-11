import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Maximize, ChevronDown, ChevronUp,
  Plus, Upload, User, Calendar, ExternalLink, Rewind, FastForward, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import projectsHeroImg from "@/assets/projects-hero.png";

/* ── Placeholder data ── */
const placeholderProjects = [
  { id: 1, title: "موقع متجر إلكتروني كامل", creator: "أحمد محمد", year: "2025", info: "مهندس برمجيات — تخصص React و Node.js", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, title: "تطبيق إدارة المهام", creator: "سارة علي", year: "2025", info: "مطورة Full Stack — Python و Django", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, title: "منصة تعليمية تفاعلية", creator: "يوسف خالد", year: "2024", info: "مبرمج واجهات أمامية — Vue.js", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, title: "نظام حجز مواعيد ذكي", creator: "ليلى عمر", year: "2024", info: "مطورة تطبيقات — Flutter", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 5, title: "لوحة تحكم لتحليل البيانات", creator: "خالد يوسف", year: "2024", info: "مهندس بيانات — Python و Tableau", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 6, title: "تطبيق شبكة اجتماعية", creator: "نور حسن", year: "2025", info: "مطور تطبيقات — React Native", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 7, title: "بوت محادثة ذكي", creator: "محمد عبدالله", year: "2025", info: "مهندس ذكاء اصطناعي — Python و TensorFlow", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 8, title: "موقع بورتفوليو احترافي", creator: "فاطمة أحمد", year: "2024", info: "مصممة ومطورة — HTML/CSS/JS", link: "https://example.com", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

const INITIAL_SHOW = 5;
const LOAD_MORE = 3;

/* ── Video Player ── */
const ProjectVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);

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
  const skip = (sec: number) => {
    if (videoRef.current) videoRef.current.currentTime += sec;
  };
  const changeSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };
  const goFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-card border border-border aspect-video group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="absolute inset-0 bg-background/40 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform">
            <Play className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground fill-primary-foreground mr-[-2px]" />
          </div>
        </div>
      )}
      <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-background/80 to-transparent transition-opacity flex items-center gap-2 sm:gap-3 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <button onClick={togglePlay} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          {playing ? <Pause className="h-4 w-4 text-foreground" /> : <Play className="h-4 w-4 text-foreground fill-foreground" />}
        </button>
        <button onClick={() => skip(-10)} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          <Rewind className="h-4 w-4 text-foreground" />
        </button>
        <button onClick={() => skip(10)} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          <FastForward className="h-4 w-4 text-foreground" />
        </button>
        <button onClick={toggleMute} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          {muted ? <VolumeX className="h-4 w-4 text-foreground" /> : <Volume2 className="h-4 w-4 text-foreground" />}
        </button>
        <button onClick={changeSpeed} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          <span className="text-xs font-bold text-foreground">{speed}x</span>
        </button>
        <div className="flex-1" />
        <button onClick={goFullscreen} className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 transition-colors">
          <Maximize className="h-4 w-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};

/* ── Project Card ── */
const ProjectCard = ({ project, index }: { project: typeof placeholderProjects[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <ProjectVideoPlayer src={project.video} />
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors border-t border-border"
      >
        {expanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-base sm:text-lg text-foreground">{project.creator}</p>
                  <p className="text-sm text-muted-foreground">{project.info}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm">
                <ExternalLink className="h-4 w-4" />
                رابط المشروع
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Projects Page ── */
const Projects = () => {
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visibleProjects = placeholderProjects.slice(0, showCount);
  const hasMore = showCount < placeholderProjects.length;
  const canHide = showCount > INITIAL_SHOW;

  const handleShowMore = () => {
    setShowCount((c) => Math.min(c + LOAD_MORE, placeholderProjects.length));
  };
  const handleHide = () => {
    setShowCount(INITIAL_SHOW);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden grid-bg">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-right pr-2 sm:pr-4 md:pr-8"
            >
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 sm:mb-8">
                مشاريع{" "}
                <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">الطلاب</span>
              </h1>
              <p className="font-body text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                استعرض مشاريع طلاب المدرسة الذين حوّلوا ما تعلموه إلى تطبيقات حقيقية. شاهد الإبداع والابتكار في كل مشروع وكن الملهم القادم.
              </p>
            </motion.div>
            {/* Icon left */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex-1 flex justify-center pl-2 sm:pl-4 md:pl-8"
              style={{ perspective: "1000px" }}
            >
              <img src={projectsHeroImg} alt="طلاب يعملون على مشاريع" className="max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-2xl" loading="lazy" width={800} height={640} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Videos */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 sm:mb-16">
              أعمال{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">مميزة</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-8">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Show More / Hide buttons */}
          <div className="flex justify-center gap-4 mt-10">
            {hasMore && (
              <Button onClick={handleShowMore} size="lg" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl px-8 text-base">
                عرض المزيد
              </Button>
            )}
            {canHide && (
              <Button onClick={handleHide} variant="outline" size="lg" className="rounded-xl px-8 text-base">
                إخفاء
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-20 sm:py-28 bg-surface-low grid-bg">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 sm:mb-16">
              شارك{" "}
              <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">مشروعك</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-6 sm:p-10">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-display font-semibold text-foreground mb-2">الاسم</label>
                <Input placeholder="اسمك الكامل" className="h-12 text-base bg-surface-mid border-border" />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-foreground mb-2">البريد الإلكتروني</label>
                <Input type="email" placeholder="example@email.com" className="h-12 text-base bg-surface-mid border-border" />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-foreground mb-2">رابط المشروع</label>
                <Input placeholder="https://..." className="h-12 text-base bg-surface-mid border-border" />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-foreground mb-2">معلومات إضافية</label>
                <Textarea placeholder="أخبرنا عن مشروعك..." className="min-h-[100px] text-base bg-surface-mid border-border" />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold text-foreground mb-2">رفع فيديو</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {fileName || "اضغط لاختيار فيديو من جهازك"}
                  </span>
                </button>
              </div>
              <Button className="w-full bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 text-base">
                إرسال المشروع
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
