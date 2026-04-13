import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ChevronDown, User, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/courses", label: "الدورات" },
    { to: "/projects", label: "المشاريع" },
    { to: "/consultations", label: "الاستشارات" },
    { to: "/sponsors", label: "رعاة المدرسة" },
    { to: "/profile", label: "صفحتي" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo - right side in RTL */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-primary-foreground font-display font-bold text-lg">&lt;/&gt;</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">Future Leaders</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-mid"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-mid transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">
                    {user?.firstName?.[0]}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{user?.firstName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {profileOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-surface-mid transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    ملفي الشخصي
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-surface-mid transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <BookOpen className="h-4 w-4" />
                    دوراتي
                  </Link>
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-surface-mid transition-colors w-full text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-foreground">تسجيل الدخول</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-lg">إنشاء حساب</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-surface-mid transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto px-6 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-surface-mid transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex gap-3 pt-3 border-t border-border">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">تسجيل الدخول</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-l from-primary to-secondary rounded-lg">إنشاء حساب</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
