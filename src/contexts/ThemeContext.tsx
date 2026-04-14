import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  brightness: number;
  setBrightness: (v: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {}, brightness: 100, setBrightness: () => {} });

export const useTheme = () => useContext(ThemeContext);

// Interpolate HSL values based on brightness
function interpolateHSL(h: number, s: number, l: number, brightness: number): string {
  // As brightness decreases: lower lightness, slightly desaturate
  const factor = brightness / 100;
  const newL = Math.max(5, l * factor);
  const newS = Math.max(0, s * (0.5 + 0.5 * factor));
  return `${h} ${newS.toFixed(1)}% ${newL.toFixed(1)}%`;
}

// Light mode base values [h, s, l] with type: "bg" | "fg" | "accent"
const lightTokens: Record<string, { hsl: [number, number, number]; kind: "bg" | "fg" | "accent" }> = {
  "--background": { hsl: [30, 20, 97], kind: "bg" },
  "--foreground": { hsl: [225, 25, 12], kind: "fg" },
  "--card": { hsl: [0, 0, 100], kind: "bg" },
  "--card-foreground": { hsl: [225, 25, 12], kind: "fg" },
  "--popover": { hsl: [0, 0, 100], kind: "bg" },
  "--popover-foreground": { hsl: [225, 25, 12], kind: "fg" },
  "--primary": { hsl: [190, 100, 38], kind: "accent" },
  "--primary-foreground": { hsl: [0, 0, 100], kind: "fg" },
  "--primary-glow": { hsl: [190, 100, 45], kind: "accent" },
  "--secondary": { hsl: [265, 80, 55], kind: "accent" },
  "--secondary-foreground": { hsl: [0, 0, 100], kind: "fg" },
  "--muted": { hsl: [220, 14, 92], kind: "bg" },
  "--muted-foreground": { hsl: [220, 10, 40], kind: "fg" },
  "--accent": { hsl: [265, 60, 50], kind: "accent" },
  "--accent-foreground": { hsl: [0, 0, 100], kind: "fg" },
  "--border": { hsl: [220, 14, 88], kind: "bg" },
  "--input": { hsl: [220, 14, 92], kind: "bg" },
  "--ring": { hsl: [190, 100, 38], kind: "accent" },
  "--surface": { hsl: [30, 20, 97], kind: "bg" },
  "--surface-low": { hsl: [220, 14, 95], kind: "bg" },
  "--surface-mid": { hsl: [220, 14, 92], kind: "bg" },
  "--surface-high": { hsl: [220, 14, 88], kind: "bg" },
  "--sidebar-background": { hsl: [0, 0, 100], kind: "bg" },
  "--sidebar-foreground": { hsl: [225, 25, 12], kind: "fg" },
  "--sidebar-primary": { hsl: [190, 100, 38], kind: "accent" },
  "--sidebar-border": { hsl: [220, 14, 88], kind: "bg" },
};

function applyBrightnessTokens(brightness: number) {
  const root = document.documentElement;
  const factor = brightness / 100;

  Object.entries(lightTokens).forEach(([prop, { hsl: [h, s, l], kind }]) => {
    if (brightness >= 100) {
      root.style.setProperty(prop, `${h} ${s}% ${l}%`);
      return;
    }

    if (kind === "bg") {
      // Backgrounds get darker
      const newL = Math.max(5, l * factor);
      const newS = Math.max(0, s * (0.6 + 0.4 * factor));
      root.style.setProperty(prop, `${h} ${newS.toFixed(1)}% ${newL.toFixed(1)}%`);
    } else if (kind === "fg") {
      // Text: ensure strong contrast against darkened backgrounds
      // When bg darkens, text must get lighter
      const bgBrightness = 97 * factor; // approximate background lightness
      if (bgBrightness < 50) {
        // Dark bg → light text
        const newL = Math.min(95, 90 + (1 - factor) * 5);
        root.style.setProperty(prop, `${h} ${s}% ${newL.toFixed(1)}%`);
      } else {
        // Still light enough bg → keep dark text but adjust slightly
        const newL = Math.max(8, l * (0.7 + 0.3 * factor));
        root.style.setProperty(prop, `${h} ${s}% ${newL.toFixed(1)}%`);
      }
    } else {
      // Accent colors: keep vibrant, just slightly adjust lightness
      const newL = Math.max(30, Math.min(65, l * (0.8 + 0.2 * factor)));
      root.style.setProperty(prop, `${h} ${s}% ${newL.toFixed(1)}%`);
    }
  });
}

function clearBrightnessTokens() {
  const root = document.documentElement;
  Object.keys(lightTokens).forEach((prop) => {
    root.style.removeProperty(prop);
  });
  root.style.filter = "";
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme;
    return saved === "light" ? "light" : "dark";
  });

  const [brightness, setBrightness] = useState<number>(() => {
    const saved = localStorage.getItem("brightness");
    return saved ? Number(saved) : 100;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.style.filter = "";
      applyBrightnessTokens(brightness);
    } else {
      root.classList.remove("light");
      clearBrightnessTokens();
    }
    localStorage.setItem("theme", theme);
  }, [theme, brightness]);

  useEffect(() => {
    localStorage.setItem("brightness", String(brightness));
  }, [brightness]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, brightness, setBrightness }}>
      {children}
    </ThemeContext.Provider>
  );
};
