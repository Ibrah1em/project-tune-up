import { Moon, Sun, SunDim } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme, brightness, setBrightness } = useTheme();
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target as Node)) {
        setShowSlider(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-1 relative">
      <button
        onClick={toggleTheme}
        className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-surface-mid transition-colors"
        aria-label="تبديل الوضع"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
      </button>

      {theme === "light" && (
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-surface-mid transition-colors"
          aria-label="التحكم بالسطوع"
        >
          <SunDim className="h-5 w-5 text-foreground" />
        </button>
      )}

      {showSlider && theme === "light" && (
        <div
          ref={sliderRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-card border border-border rounded-xl p-4 shadow-lg z-50 w-48"
        >
          <p className="text-xs text-muted-foreground mb-3 text-center">السطوع</p>
          <Slider
            value={[brightness]}
            onValueChange={([v]) => setBrightness(v)}
            min={60}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">{brightness}%</p>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
