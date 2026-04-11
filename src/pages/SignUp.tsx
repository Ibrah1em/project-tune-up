import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "", username: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email: form.email, firstName: form.firstName, lastName: form.lastName, username: form.username });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-6 pt-20 pb-12">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">&lt;/&gt;</span>
              </div>
            </Link>
          </div>

          <h1 className="font-display font-bold text-2xl text-center text-foreground mb-2">إنشاء حساب</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">انضم إلينا وابدأ رحلتك التعليمية</p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label className="text-foreground mb-2 block">البريد الإلكتروني</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="example@email.com"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                dir="ltr"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">كلمة المرور</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 pl-12"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground mb-2 block">الاسم الأول</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="أحمد"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2 block">الاسم الأخير</Label>
                <Input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="محمد"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
              </div>
            </div>
            <div>
              <Label className="text-foreground mb-2 block">اسم المستخدم</Label>
              <Input
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                placeholder="ahmed_mohamed"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                dir="ltr"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 text-base mt-2">
              إنشاء حساب
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
