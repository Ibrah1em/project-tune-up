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

// Light mode base values [h, s, l]
const lightTokens: Record<string, [number, number, number]> = {
  "--background": [30, 20, 97],
  "--foreground": [225, 25, 12],
  "--card": [0, 0, 100],
  "--card-foreground": [225, 25, 12],
  "--popover": [0, 0, 100],
  "--popover-foreground": [225, 25, 12],
  "--primary": [190, 100, 38],
  "--primary-foreground": [0, 0, 100],
  "--primary-glow": [190, 100, 45],
  "--secondary": [265, 80, 55],
  "--secondary-foreground": [0, 0, 100],
  "--muted": [220, 14, 92],
  "--muted-foreground": [220, 10, 40],
  "--accent": [265, 60, 50],
  "--accent-foreground": [0, 0, 100],
  "--border": [220, 14, 88],
  "--input": [220, 14, 92],
  "--ring": [190, 100, 38],
  "--surface": [30, 20, 97],
  "--surface-low": [220, 14, 95],
  "--surface-mid": [220, 14, 92],
  "--surface-high": [220, 14, 88],
  "--sidebar-background": [0, 0, 100],
  "--sidebar-foreground": [225, 25, 12],
  "--sidebar-primary": [190, 100, 38],
  "--sidebar-border": [220, 14, 88],
};

function applyBrightnessTokens(brightness: number) {
  const root = document.documentElement;
  if (brightness >= 100) {
    // Reset to original values
    Object.entries(lightTokens).forEach(([prop, [h, s, l]]) => {
      root.style.setProperty(prop, `${h} ${s}% ${l}%`);
    });
  } else {
    Object.entries(lightTokens).forEach(([prop, [h, s, l]]) => {
      // Background tokens: darken by reducing lightness
      // Foreground tokens: lighten slightly for contrast on darker bg
      const isForeground = prop.includes("foreground");
      const factor = brightness / 100;

      if (isForeground) {
        // Foreground should remain readable — lighten as bg gets darker
        const newL = Math.min(95, l + (1 - factor) * 60);
        root.style.setProperty(prop, `${h} ${s}% ${newL.toFixed(1)}%`);
      } else {
        // Backgrounds get darker
        const newL = Math.max(5, l * factor);
        const newS = Math.max(0, s * (0.6 + 0.4 * factor));
        root.style.setProperty(prop, `${h} ${newS.toFixed(1)}% ${newL.toFixed(1)}%`);
      }
    });
  }
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
