import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-6 pt-20">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
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

          {!submitted ? (
            <>
              <h1 className="font-display font-bold text-2xl text-center text-foreground mb-2">نسيت كلمة المرور؟</h1>
              <p className="text-center text-muted-foreground text-sm mb-8">
                أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label className="text-foreground mb-2 block">البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                    dir="ltr"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl h-12 text-base">
                  طلب رابط إعادة التعيين
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">تم إرسال الرابط!</h2>
              <p className="text-muted-foreground text-sm mb-2">
                إذا كان هذا البريد مسجلاً لدينا، ستتلقى رابط إعادة التعيين خلال دقائق.
              </p>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowRight className="h-4 w-4" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
