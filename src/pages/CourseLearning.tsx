import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward,
  Settings, Lock, CheckCircle, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const courseLessons = [
  { section: "المقدمة", lessons: [
    { id: 0, title: "مرحباً بك في الدورة", duration: "03:27", completed: true },
    { id: 1, title: "ما ستتعلمه", duration: "05:12", completed: true },
    { id: 2, title: "متطلبات الدورة", duration: "02:45", completed: false },
  ]},
  { section: "مواد الدورة", lessons: [
    { id: 3, title: "الدرس الأول: أساسيات الأمان", duration: "12:30", completed: false },
    { id: 4, title: "الدرس الثاني: التشفير", duration: "15:20", completed: false },
    { id: 5, title: "الدرس الثالث: المصادقة", duration: "18:45", completed: false },
    { id: 6, title: "اختبار القسم الأول", duration: "10:00", completed: false },
  ]},
  { section: "كراسة التعديل السلوكي", lessons: [
    { id: 7, title: "التمرين العملي 1", duration: "20:00", completed: false },
    { id: 8, title: "التمرين العملي 2", duration: "25:00", completed: false },
  ]},
  { section: "الدماغ والسلوك", lessons: [
    { id: 9, title: "المحاضرة 1", duration: "14:30", completed: false },
    { id: 10, title: "المحاضرة 2", duration: "16:20", completed: false },
    { id: 11, title: "المحاضرة 3", duration: "12:10", completed: false },
    { id: 12, title: "اختبار نهائي", duration: "15:00", completed: false },
  ]},
];

const CourseLearning = () => {
  const { id, lessonId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showRateMenu, setShowRateMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { name: "أحمد", text: "شرح ممتاز جداً!", time: "منذ ساعة" },
    { name: "سارة", text: "هل يمكن إعادة شرح جزء التشفير؟", time: "منذ 3 ساعات" },
  ]);
  const [activeLessonId, setActiveLessonId] = useState(Number(lessonId) || 0);

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

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;
  };

  const changeRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowRateMenu(false);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments([{ name: "أنت", text: comment, time: "الآن" }, ...comments]);
    setComment("");
  };

  const completedCount = courseLessons.flatMap(s => s.lessons).filter(l => l.completed).length;
  const totalCount = courseLessons.flatMap(s => s.lessons).length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
        {/* Right sidebar – course content */}
        <div className="w-full lg:w-96 border-l border-border bg-card overflow-y-auto order-2 lg:order-1">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{progress}% مكتمل</span>
            </div>
            <div className="h-2 bg-surface-mid rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-l from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {courseLessons.map((section, si) => (
            <div key={si} className="border-b border-border">
              <div className="p-4 bg-surface-mid/50">
                <h3 className="font-display font-bold text-base text-foreground text-right">{section.section}</h3>
                <p className="text-xs text-muted-foreground text-right mt-1">{section.lessons.length} المواد</p>
              </div>
              {section.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full flex items-center gap-3 p-4 text-right hover:bg-surface-mid/50 transition-colors ${
                    activeLessonId === lesson.id ? "bg-primary/5 border-r-2 border-primary" : ""
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  ) : activeLessonId === lesson.id ? (
                    <Play className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-border shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${activeLessonId === lesson.id ? "text-primary font-bold" : "text-foreground"}`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main content – video + comments */}
        <div className="flex-1 overflow-y-auto order-1 lg:order-2">
          {/* Video player */}
          <div className="relative bg-black group">
            <video
              ref={videoRef}
              className="w-full aspect-video"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              playsInline
              preload="metadata"
              onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              onEnded={() => setPlaying(false)}
            />

            {/* Center play button */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
                <div className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="h-9 w-9 text-primary-foreground fill-primary-foreground mr-[-2px]" />
                </div>
              </div>
            )}

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Progress bar */}
              <div
                className="h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer"
                onClick={(e) => {
                  if (!videoRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  videoRef.current.currentTime = pct * duration;
                }}
              >
                <div className="h-full bg-primary rounded-full" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={togglePlay} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    {playing ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                  </button>
                  <button onClick={() => skip(-10)} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    <SkipBack className="h-5 w-5 text-white" />
                  </button>
                  <button onClick={() => skip(10)} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    <SkipForward className="h-5 w-5 text-white" />
                  </button>
                  <span className="text-white text-sm ml-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    {muted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
                  </button>

                  <div className="relative">
                    <button onClick={() => setShowRateMenu(!showRateMenu)} className="h-9 px-2 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                      <Settings className="h-5 w-5 text-white" />
                    </button>
                    {showRateMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-xl p-2 shadow-xl min-w-[100px]">
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changeRate(rate)}
                            className={`w-full px-3 py-1.5 text-sm rounded-lg text-right hover:bg-surface-mid transition-colors ${
                              playbackRate === rate ? "text-primary font-bold" : "text-foreground"
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button onClick={toggleFullscreen} className="h-9 w-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                    <Maximize className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="p-6 md:p-8">
            <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-right">التعليقات</h3>

            {/* Comment input */}
            <div className="flex gap-3 mb-8">
              <Input
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
                className="flex-1 h-12 text-base bg-surface-mid border-border"
              />
              <Button onClick={submitComment} className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 px-6">
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-sm text-primary">{c.name[0]}</span>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-bold text-sm text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-base text-muted-foreground">{c.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
