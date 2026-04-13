import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { User, BookOpen, MessageSquare, LogOut, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [message, setMessage] = useState("");

  // TODO: re-enable auth guard after backend is ready
  // if (!isLoggedIn) return <Navigate to="/login" />;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast({ title: "تم إرسال رسالتك!", description: "ستظهر رسالتك على الصفحة الرئيسية بعد المراجعة." });
    setMessage("");
  };

  const tabs = [
    {
      id: "profile",
      icon: <User className="h-5 w-5" />,
      label: "الملف الشخصي",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-4xl text-primary-foreground">{user?.firstName?.[0]}</span>
            </div>
            <div className="text-center md:text-right">
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">{user?.firstName} {user?.lastName}</h2>
              <p className="text-muted-foreground mb-1">@{user?.username}</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "write-message",
      icon: <Send className="h-5 w-5" />,
      label: "اكتب رسالة",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8">
          <p className="text-muted-foreground text-sm mb-4">شاركنا تجربتك مع المدرسة! رسالتك ستظهر على الصفحة الرئيسية ليراها الجميع.</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="w-full h-32 rounded-xl bg-surface-mid border border-border p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm"
          />
          <Button onClick={handleSendMessage} className="mt-4 bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl">
            <Send className="h-4 w-4 ml-2" />
            إرسال الرسالة
          </Button>
        </div>
      ),
    },
    {
      id: "messages",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "رسائلي",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لا توجد رسائل حالياً</p>
        </div>
      ),
    },
    {
      id: "courses",
      icon: <BookOpen className="h-5 w-5" />,
      label: "دوراتي",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">لم تشترك في أي دورة بعد</p>
          <Link to="/courses">
            <Button className="mt-4 bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl">تصفح الدورات</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h1 className="font-display font-bold text-3xl text-foreground mb-8">حسابي</h1>
        </ScrollReveal>
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-4 space-y-1 sticky top-24">
              {tabs.map((tab) => (
                <a key={tab.id} href={`#${tab.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-mid transition-colors">
                  {tab.icon}
                  {tab.label}
                </a>
              ))}
              <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
                <LogOut className="h-5 w-5" />
                تسجيل الخروج
              </button>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            {tabs.map((tab, i) => (
              <ScrollReveal key={tab.id} delay={i * 0.1}>
                <div id={tab.id}>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-3">{tab.icon}{tab.label}</h2>
                  {tab.content}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
