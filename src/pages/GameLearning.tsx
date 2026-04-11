import { useState, useRef, useCallback, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Square, RotateCcw, Flag, Trash2, ZoomIn, ZoomOut,
  Maximize2, Undo2, Redo2, Plus, Gamepad2, Globe, Eye, EyeOff,
  ArrowRight, ArrowLeft, ChevronDown, Rocket, X, GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import {
  Block, Sprite, Language,
} from "@/components/scratch/types";
import {
  CATEGORIES, BLOCK_TEMPLATES, SPRITE_LIBRARY, BACKDROP_LIBRARY,
  uid, cloneBlock,
} from "@/components/scratch/blockDefinitions";
import SpaceShooterGame from "@/components/scratch/SpaceShooterGame";

/* ═══════════════════ HELPERS ═══════════════════ */
const defaultSprite = (): Sprite => ({
  id: uid(), name: "شخصية 1", nameEn: "Sprite 1",
  emoji: "🐱", x: 240, y: 180, rotation: 0, scale: 1, visible: true,
  scripts: [], costumes: ["🐱"], currentCostume: 0,
});

/* ═══════════════════ SCRATCH BLOCK SHAPE ═══════════════════ */
const ScratchBlock = memo(({
  block, category, lang, onRemove, onValueChange, isDragging, onDragStart,
}: {
  block: Block;
  category: typeof CATEGORIES[0] | undefined;
  lang: Language;
  onRemove?: (id: string) => void;
  onValueChange?: (blockId: string, inputName: string, value: string | number) => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, block: Block) => void;
}) => {
  const color = category?.color || "#888";
  const darkerColor = `color-mix(in srgb, ${color} 80%, black)`;
  const label = lang === "ar" ? block.labelAr : block.label;

  return (
    <div
      draggable
      onDragStart={e => onDragStart?.(e, block)}
      className={`group relative select-none cursor-grab active:cursor-grabbing transition-transform ${isDragging ? "opacity-50 scale-95" : ""}`}
      style={{ marginBottom: 2 }}
    >
      {/* Scratch-style puzzle block */}
      <div
        className="relative rounded-md px-3 py-2 min-h-[40px] flex items-center gap-2 flex-wrap shadow-sm"
        style={{
          backgroundColor: color,
          borderLeft: `3px solid ${darkerColor}`,
          borderBottom: `2px solid ${darkerColor}`,
          color: "white",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {/* Top notch */}
        <div
          className="absolute top-0 rounded-b-sm"
          style={{
            left: lang === "ar" ? "auto" : 20,
            right: lang === "ar" ? 20 : "auto",
            width: 16, height: 4,
            backgroundColor: darkerColor,
          }}
        />

        {/* Grip handle */}
        <GripVertical className="h-3 w-3 opacity-50 flex-shrink-0" />

        {/* Render label with inline inputs */}
        {(() => {
          if (!block.inputs?.length) return <span>{label}</span>;
          const parts = label.split(/%\d/);
          const result: React.ReactNode[] = [];
          parts.forEach((part, i) => {
            if (part) result.push(<span key={`t${i}`}>{part}</span>);
            if (i < (block.inputs?.length || 0)) {
              const input = block.inputs![i];
              result.push(
                input.type === "dropdown" ? (
                  <select
                    key={input.name}
                    className="rounded px-1.5 py-0.5 text-xs font-bold border-0 outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "white", minWidth: 60 }}
                    value={block.values?.[input.name] ?? input.default}
                    onChange={e => { e.stopPropagation(); onValueChange?.(block.id, input.name, e.target.value); }}
                    onClick={e => e.stopPropagation()}
                  >
                    {input.options?.map(o => <option key={o} value={o} style={{ color: "#333" }}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    key={input.name}
                    type={input.type === "number" ? "number" : "text"}
                    className="rounded px-1.5 py-0.5 text-xs font-bold text-center border-0 outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#333",
                      width: input.type === "number" ? 48 : 80,
                    }}
                    value={block.values?.[input.name] ?? input.default}
                    onChange={e => {
                      e.stopPropagation();
                      onValueChange?.(block.id, input.name, input.type === "number" ? Number(e.target.value) : e.target.value);
                    }}
                    onClick={e => e.stopPropagation()}
                  />
                )
              );
            }
          });
          return result;
        })()}

        {/* Delete button */}
        {onRemove && (
          <button
            onClick={e => { e.stopPropagation(); onRemove(block.id); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-black/20 flex-shrink-0"
            style={{ marginInlineStart: "auto" }}
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* Bottom notch */}
        <div
          className="absolute bottom-[-4px] rounded-b-sm"
          style={{
            left: lang === "ar" ? "auto" : 20,
            right: lang === "ar" ? 20 : "auto",
            width: 16, height: 4,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
});
ScratchBlock.displayName = "ScratchBlock";

/* ═══════════════════ STAGE ═══════════════════ */
const Stage = memo(({
  sprites, isPlaying, stageColor, onSpriteMove, lang,
}: {
  sprites: Sprite[];
  isPlaying: boolean;
  stageColor: string;
  onSpriteMove: (idx: number, x: number, y: number) => void;
  lang: Language;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef<{ idx: number; offsetX: number; offsetY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 480, 360);
    ctx.fillStyle = stageColor;
    ctx.fillRect(0, 0, 480, 360);

    // Grid
    ctx.strokeStyle = "rgba(128,128,128,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 480; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke(); }
    for (let y = 0; y < 360; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(480, y); ctx.stroke(); }

    // Center crosshair
    ctx.strokeStyle = "rgba(128,128,128,0.15)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(240, 0); ctx.lineTo(240, 360); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 180); ctx.lineTo(480, 180); ctx.stroke();
    ctx.setLineDash([]);

    sprites.forEach(sprite => {
      if (!sprite.visible) return;
      ctx.save();
      ctx.translate(sprite.x, sprite.y);
      ctx.rotate((sprite.rotation * Math.PI) / 180);
      ctx.scale(sprite.scale, sprite.scale);

      // Draw emoji with 3D shadow effect
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.font = "48px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sprite.emoji, 0, 0);
      ctx.shadowColor = "transparent";

      // Say bubble
      if (sprite.sayText) {
        ctx.rotate(-(sprite.rotation * Math.PI) / 180);
        ctx.font = "bold 13px 'Cairo', sans-serif";
        const metrics = ctx.measureText(sprite.sayText);
        const w = Math.max(metrics.width + 24, 40);
        const h = 32;
        const bx = -w / 2;
        const by = -58;

        // Bubble
        ctx.fillStyle = "white";
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, w, h, 10);
        ctx.fill();
        ctx.stroke();
        // Tail
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(-4, by + h);
        ctx.lineTo(4, by + h);
        ctx.lineTo(0, by + h + 8);
        ctx.fill();
        ctx.strokeStyle = "#999";
        ctx.beginPath();
        ctx.moveTo(-4, by + h);
        ctx.lineTo(0, by + h + 8);
        ctx.lineTo(4, by + h);
        ctx.stroke();

        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(sprite.sayText, 0, by + h / 2 + 1);
      }
      ctx.restore();
    });

    // Playing indicator
    if (isPlaying) {
      ctx.fillStyle = "rgba(0,200,83,0.9)";
      ctx.beginPath();
      ctx.arc(16, 16, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [sprites, isPlaying, stageColor]);

  const getCanvasCoords = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = 480 / rect.width;
    const scaleY = 360 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoords(e);
    for (let i = sprites.length - 1; i >= 0; i--) {
      const s = sprites[i];
      if (!s.visible) continue;
      const dist = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);
      if (dist < 30 * s.scale) {
        draggingRef.current = { idx: i, offsetX: s.x - x, offsetY: s.y - y };
        break;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const { x, y } = getCanvasCoords(e);
    const { idx, offsetX, offsetY } = draggingRef.current;
    onSpriteMove(idx, Math.max(0, Math.min(480, x + offsetX)), Math.max(0, Math.min(360, y + offsetY)));
  };

  const handleMouseUp = () => { draggingRef.current = null; };

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        width={480}
        height={360}
        className="w-full h-full rounded-lg cursor-pointer"
        style={{ imageRendering: "auto" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
});
Stage.displayName = "Stage";

/* ═══════════════════ MAIN PAGE ═══════════════════ */
const GameLearning = () => {
  const [sprites, setSprites] = useState<Sprite[]>([defaultSprite()]);
  const [activeSprite, setActiveSprite] = useState(0);
  const [activeCategory, setActiveCategory] = useState("motion");
  const [isPlaying, setIsPlaying] = useState(false);
  const [stageColor, setStageColor] = useState("#ffffff");
  const [lang, setLang] = useState<Language>("ar");
  const [activeTab, setActiveTab] = useState<"code" | "costumes" | "sounds">("code");
  const [showSpriteSelector, setShowSpriteSelector] = useState(false);
  const [spriteFilterCat, setSpriteFilterCat] = useState("all");
  const [showBackdropSelector, setShowBackdropSelector] = useState(false);
  const [history, setHistory] = useState<Sprite[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [stageZoom, setStageZoom] = useState(1);
  const runningRef = useRef(false);
  const scriptAreaRef = useRef<HTMLDivElement>(null);

  const t = useCallback((ar: string, en: string) => lang === "ar" ? ar : en, [lang]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const saveHistory = useCallback(() => {
    const snap = JSON.parse(JSON.stringify(sprites));
    setHistory(h => [...h.slice(0, historyIndex + 1), snap]);
    setHistoryIndex(i => i + 1);
  }, [sprites, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setSprites(JSON.parse(JSON.stringify(history[historyIndex - 1])));
      setHistoryIndex(i => i - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setSprites(JSON.parse(JSON.stringify(history[historyIndex + 1])));
      setHistoryIndex(i => i + 1);
    }
  }, [history, historyIndex]);

  /* ─── Block Management ─── */
  const addBlockToScript = useCallback((template: Block) => {
    const newBlock = cloneBlock(template);
    newBlock.values = {};
    template.inputs?.forEach(i => { newBlock.values![i.name] = i.default; });
    setSprites(prev => {
      const next = [...prev];
      const s = { ...next[activeSprite] };
      const scripts = [...s.scripts];
      if (scripts.length === 0) scripts.push([]);
      scripts[0] = [...(scripts[0] || []), newBlock];
      s.scripts = scripts;
      next[activeSprite] = s;
      return next;
    });
    saveHistory();
  }, [activeSprite, saveHistory]);

  const removeBlock = useCallback((blockId: string) => {
    setSprites(prev => {
      const next = [...prev];
      const s = { ...next[activeSprite] };
      s.scripts = s.scripts.map(script => script.filter(b => b.id !== blockId));
      next[activeSprite] = s;
      return next;
    });
    saveHistory();
  }, [activeSprite, saveHistory]);

  const updateBlockValue = useCallback((blockId: string, inputName: string, value: string | number) => {
    setSprites(prev => {
      const next = [...prev];
      const s = { ...next[activeSprite] };
      s.scripts = s.scripts.map(script =>
        script.map(b => b.id === blockId ? { ...b, values: { ...(b.values || {}), [inputName]: value } } : b)
      );
      next[activeSprite] = s;
      return next;
    });
  }, [activeSprite]);

  /* ─── Drag & Drop ─── */
  const handlePaletteDragStart = useCallback((e: React.DragEvent, block: Block) => {
    e.dataTransfer.setData("application/json", JSON.stringify(block));
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleScriptDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleScriptDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    try {
      const blockData = JSON.parse(e.dataTransfer.getData("application/json")) as Block;
      addBlockToScript(blockData);
    } catch {}
  }, [addBlockToScript]);

  /* ─── Reorder blocks via drag ─── */
  const [dragBlockIdx, setDragBlockIdx] = useState<number | null>(null);

  const handleScriptBlockDragStart = useCallback((e: React.DragEvent, idx: number) => {
    setDragBlockIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  }, []);

  const handleScriptBlockDrop = useCallback((e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (dragBlockIdx === null || dragBlockIdx === dropIdx) return;
    setSprites(prev => {
      const next = [...prev];
      const s = { ...next[activeSprite] };
      const scripts = [...s.scripts];
      const script = [...(scripts[0] || [])];
      const [moved] = script.splice(dragBlockIdx, 1);
      script.splice(dropIdx, 0, moved);
      scripts[0] = script;
      s.scripts = scripts;
      next[activeSprite] = s;
      return next;
    });
    setDragBlockIdx(null);
    saveHistory();
  }, [dragBlockIdx, activeSprite, saveHistory]);

  /* ─── Sprite Management ─── */
  const addSprite = useCallback((emoji: string, nameAr: string, nameEn: string) => {
    const s: Sprite = {
      id: uid(), name: `${nameAr}`, nameEn,
      emoji, x: 240 + (Math.random() - 0.5) * 100, y: 180 + (Math.random() - 0.5) * 80,
      rotation: 0, scale: 1, visible: true, scripts: [],
      costumes: [emoji], currentCostume: 0,
    };
    setSprites(prev => [...prev, s]);
    setActiveSprite(sprites.length);
    saveHistory();
  }, [sprites.length, saveHistory]);

  const deleteSprite = useCallback((index: number) => {
    if (sprites.length <= 1) return;
    setSprites(prev => prev.filter((_, i) => i !== index));
    setActiveSprite(prev => Math.max(0, prev >= index ? prev - 1 : prev));
    saveHistory();
  }, [sprites.length, saveHistory]);

  const moveSprite = useCallback((idx: number, x: number, y: number) => {
    setSprites(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], x, y };
      return next;
    });
  }, []);

  /* ─── Execution Engine ─── */
  const executeBlock = useCallback(async (block: Block, sprite: Sprite, spriteIndex: number): Promise<void> => {
    if (!runningRef.current) return;
    const val = (name: string, fallback: number | string = 0) => block.values?.[name] ?? block.inputs?.find(i => i.name === name)?.default ?? fallback;
    const updateSprite = (updates: Partial<Sprite>) => {
      setSprites(prev => {
        const next = [...prev];
        next[spriteIndex] = { ...next[spriteIndex], ...updates };
        return next;
      });
    };

    switch (block.type) {
      case "move": {
        const steps = Number(val("steps", 10));
        const rad = (sprite.rotation * Math.PI) / 180;
        sprite.x += Math.cos(rad) * steps;
        sprite.y += Math.sin(rad) * steps;
        updateSprite({ x: sprite.x, y: sprite.y });
        break;
      }
      case "turn_right":
        sprite.rotation += Number(val("degrees", 15));
        updateSprite({ rotation: sprite.rotation });
        break;
      case "turn_left":
        sprite.rotation -= Number(val("degrees", 15));
        updateSprite({ rotation: sprite.rotation });
        break;
      case "goto_xy":
        sprite.x = Number(val("x", 0)) + 240;
        sprite.y = 180 - Number(val("y", 0));
        updateSprite({ x: sprite.x, y: sprite.y });
        break;
      case "goto_random":
        sprite.x = Math.random() * 480;
        sprite.y = Math.random() * 360;
        updateSprite({ x: sprite.x, y: sprite.y });
        break;
      case "set_x":
        sprite.x = Number(val("x", 0)) + 240;
        updateSprite({ x: sprite.x });
        break;
      case "set_y":
        sprite.y = 180 - Number(val("y", 0));
        updateSprite({ y: sprite.y });
        break;
      case "change_x":
        sprite.x += Number(val("dx", 10));
        updateSprite({ x: sprite.x });
        break;
      case "change_y":
        sprite.y -= Number(val("dy", 10));
        updateSprite({ y: sprite.y });
        break;
      case "set_rotation":
        sprite.rotation = Number(val("degrees", 90));
        updateSprite({ rotation: sprite.rotation });
        break;
      case "point_towards":
        break;
      case "bounce":
        if (sprite.x <= 24 || sprite.x >= 456) sprite.rotation = 180 - sprite.rotation;
        if (sprite.y <= 24 || sprite.y >= 336) sprite.rotation = -sprite.rotation;
        updateSprite({ rotation: sprite.rotation });
        break;
      case "glide": {
        const secs = Number(val("secs", 1));
        const tx = Number(val("x", 0)) + 240;
        const ty = 180 - Number(val("y", 0));
        const sx = sprite.x, sy = sprite.y;
        const steps = Math.max(1, Math.round(secs * 30));
        for (let i = 1; i <= steps && runningRef.current; i++) {
          sprite.x = sx + (tx - sx) * (i / steps);
          sprite.y = sy + (ty - sy) * (i / steps);
          updateSprite({ x: sprite.x, y: sprite.y });
          await new Promise(r => setTimeout(r, 1000 / 30));
        }
        break;
      }
      case "say":
        updateSprite({ sayText: String(val("message", "Hello!")) });
        sprite.sayText = String(val("message", "Hello!"));
        break;
      case "say_for": {
        const msg = String(val("message", "Hello!"));
        const secs = Number(val("secs", 2));
        updateSprite({ sayText: msg });
        await new Promise(r => setTimeout(r, secs * 1000));
        updateSprite({ sayText: undefined });
        break;
      }
      case "think":
        updateSprite({ sayText: `💭 ${val("message", "Hmm...")}` });
        break;
      case "show":
        updateSprite({ visible: true }); sprite.visible = true;
        break;
      case "hide":
        updateSprite({ visible: false }); sprite.visible = false;
        break;
      case "set_size":
        sprite.scale = Number(val("size", 100)) / 100;
        updateSprite({ scale: sprite.scale });
        break;
      case "change_size":
        sprite.scale += Number(val("change", 10)) / 100;
        updateSprite({ scale: sprite.scale });
        break;
      case "wait":
        await new Promise(r => setTimeout(r, Number(val("secs", 1)) * 1000));
        break;
      case "repeat": {
        // Simple repeat: re-execute previous blocks
        break;
      }
      case "play_sound": {
        const soundName = String(val("sound", "pop"));
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          const freqs: Record<string, number> = { pop: 600, meow: 800, beep: 440, drum: 200, bell: 1000 };
          osc.frequency.value = freqs[soundName] || 440;
          osc.type = soundName === "drum" ? "triangle" : soundName === "bell" ? "sine" : "square";
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch {}
        break;
      }
      case "stop":
        runningRef.current = false;
        break;
      default:
        break;
    }
    await new Promise(r => setTimeout(r, 50));
  }, []);

  const runScripts = useCallback(async () => {
    runningRef.current = true;
    setIsPlaying(true);
    const promises = sprites.map(async (sprite, idx) => {
      const localSprite = { ...sprite };
      for (const script of sprite.scripts) {
        for (const block of script) {
          if (!runningRef.current) return;
          await executeBlock(block, localSprite, idx);
        }
      }
    });
    await Promise.all(promises);
    runningRef.current = false;
    setIsPlaying(false);
  }, [sprites, executeBlock]);

  const stopScripts = useCallback(() => {
    runningRef.current = false;
    setIsPlaying(false);
  }, []);

  const resetSprites = useCallback(() => {
    stopScripts();
    setSprites(prev => prev.map(s => ({
      ...s, x: 240, y: 180, rotation: 0, scale: 1, visible: true, sayText: undefined,
    })));
  }, [stopScripts]);

  const currentSprite = sprites[activeSprite];
  const filteredBlocks = useMemo(() => BLOCK_TEMPLATES.filter(b => b.category === activeCategory), [activeCategory]);
  const currentCat = CATEGORIES.find(c => c.id === activeCategory);

  const filteredSpriteLib = useMemo(() => {
    if (spriteFilterCat === "all") return SPRITE_LIBRARY;
    return SPRITE_LIBRARY.filter(s => s.category === spriteFilterCat);
  }, [spriteFilterCat]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* ── Top Toolbar (Scratch-style) ── */}
      <div className="pt-16 sm:pt-20">
        <div className="border-b" style={{ backgroundColor: "hsl(var(--surface-low))", borderColor: "hsl(var(--border))" }}>
          <div className="container mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <h1 className="font-display font-bold text-sm sm:text-lg text-foreground">
                {t("بيئة البرمجة بالمكعبات", "Block Programming IDE")}
              </h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              {/* Language Toggle */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLang(l => l === "ar" ? "en" : "ar")}
                className="gap-1 text-xs"
              >
                <Globe className="h-3.5 w-3.5" />
                {lang === "ar" ? "EN" : "عربي"}
              </Button>

              <div className="w-px h-5 bg-border hidden sm:block" />

              <Button variant="ghost" size="icon" onClick={undo} title={t("تراجع", "Undo")} className="h-8 w-8">
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={redo} title={t("إعادة", "Redo")} className="h-8 w-8">
                <Redo2 className="h-4 w-4" />
              </Button>

              <div className="w-px h-5 bg-border hidden sm:block" />

              <Button
                size="sm"
                onClick={runScripts}
                disabled={isPlaying}
                className="gap-1.5 text-xs sm:text-sm"
                style={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">{t("تشغيل", "Run")}</span>
              </Button>
              <Button
                size="sm"
                onClick={stopScripts}
                disabled={!isPlaying}
                className="gap-1.5 text-xs sm:text-sm"
                style={{ backgroundColor: "#f44336", color: "white" }}
              >
                <Square className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("إيقاف", "Stop")}</span>
              </Button>
              <Button size="sm" variant="outline" onClick={resetSprites} className="gap-1.5 text-xs">
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t("إعادة ضبط", "Reset")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main IDE Layout ── */}
      <div className="flex flex-col lg:flex-row" style={{ height: "calc(100vh - 7rem)" }}>

        {/* ─ LEFT: Block Palette ─ */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-e flex flex-col overflow-hidden" style={{ borderColor: "hsl(var(--border))", backgroundColor: "hsl(var(--surface-low))" }}>
          {/* Category Buttons - vertical sidebar like Scratch */}
          <div className="flex lg:flex-col p-1.5 gap-1 overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-e" style={{ borderColor: "hsl(var(--border))" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : cat.bgColor,
                  color: activeCategory === cat.id ? "white" : cat.color,
                  boxShadow: activeCategory === cat.id ? `0 2px 8px ${cat.color}40` : "none",
                }}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: activeCategory === cat.id ? "rgba(255,255,255,0.4)" : cat.color }} />
                {lang === "ar" ? cat.labelAr : cat.label}
              </button>
            ))}
          </div>

          {/* Block List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0 max-h-[200px] lg:max-h-none">
            {filteredBlocks.map(block => (
              <ScratchBlock
                key={block.id}
                block={block}
                category={currentCat}
                lang={lang}
                onDragStart={handlePaletteDragStart}
              />
            ))}
          </div>
        </div>

        {/* ─ CENTER: Tabs + Script Area ─ */}
        <div className="flex-1 flex flex-col min-w-0 border-e" style={{ borderColor: "hsl(var(--border))" }}>
          {/* Tabs: Code / Costumes / Sounds */}
          <div className="flex items-center border-b px-2" style={{ backgroundColor: "hsl(var(--surface-mid))", borderColor: "hsl(var(--border))" }}>
            {[
              { id: "code" as const, icon: "💻", labelAr: "الكود", labelEn: "Code" },
              { id: "costumes" as const, icon: "🎨", labelAr: "المظاهر", labelEn: "Costumes" },
              { id: "sounds" as const, icon: "🔊", labelAr: "الأصوات", labelEn: "Sounds" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-all border-b-2"
                style={{
                  borderColor: activeTab === tab.id ? "hsl(var(--primary))" : "transparent",
                  color: activeTab === tab.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  backgroundColor: activeTab === tab.id ? "hsl(var(--background))" : "transparent",
                }}
              >
                <span>{tab.icon}</span>
                {lang === "ar" ? tab.labelAr : tab.labelEn}
              </button>
            ))}

            {/* Current sprite indicator */}
            <div className="flex items-center gap-2 px-3" style={{ marginInlineStart: "auto" }}>
              <span className="text-lg">{currentSprite?.emoji}</span>
              <span className="text-xs font-bold text-foreground">{lang === "ar" ? currentSprite?.name : currentSprite?.nameEn}</span>
            </div>
          </div>

          {/* Script/Costumes/Sounds Area */}
          <div
            ref={scriptAreaRef}
            className="flex-1 overflow-y-auto p-4 min-h-0"
            style={{
              backgroundColor: "hsl(var(--background))",
              backgroundImage: `
                linear-gradient(hsl(var(--border) / 0.15) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--border) / 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
            onDragOver={handleScriptDragOver}
            onDrop={handleScriptDrop}
          >
            {activeTab === "code" && (
              <>
                {currentSprite?.scripts[0]?.length ? (
                  <div className="space-y-0.5">
                    {currentSprite.scripts[0].map((block, idx) => (
                      <div
                        key={block.id}
                        onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={e => { e.stopPropagation(); handleScriptBlockDrop(e, idx); }}
                      >
                        <ScratchBlock
                          block={block}
                          category={CATEGORIES.find(c => c.id === block.category)}
                          lang={lang}
                          onRemove={removeBlock}
                          onValueChange={updateBlockValue}
                          onDragStart={(e) => handleScriptBlockDragStart(e, idx)}
                          isDragging={dragBlockIdx === idx}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <div className="text-6xl mb-4 opacity-20">🧩</div>
                    <p className="text-sm font-bold">{t("اسحب المكعبات هنا لبناء برنامجك", "Drag blocks here to build your program")}</p>
                    <p className="text-xs mt-1 opacity-60">{t("أو اضغط على أي مكعب من القائمة", "Or click any block from the palette")}</p>
                  </div>
                )}
              </>
            )}

            {activeTab === "costumes" && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">{currentSprite?.emoji}</div>
                <p className="text-sm text-muted-foreground font-bold">
                  {t("المظهر الحالي", "Current Costume")}: costume1
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {currentSprite?.costumes.map((c, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl border-2 cursor-pointer"
                      style={{
                        borderColor: i === currentSprite.currentCostume ? "hsl(var(--primary))" : "hsl(var(--border))",
                        backgroundColor: "hsl(var(--card))",
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "sounds" && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔊</div>
                <p className="text-sm text-muted-foreground font-bold">{t("الأصوات المتاحة", "Available Sounds")}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["pop", "meow", "beep", "drum", "bell"].map(sound => (
                    <button
                      key={sound}
                      onClick={() => {
                        try {
                          const ctx = new AudioContext();
                          const osc = ctx.createOscillator();
                          const gain = ctx.createGain();
                          osc.connect(gain);
                          gain.connect(ctx.destination);
                          const freqs: Record<string, number> = { pop: 600, meow: 800, beep: 440, drum: 200, bell: 1000 };
                          osc.frequency.value = freqs[sound] || 440;
                          gain.gain.setValueAtTime(0.3, ctx.currentTime);
                          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                          osc.start();
                          osc.stop(ctx.currentTime + 0.3);
                        } catch {}
                      }}
                      className="px-4 py-3 rounded-lg text-sm font-bold border cursor-pointer transition-all hover:scale-105"
                      style={{
                        borderColor: "hsl(var(--border))",
                        backgroundColor: "hsl(var(--card))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      🔊 {sound}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─ RIGHT: Stage + Sprite Panel ─ */}
        <div className="w-full lg:w-[420px] xl:w-[480px] flex flex-col min-h-0">
          {/* Stage Controls */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ backgroundColor: "hsl(var(--surface-mid))", borderColor: "hsl(var(--border))" }}>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                onClick={runScripts}
                disabled={isPlaying}
                className="h-7 w-7 p-0 rounded-full"
                style={{ backgroundColor: "#4CAF50" }}
              >
                <Flag className="h-3.5 w-3.5 text-white" />
              </Button>
              <Button
                size="sm"
                onClick={stopScripts}
                disabled={!isPlaying}
                className="h-7 w-7 p-0 rounded-full"
                style={{ backgroundColor: "#f44336" }}
              >
                <Square className="h-3 w-3 text-white" />
              </Button>
            </div>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStageZoom(z => Math.max(0.5, z - 0.25))}>
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground font-bold">{Math.round(stageZoom * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStageZoom(z => Math.min(2, z + 0.25))}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Stage Canvas */}
          <div className="p-2 sm:p-3" style={{ backgroundColor: "hsl(var(--surface-low))" }}>
            <div
              className="rounded-xl overflow-hidden border-2 shadow-lg mx-auto"
              style={{
                borderColor: "hsl(var(--border))",
                transform: `scale(${stageZoom})`,
                transformOrigin: "top center",
                maxWidth: "100%",
                aspectRatio: "4/3",
              }}
            >
              <Stage sprites={sprites} isPlaying={isPlaying} stageColor={stageColor} onSpriteMove={moveSprite} lang={lang} />
            </div>
          </div>

          {/* Sprite Properties Bar */}
          <div className="px-3 py-1.5 flex items-center gap-3 border-y text-xs flex-wrap" style={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-bold">{t("الشخصية", "Sprite")}</span>
              <input
                className="bg-transparent border rounded px-1.5 py-0.5 w-20 text-foreground text-xs"
                style={{ borderColor: "hsl(var(--border))" }}
                value={lang === "ar" ? currentSprite?.name : currentSprite?.nameEn}
                onChange={e => {
                  setSprites(prev => {
                    const next = [...prev];
                    if (lang === "ar") next[activeSprite] = { ...next[activeSprite], name: e.target.value };
                    else next[activeSprite] = { ...next[activeSprite], nameEn: e.target.value };
                    return next;
                  });
                }}
              />
            </div>
            <span className="text-muted-foreground">x: <b className="text-foreground">{Math.round((currentSprite?.x || 240) - 240)}</b></span>
            <span className="text-muted-foreground">y: <b className="text-foreground">{Math.round(180 - (currentSprite?.y || 180))}</b></span>
            <span className="text-muted-foreground">{t("الحجم", "Size")}: <b className="text-foreground">{Math.round((currentSprite?.scale || 1) * 100)}</b></span>
            <span className="text-muted-foreground">{t("الاتجاه", "Dir")}: <b className="text-foreground">{Math.round(currentSprite?.rotation || 0)}°</b></span>
            <button
              onClick={() => {
                setSprites(prev => {
                  const next = [...prev];
                  next[activeSprite] = { ...next[activeSprite], visible: !next[activeSprite].visible };
                  return next;
                });
              }}
              className="p-1"
            >
              {currentSprite?.visible ? <Eye className="h-3.5 w-3.5 text-primary" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          </div>

          {/* Sprite List */}
          <div className="flex-1 overflow-y-auto p-2 min-h-0" style={{ backgroundColor: "hsl(var(--background))" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-muted-foreground">{t("الشخصيات", "Sprites")} ({sprites.length})</span>
              <div className="flex gap-1">
                <Button
                  size="sm" variant="outline" className="text-xs gap-1 h-7"
                  onClick={() => setShowSpriteSelector(!showSpriteSelector)}
                >
                  <Plus className="h-3 w-3" />
                  {t("إضافة شخصية", "Add Sprite")}
                </Button>
                <Button
                  size="sm" variant="outline" className="text-xs gap-1 h-7"
                  onClick={() => setShowBackdropSelector(!showBackdropSelector)}
                >
                  🎭 {t("الخلفية", "Backdrop")}
                </Button>
              </div>
            </div>

            {/* Backdrop Selector */}
            <AnimatePresence>
              {showBackdropSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2 p-2 rounded-lg border"
                  style={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                >
                  <div className="grid grid-cols-5 gap-1.5">
                    {BACKDROP_LIBRARY.map(bd => (
                      <button
                        key={bd.id}
                        onClick={() => { setStageColor(bd.color); setShowBackdropSelector(false); }}
                        className="rounded-lg p-1.5 text-center text-[10px] font-bold border hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: bd.color,
                          borderColor: stageColor === bd.color ? "hsl(var(--primary))" : "transparent",
                          color: ["#ffffff", "#E8F4FD", "#F5DEB3", "#EDC9AF", "#87CEEB"].includes(bd.color) ? "#333" : "#fff",
                        }}
                      >
                        {lang === "ar" ? bd.nameAr : bd.nameEn}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sprite Selector */}
            <AnimatePresence>
              {showSpriteSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2 p-2 rounded-lg border"
                  style={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                >
                  {/* Category filter */}
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {[
                      { id: "all", labelAr: "الكل", labelEn: "All" },
                      { id: "animals", labelAr: "حيوانات", labelEn: "Animals" },
                      { id: "people", labelAr: "أشخاص", labelEn: "People" },
                      { id: "fantasy", labelAr: "خيال", labelEn: "Fantasy" },
                      { id: "objects", labelAr: "أشياء", labelEn: "Objects" },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSpriteFilterCat(cat.id)}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold transition-all"
                        style={{
                          backgroundColor: spriteFilterCat === cat.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                          color: spriteFilterCat === cat.id ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {lang === "ar" ? cat.labelAr : cat.labelEn}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-6 gap-1 max-h-32 overflow-y-auto">
                    {filteredSpriteLib.map(s => (
                      <button
                        key={s.emoji}
                        onClick={() => { addSprite(s.emoji, s.nameAr, s.nameEn); setShowSpriteSelector(false); }}
                        className="text-2xl p-1.5 rounded-lg hover:scale-110 transition-transform flex flex-col items-center"
                        style={{ backgroundColor: "hsl(var(--muted))" }}
                        title={lang === "ar" ? s.nameAr : s.nameEn}
                      >
                        {s.emoji}
                        <span className="text-[8px] text-muted-foreground font-bold mt-0.5">{lang === "ar" ? s.nameAr : s.nameEn}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sprite Grid */}
            <div className="grid grid-cols-4 gap-1.5">
              {sprites.map((sprite, idx) => (
                <motion.div
                  key={sprite.id}
                  layout
                  onClick={() => setActiveSprite(idx)}
                  className="group relative p-2 rounded-lg border-2 cursor-pointer transition-all text-center"
                  style={{
                    borderColor: idx === activeSprite ? "hsl(var(--primary))" : "hsl(var(--border))",
                    backgroundColor: idx === activeSprite ? "hsl(var(--primary) / 0.1)" : "hsl(var(--card))",
                  }}
                >
                  <span className="text-2xl block mb-0.5" style={{ filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.2))" }}>{sprite.emoji}</span>
                  <span className="text-[9px] font-bold text-foreground block truncate">{lang === "ar" ? sprite.name : sprite.nameEn}</span>
                  {sprites.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); deleteSprite(idx); }}
                      className="absolute -top-1 rounded-full p-0.5 transition-opacity opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: "hsl(var(--destructive))", color: "white", insetInlineEnd: -4 }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Space Shooter Game Section ── */}
      <div className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
        <SpaceShooterGame lang={lang} t={t} />
      </div>

      <Footer />
    </div>
  );
};

export default GameLearning;
