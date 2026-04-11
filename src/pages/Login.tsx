import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, firstName: "أحمد", lastName: "محمد", username: "ahmed_m" });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-6 pt-20">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">&lt;/&gt;</span>
              </div>
            </Link>
          </div>

          <h1 className="font-display font-bold text-2xl text-center text-foreground mb-2">تسجيل الدخول</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">مرحباً بعودتك! سجّل دخولك للمتابعة</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label className="text-foreground mb-2 block">البريد الإلكتروني</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-left">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 text-base">
              تسجيل الدخول
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground">أو سجّل عبر</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full rounded-xl h-12 border-border text-foreground hover:bg-surface-mid gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              تسجيل الدخول عبر Google
            </Button>
            <Button variant="outline" className="w-full rounded-xl h-12 border-border text-foreground hover:bg-surface-mid gap-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              تسجيل الدخول عبر Facebook
            </Button>
            <Button variant="outline" className="w-full rounded-xl h-12 border-border text-foreground hover:bg-surface-mid gap-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              تسجيل الدخول عبر LinkedIn
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            ليس لديك حساب؟{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
