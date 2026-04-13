import { useState } from "react";
import { Link } from "react-router-dom";
import { User, BookOpen, MessageSquare, LogOut, Send, Award, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "@/hooks/use-toast";

// بيانات وهمية للعرض
const demoUser = {
  firstName: "أحمد",
  lastName: "محمد",
  username: "ahmed_m",
  email: "ahmed@example.com",
  bio: "طالب في مدرسة قادة المستقبل، مهتم بالبرمجة وتطوير الويب والذكاء الاصطناعي.",
  joinDate: "يناير 2024",
  coursesCount: 3,
  certificatesCount: 1,
  messagesCount: 5,
};

const demoCourses = [
  { id: 1, title: "أساسيات البرمجة بلغة Python", progress: 75, image: "🐍" },
  { id: 2, title: "تطوير مواقع الويب - HTML & CSS", progress: 100, image: "🌐" },
  { id: 3, title: "مقدمة في الذكاء الاصطناعي", progress: 30, image: "🤖" },
];

const demoMessages = [
  { id: 1, text: "المدرسة دي غيرت حياتي! اتعلمت حاجات كتير جداً.", date: "منذ 3 أيام", status: "معتمدة" },
  { id: 2, text: "المهندسين هنا بجد محترمين وبيساعدوا جداً.", date: "منذ أسبوع", status: "قيد المراجعة" },
];

const Profile = () => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

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
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-4xl text-primary-foreground">{demoUser.firstName[0]}</span>
              </div>
              <div className="text-center md:text-right flex-1">
                <h2 className="font-display font-bold text-2xl text-foreground mb-1">{demoUser.firstName} {demoUser.lastName}</h2>
                <p className="text-muted-foreground mb-1">@{demoUser.username}</p>
                <p className="text-muted-foreground text-sm mb-3">{demoUser.email}</p>
                <p className="text-sm text-foreground/80">{demoUser.bio}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "الدورات", value: demoUser.coursesCount, icon: "📚" },
              { label: "الشهادات", value: demoUser.certificatesCount, icon: "🏆" },
              { label: "الرسائل", value: demoUser.messagesCount, icon: "💬" },
              { label: "تاريخ الانضمام", value: demoUser.joinDate, icon: "📅" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-4 text-center">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "courses",
      icon: <BookOpen className="h-5 w-5" />,
      label: "دوراتي",
      content: (
        <div className="space-y-4">
          {demoCourses.map((course) => (
            <div key={course.id} className="bg-card rounded-2xl border border-border p-6 flex items-center gap-4">
              <span className="text-4xl">{course.image}</span>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground mb-2">{course.title}</h3>
                <div className="w-full bg-surface-mid rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-l from-primary to-secondary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{course.progress}% مكتمل</span>
                  {course.progress === 100 && <span className="text-xs text-green-500 font-medium">✅ مكتمل</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "certificates",
      icon: <Award className="h-5 w-5" />,
      label: "شهاداتي",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-foreground mb-1">شهادة إتمام دورة تطوير الويب</h3>
            <p className="text-muted-foreground text-sm">تم الحصول عليها في فبراير 2024</p>
            <Button className="mt-4 bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl" size="sm">
              تحميل الشهادة
            </Button>
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
        <div className="space-y-4">
          {demoMessages.map((msg) => (
            <div key={msg.id} className="bg-card rounded-2xl border border-border p-6">
              <p className="text-foreground mb-3">{msg.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{msg.date}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  msg.status === "معتمدة" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "notifications",
      icon: <Bell className="h-5 w-5" />,
      label: "الإشعارات",
      content: (
        <div className="space-y-3">
          {[
            { text: "تم قبول رسالتك على الصفحة الرئيسية", time: "منذ ساعة", read: false },
            { text: "أكملت 75% من دورة Python", time: "منذ يومين", read: true },
            { text: "مرحباً بك في مدرسة قادة المستقبل!", time: "منذ شهر", read: true },
          ].map((notif, i) => (
            <div key={i} className={`bg-card rounded-xl border p-4 flex items-center gap-3 ${!notif.read ? "border-primary/50 bg-primary/5" : "border-border"}`}>
              <div className={`h-2 w-2 rounded-full shrink-0 ${!notif.read ? "bg-primary" : "bg-muted"}`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">{notif.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "settings",
      icon: <Settings className="h-5 w-5" />,
      label: "الإعدادات",
      content: (
        <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">الاسم الأول</label>
            <input defaultValue={demoUser.firstName} className="w-full rounded-xl bg-surface-mid border border-border p-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">الاسم الأخير</label>
            <input defaultValue={demoUser.lastName} className="w-full rounded-xl bg-surface-mid border border-border p-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">النبذة</label>
            <textarea defaultValue={demoUser.bio} className="w-full h-24 rounded-xl bg-surface-mid border border-border p-3 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <Button className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl">حفظ التعديلات</Button>
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full ${
                    activeTab === tab.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-mid"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
                <LogOut className="h-5 w-5" />
                تسجيل الخروج
              </button>
            </div>
          </div>
          <div className="lg:col-span-3">
            {tabs.map((tab) => (
              activeTab === tab.id && (
                <ScrollReveal key={tab.id}>
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-3">{tab.icon}{tab.label}</h2>
                    {tab.content}
                  </div>
                </ScrollReveal>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;