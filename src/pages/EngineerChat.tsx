import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Send,
  Mic,
  MicOff,
  Image,
  Paperclip,
  Play,
  Pause,
  X,
  Smile,
  Video,
} from "lucide-react";

const engineersData: Record<string, { name: string; title: string }> = {
  "1": { name: "م. أحمد حسن", title: "مهندس برمجيات أول" },
  "2": { name: "م. سارة محمود", title: "مهندسة شبكات" },
  "3": { name: "م. خالد عبدالله", title: "خبير اتصالات" },
  "4": { name: "م. نورا أحمد", title: "مطورة Full-Stack" },
  "5": { name: "م. عمر فاروق", title: "مهندس DevOps" },
  "6": { name: "م. فاطمة علي", title: "خبيرة أمن معلومات" },
};

interface ChatMessage {
  id: string;
  sender: "user" | "engineer";
  type: "text" | "image" | "video" | "file" | "voice";
  content: string;
  fileName?: string;
  duration?: number;
  timestamp: Date;
}

const EngineerChat = () => {
  const { id } = useParams();
  const engineer = engineersData[id || "1"];
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "engineer",
      type: "text",
      content: "أهلاً بك! كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; url: string; type: string }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const recordingInterval = useRef<ReturnType<typeof setInterval>>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [voiceProgress, setVoiceProgress] = useState<Record<string, number>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const progressIntervals = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!engineer) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <h1 className="font-display font-bold text-2xl text-foreground">
          المهندس غير موجود
        </h1>
      </div>
    );
  }

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed && previewFiles.length === 0) return;

    const newMessages: ChatMessage[] = [];

    // Send files first
    previewFiles.forEach((pf) => {
      const fileType = pf.file.type.startsWith("image")
        ? "image"
        : pf.file.type.startsWith("video")
        ? "video"
        : "file";
      newMessages.push({
        id: crypto.randomUUID(),
        sender: "user",
        type: fileType as ChatMessage["type"],
        content: pf.url,
        fileName: pf.file.name,
        timestamp: new Date(),
      });
    });

    if (trimmed) {
      newMessages.push({
        id: crypto.randomUUID(),
        sender: "user",
        type: "text",
        content: trimmed,
        timestamp: new Date(),
      });
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setText("");
    setPreviewFiles([]);

    // Simulate engineer reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "engineer",
          type: "text",
          content: "شكراً لرسالتك! سأرد عليك في أقرب وقت.",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      clearInterval(recordingInterval.current);
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const duration = recordingTime;
          stream.getTracks().forEach((t) => t.stop());
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              sender: "user",
              type: "voice",
              content: audioUrl,
              duration,
              timestamp: new Date(),
            },
          ]);
          setRecordingTime(0);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        recordingInterval.current = setInterval(() => {
          setRecordingTime((t) => t + 1);
        }, 1000);
      } catch {
        console.error("Microphone access denied");
      }
    }
  };

  const togglePlayVoice = (msgId: string, audioUrl: string) => {
    if (playingId === msgId) {
      audioRefs.current[msgId]?.pause();
      clearInterval(progressIntervals.current[msgId]);
      setPlayingId(null);
      return;
    }
    // Stop any currently playing
    if (playingId && audioRefs.current[playingId]) {
      audioRefs.current[playingId].pause();
      clearInterval(progressIntervals.current[playingId]);
    }
    if (!audioRefs.current[msgId]) {
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setPlayingId(null);
        setVoiceProgress((p) => ({ ...p, [msgId]: 0 }));
        clearInterval(progressIntervals.current[msgId]);
      };
      audioRefs.current[msgId] = audio;
    }
    const audio = audioRefs.current[msgId];
    audio.play();
    setPlayingId(msgId);
    progressIntervals.current[msgId] = setInterval(() => {
      if (audio.duration) {
        setVoiceProgress((p) => ({ ...p, [msgId]: (audio.currentTime / audio.duration) * 100 }));
      }
    }, 50);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setPreviewFiles((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removePreview = (index: number) => {
    setPreviewFiles((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <Link
            to={`/engineer/${id}`}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-foreground" />
          </Link>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-primary">
              {engineer.name[2]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-foreground text-sm truncate">
              {engineer.name}
            </h1>
            <p className="text-xs text-muted-foreground">{engineer.title}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">متصل</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 pt-20 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 max-w-3xl space-y-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tl-md"
                    : "bg-muted text-foreground rounded-tr-md"
                }`}
              >
                {msg.type === "text" && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                )}

                {msg.type === "image" && (
                  <div>
                    <img
                      src={msg.content}
                      alt="صورة"
                      className="rounded-lg max-w-full max-h-64 object-cover"
                    />
                    {msg.fileName && (
                      <p className="text-xs mt-1 opacity-75">{msg.fileName}</p>
                    )}
                  </div>
                )}

                {msg.type === "video" && (
                  <div>
                    <video
                      src={msg.content}
                      controls
                      className="rounded-lg max-w-full max-h-64"
                    />
                    {msg.fileName && (
                      <p className="text-xs mt-1 opacity-75">{msg.fileName}</p>
                    )}
                  </div>
                )}

                {msg.type === "file" && (
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-5 w-5 shrink-0" />
                    <span className="text-sm truncate">
                      {msg.fileName || "ملف"}
                    </span>
                  </div>
                )}

                {msg.type === "voice" && (
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <button
                      onClick={() => togglePlayVoice(msg.id, msg.content)}
                      className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors"
                    >
                      {playingId === msg.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-white/80 transition-all duration-100 ease-linear"
                          style={{ width: `${voiceProgress[msg.id] || 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] opacity-60">
                          {playingId === msg.id && audioRefs.current[msg.id]
                            ? formatTime(Math.floor(audioRefs.current[msg.id].currentTime))
                            : "0:00"}
                        </span>
                        <span className="text-[10px] opacity-60">
                          {msg.duration ? (msg.duration >= 60
                            ? `${Math.floor(msg.duration / 60)} دقيقة ${msg.duration % 60 > 0 ? `و ${msg.duration % 60} ثانية` : ""}`
                            : `${msg.duration} ثانية`)
                          : "0:00"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "user" ? "opacity-70" : "text-muted-foreground"
                  }`}
                >
                  {formatTimestamp(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border">
        <div className="container mx-auto max-w-3xl px-4 py-3">
          {/* File previews */}
          {previewFiles.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {previewFiles.map((pf, i) => (
                <div key={i} className="relative shrink-0">
                  {pf.type.startsWith("image") ? (
                    <img
                      src={pf.url}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-muted border border-border flex items-center justify-center">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <button
                    onClick={() => removePreview(i)}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Recording indicator */}
          {isRecording && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <span className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm text-destructive font-medium">
                جاري التسجيل... {formatTime(recordingTime)}
              </span>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Attachment buttons */}
            <div className="flex gap-1 shrink-0 pb-1">
              <input
                ref={mediaInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => mediaInputRef.current?.click()}
                className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                title="صور وفيديو"
              >
                <Image className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                title="ملفات"
              >
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Text input */}
            <div className="flex-1">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب رسالتك..."
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-xl h-11"
                disabled={isRecording}
              />
            </div>

            {/* Voice / Send */}
            <div className="flex gap-1 shrink-0 pb-1">
              <button
                onClick={toggleRecording}
                className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${
                  isRecording
                    ? "bg-destructive text-destructive-foreground"
                    : "hover:bg-muted"
                }`}
                title={isRecording ? "إيقاف التسجيل" : "تسجيل صوتي"}
              >
                {isRecording ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <Button
                onClick={sendMessage}
                disabled={!text.trim() && previewFiles.length === 0}
                size="icon"
                className="h-9 w-9 rounded-lg bg-primary text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineerChat;
