import { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Square, RotateCcw, Flag, Trash2, Copy, ZoomIn, ZoomOut,
  Maximize2, ChevronDown, ChevronRight, Undo2, Redo2, Save,
  Upload, Download, Plus, Minus, Settings, HelpCircle, Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

/* ═══════════════════ TYPES ═══════════════════ */
interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  labelAr: string;
  inputs?: { name: string; type: "number" | "string" | "dropdown"; default: string | number; options?: string[] }[];
  values?: Record<string, string | number>;
  children?: Block[];
  next?: Block[];
}

interface Sprite {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  visible: boolean;
  scripts: Block[][];
  costumes: string[];
  currentCostume: number;
  sayText?: string;
}

/* ═══════════════════ BLOCK DEFINITIONS ═══════════════════ */
const CATEGORIES = [
  { id: "motion", labelAr: "الحركة", color: "from-blue-500 to-blue-600", bg: "bg-blue-500/20", border: "border-blue-500/40", text: "text-blue-400" },
  { id: "looks", labelAr: "المظهر", color: "from-purple-500 to-purple-600", bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-400" },
  { id: "sound", labelAr: "الصوت", color: "from-pink-500 to-pink-600", bg: "bg-pink-500/20", border: "border-pink-500/40", text: "text-pink-400" },
  { id: "events", labelAr: "الأحداث", color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-500/20", border: "border-yellow-500/40", text: "text-yellow-400" },
  { id: "control", labelAr: "التحكم", color: "from-orange-500 to-orange-600", bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-400" },
  { id: "sensing", labelAr: "الاستشعار", color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-500/20", border: "border-cyan-500/40", text: "text-cyan-400" },
  { id: "operators", labelAr: "العمليات", color: "from-green-500 to-green-600", bg: "bg-green-500/20", border: "border-green-500/40", text: "text-green-400" },
  { id: "variables", labelAr: "المتغيرات", color: "from-red-500 to-red-600", bg: "bg-red-500/20", border: "border-red-500/40", text: "text-red-400" },
];

const BLOCK_TEMPLATES: Block[] = [
  // Motion
  { id: "move", type: "move", category: "motion", label: "Move steps", labelAr: "تحرك خطوات", inputs: [{ name: "steps", type: "number", default: 10 }] },
  { id: "turn_right", type: "turn_right", category: "motion", label: "Turn right", labelAr: "استدر لليمين", inputs: [{ name: "degrees", type: "number", default: 15 }] },
  { id: "turn_left", type: "turn_left", category: "motion", label: "Turn left", labelAr: "استدر لليسار", inputs: [{ name: "degrees", type: "number", default: 15 }] },
  { id: "goto_xy", type: "goto_xy", category: "motion", label: "Go to x y", labelAr: "اذهب إلى x y", inputs: [{ name: "x", type: "number", default: 0 }, { name: "y", type: "number", default: 0 }] },
  { id: "glide", type: "glide", category: "motion", label: "Glide to x y", labelAr: "انزلق إلى x y", inputs: [{ name: "secs", type: "number", default: 1 }, { name: "x", type: "number", default: 0 }, { name: "y", type: "number", default: 0 }] },
  { id: "set_x", type: "set_x", category: "motion", label: "Set x to", labelAr: "اجعل x =", inputs: [{ name: "x", type: "number", default: 0 }] },
  { id: "set_y", type: "set_y", category: "motion", label: "Set y to", labelAr: "اجعل y =", inputs: [{ name: "y", type: "number", default: 0 }] },
  { id: "change_x", type: "change_x", category: "motion", label: "Change x by", labelAr: "غيّر x بمقدار", inputs: [{ name: "dx", type: "number", default: 10 }] },
  { id: "change_y", type: "change_y", category: "motion", label: "Change y by", labelAr: "غيّر y بمقدار", inputs: [{ name: "dy", type: "number", default: 10 }] },
  { id: "bounce", type: "bounce", category: "motion", label: "If on edge, bounce", labelAr: "إذا لمست الحافة، ارتد" },
  { id: "set_rotation", type: "set_rotation", category: "motion", label: "Point in direction", labelAr: "اتجه نحو", inputs: [{ name: "degrees", type: "number", default: 90 }] },
  // Looks
  { id: "say", type: "say", category: "looks", label: "Say", labelAr: "قل", inputs: [{ name: "message", type: "string", default: "مرحباً!" }] },
  { id: "say_for", type: "say_for", category: "looks", label: "Say for secs", labelAr: "قل لمدة", inputs: [{ name: "message", type: "string", default: "مرحباً!" }, { name: "secs", type: "number", default: 2 }] },
  { id: "think", type: "think", category: "looks", label: "Think", labelAr: "فكّر", inputs: [{ name: "message", type: "string", default: "همم..." }] },
  { id: "show", type: "show", category: "looks", label: "Show", labelAr: "أظهر" },
  { id: "hide", type: "hide", category: "looks", label: "Hide", labelAr: "أخفِ" },
  { id: "set_size", type: "set_size", category: "looks", label: "Set size to %", labelAr: "اجعل الحجم %", inputs: [{ name: "size", type: "number", default: 100 }] },
  { id: "change_size", type: "change_size", category: "looks", label: "Change size by", labelAr: "غيّر الحجم بمقدار", inputs: [{ name: "change", type: "number", default: 10 }] },
  { id: "next_costume", type: "next_costume", category: "looks", label: "Next costume", labelAr: "المظهر التالي" },
  { id: "set_effect", type: "set_effect", category: "looks", label: "Set effect", labelAr: "اضبط التأثير", inputs: [{ name: "effect", type: "dropdown", default: "color", options: ["color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost"] }, { name: "value", type: "number", default: 0 }] },
  // Sound
  { id: "play_sound", type: "play_sound", category: "sound", label: "Play sound", labelAr: "شغّل صوت", inputs: [{ name: "sound", type: "dropdown", default: "pop", options: ["pop", "meow", "beep", "drum", "bell"] }] },
  { id: "stop_sounds", type: "stop_sounds", category: "sound", label: "Stop all sounds", labelAr: "أوقف كل الأصوات" },
  { id: "change_volume", type: "change_volume", category: "sound", label: "Change volume by", labelAr: "غيّر مستوى الصوت بمقدار", inputs: [{ name: "vol", type: "number", default: -10 }] },
  { id: "set_volume", type: "set_volume", category: "sound", label: "Set volume to %", labelAr: "اضبط مستوى الصوت %", inputs: [{ name: "vol", type: "number", default: 100 }] },
  // Events
  { id: "when_flag", type: "when_flag", category: "events", label: "When flag clicked", labelAr: "عند النقر على العلم 🟢" },
  { id: "when_key", type: "when_key", category: "events", label: "When key pressed", labelAr: "عند الضغط على مفتاح", inputs: [{ name: "key", type: "dropdown", default: "space", options: ["space", "up arrow", "down arrow", "left arrow", "right arrow", "a", "b", "c", "d", "w", "s"] }] },
  { id: "when_clicked", type: "when_clicked", category: "events", label: "When sprite clicked", labelAr: "عند النقر على الشخصية" },
  { id: "broadcast", type: "broadcast", category: "events", label: "Broadcast", labelAr: "أرسل رسالة", inputs: [{ name: "msg", type: "string", default: "message1" }] },
  { id: "when_receive", type: "when_receive", category: "events", label: "When I receive", labelAr: "عندما أستقبل", inputs: [{ name: "msg", type: "string", default: "message1" }] },
  // Control
  { id: "wait", type: "wait", category: "control", label: "Wait secs", labelAr: "انتظر ثواني", inputs: [{ name: "secs", type: "number", default: 1 }] },
  { id: "repeat", type: "repeat", category: "control", label: "Repeat", labelAr: "كرر", inputs: [{ name: "times", type: "number", default: 10 }] },
  { id: "forever", type: "forever", category: "control", label: "Forever", labelAr: "للأبد" },
  { id: "if", type: "if", category: "control", label: "If then", labelAr: "إذا ... فنفذ" },
  { id: "if_else", type: "if_else", category: "control", label: "If else", labelAr: "إذا ... وإلا" },
  { id: "wait_until", type: "wait_until", category: "control", label: "Wait until", labelAr: "انتظر حتى" },
  { id: "repeat_until", type: "repeat_until", category: "control", label: "Repeat until", labelAr: "كرر حتى" },
  { id: "stop", type: "stop", category: "control", label: "Stop all", labelAr: "أوقف الكل" },
  { id: "clone", type: "clone", category: "control", label: "Create clone", labelAr: "أنشئ نسخة" },
  { id: "delete_clone", type: "delete_clone", category: "control", label: "Delete this clone", labelAr: "احذف هذه النسخة" },
  // Sensing
  { id: "touching", type: "touching", category: "sensing", label: "Touching?", labelAr: "هل يلمس؟", inputs: [{ name: "target", type: "dropdown", default: "edge", options: ["edge", "mouse", "sprite"] }] },
  { id: "touching_color", type: "touching_color", category: "sensing", label: "Touching color?", labelAr: "هل يلمس اللون؟" },
  { id: "ask", type: "ask", category: "sensing", label: "Ask and wait", labelAr: "اسأل وانتظر", inputs: [{ name: "question", type: "string", default: "ما اسمك؟" }] },
  { id: "mouse_x", type: "mouse_x", category: "sensing", label: "Mouse x", labelAr: "موقع الفأرة x" },
  { id: "mouse_y", type: "mouse_y", category: "sensing", label: "Mouse y", labelAr: "موقع الفأرة y" },
  { id: "key_pressed", type: "key_pressed", category: "sensing", label: "Key pressed?", labelAr: "هل المفتاح مضغوط؟", inputs: [{ name: "key", type: "dropdown", default: "space", options: ["space", "up arrow", "down arrow", "left arrow", "right arrow"] }] },
  { id: "timer", type: "timer", category: "sensing", label: "Timer", labelAr: "المؤقت" },
  { id: "reset_timer", type: "reset_timer", category: "sensing", label: "Reset timer", labelAr: "أعد ضبط المؤقت" },
  // Operators
  { id: "add", type: "add", category: "operators", label: "Add", labelAr: "جمع", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "subtract", type: "subtract", category: "operators", label: "Subtract", labelAr: "طرح", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "multiply", type: "multiply", category: "operators", label: "Multiply", labelAr: "ضرب", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "divide", type: "divide", category: "operators", label: "Divide", labelAr: "قسمة", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 1 }] },
  { id: "random", type: "random", category: "operators", label: "Pick random", labelAr: "اختر عشوائي", inputs: [{ name: "from", type: "number", default: 1 }, { name: "to", type: "number", default: 10 }] },
  { id: "gt", type: "gt", category: "operators", label: "Greater than", labelAr: "أكبر من", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 50 }] },
  { id: "lt", type: "lt", category: "operators", label: "Less than", labelAr: "أصغر من", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 50 }] },
  { id: "eq", type: "eq", category: "operators", label: "Equals", labelAr: "يساوي", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "and", type: "and", category: "operators", label: "And", labelAr: "و" },
  { id: "or", type: "or", category: "operators", label: "Or", labelAr: "أو" },
  { id: "not", type: "not", category: "operators", label: "Not", labelAr: "ليس" },
  { id: "join", type: "join", category: "operators", label: "Join", labelAr: "اربط", inputs: [{ name: "a", type: "string", default: "مرحباً" }, { name: "b", type: "string", default: " بالعالم" }] },
  { id: "mod", type: "mod", category: "operators", label: "Mod", labelAr: "باقي القسمة", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 1 }] },
  { id: "round", type: "round", category: "operators", label: "Round", labelAr: "تقريب", inputs: [{ name: "n", type: "number", default: 0 }] },
  { id: "abs", type: "abs", category: "operators", label: "Abs", labelAr: "القيمة المطلقة", inputs: [{ name: "n", type: "number", default: 0 }] },
  // Variables
  { id: "set_var", type: "set_var", category: "variables", label: "Set variable", labelAr: "اجعل المتغير =", inputs: [{ name: "name", type: "string", default: "نقاط" }, { name: "value", type: "number", default: 0 }] },
  { id: "change_var", type: "change_var", category: "variables", label: "Change variable", labelAr: "غيّر المتغير بمقدار", inputs: [{ name: "name", type: "string", default: "نقاط" }, { name: "value", type: "number", default: 1 }] },
  { id: "show_var", type: "show_var", category: "variables", label: "Show variable", labelAr: "أظهر المتغير", inputs: [{ name: "name", type: "string", default: "نقاط" }] },
  { id: "hide_var", type: "hide_var", category: "variables", label: "Hide variable", labelAr: "أخفِ المتغير", inputs: [{ name: "name", type: "string", default: "نقاط" }] },
];

const SPRITE_EMOJIS = ["🐱", "🐶", "🦊", "🐸", "🐻", "🐼", "🐧", "🦁", "🐰", "🐵", "🦄", "🐲", "🚀", "⭐", "🎈", "🏀", "⚽", "🎮", "🤖", "👾", "🦸", "🧙", "🧚", "🎪"];

let blockIdCounter = 0;
const uid = () => `b_${++blockIdCounter}_${Date.now()}`;

const cloneBlock = (b: Block): Block => ({
  ...b,
  id: uid(),
  values: b.values ? { ...b.values } : undefined,
  inputs: b.inputs ? b.inputs.map(i => ({ ...i })) : undefined,
});

const defaultSprite = (): Sprite => ({
  id: uid(),
  name: "شخصية 1",
  emoji: "🐱",
  x: 200, y: 150,
  rotation: 0, scale: 1, visible: true,
  scripts: [],
  costumes: ["🐱"],
  currentCostume: 0,
});

/* ═══════════════════ BLOCK COMPONENT ═══════════════════ */
const BlockItem = memo(({ block, onRemove, onValueChange, depth = 0 }: {
  block: Block;
  onRemove: (id: string) => void;
  onValueChange: (blockId: string, inputName: string, value: string | number) => void;
  depth?: number;
}) => {
  const cat = CATEGORIES.find(c => c.id === block.category);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className={`group relative rounded-xl border ${cat?.border || "border-border"} ${cat?.bg || "bg-surface-mid"} px-4 py-3 mb-2 cursor-grab active:cursor-grabbing select-none`}
      style={{ marginRight: depth * 16 }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`font-bold text-sm ${cat?.text || "text-foreground"}`}>{block.labelAr}</span>
        {block.inputs?.map(input => (
          <div key={input.name} className="flex items-center gap-1">
            {input.type === "dropdown" ? (
              <select
                className="bg-background/60 border border-border/50 rounded-lg px-2 py-1 text-xs text-foreground min-w-[80px]"
                value={block.values?.[input.name] ?? input.default}
                onChange={e => onValueChange(block.id, input.name, e.target.value)}
              >
                {input.options?.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={input.type === "number" ? "number" : "text"}
                className="bg-background/60 border border-border/50 rounded-lg px-2 py-1 text-xs text-foreground w-16 text-center"
                value={block.values?.[input.name] ?? input.default}
                onChange={e => onValueChange(block.id, input.name, input.type === "number" ? Number(e.target.value) : e.target.value)}
              />
            )}
          </div>
        ))}
        <button
          onClick={() => onRemove(block.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity mr-auto p-1 rounded hover:bg-destructive/20"
        >
          <Trash2 className="h-3 w-3 text-destructive" />
        </button>
      </div>
    </motion.div>
  );
});
BlockItem.displayName = "BlockItem";

/* ═══════════════════ STAGE CANVAS ═══════════════════ */
const Stage = memo(({ sprites, isPlaying, stageColor }: { sprites: Sprite[]; isPlaying: boolean; stageColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, 480, 360);
      ctx.fillStyle = stageColor;
      ctx.fillRect(0, 0, 480, 360);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 480; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke(); }
      for (let y = 0; y < 360; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(480, y); ctx.stroke(); }

      // Center crosshair
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
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
        ctx.font = "48px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sprite.emoji, 0, 0);

        if (sprite.sayText) {
          ctx.rotate(-(sprite.rotation * Math.PI) / 180);
          ctx.font = "bold 14px Cairo, sans-serif";
          const metrics = ctx.measureText(sprite.sayText);
          const w = metrics.width + 20;
          ctx.fillStyle = "white";
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(-w / 2, -55, w, 30, 8);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#333";
          ctx.textAlign = "center";
          ctx.fillText(sprite.sayText, 0, -38);
        }
        ctx.restore();
      });

      if (isPlaying) {
        ctx.fillStyle = "rgba(0,255,100,0.8)";
        ctx.beginPath();
        ctx.arc(16, 16, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
  }, [sprites, isPlaying, stageColor]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={360}
      className="w-full h-full rounded-xl"
      style={{ imageRendering: "auto" }}
    />
  );
});
Stage.displayName = "Stage";

/* ═══════════════════ MAIN PAGE ═══════════════════ */
const GameLearning = () => {
  const [sprites, setSprites] = useState<Sprite[]>([defaultSprite()]);
  const [activeSprite, setActiveSprite] = useState(0);
  const [activeCategory, setActiveCategory] = useState("motion");
  const [isPlaying, setIsPlaying] = useState(false);
  const [stageColor, setStageColor] = useState("#1a1a2e");
  const [history, setHistory] = useState<Sprite[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const animFrameRef = useRef<number>(0);
  const runningRef = useRef(false);

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

  const addSprite = useCallback((emoji: string) => {
    const s: Sprite = {
      id: uid(),
      name: `شخصية ${sprites.length + 1}`,
      emoji,
      x: 200 + Math.random() * 80, y: 150 + Math.random() * 60,
      rotation: 0, scale: 1, visible: true,
      scripts: [],
      costumes: [emoji],
      currentCostume: 0,
    };
    setSprites(prev => [...prev, s]);
    setActiveSprite(sprites.length);
    saveHistory();
  }, [sprites.length, saveHistory]);

  const deleteSprite = useCallback((index: number) => {
    if (sprites.length <= 1) return;
    setSprites(prev => prev.filter((_, i) => i !== index));
    setActiveSprite(Math.max(0, index - 1));
    saveHistory();
  }, [sprites.length, saveHistory]);

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
        updateSprite({ x: sprite.x + Math.cos(rad) * steps, y: sprite.y + Math.sin(rad) * steps });
        sprite.x += Math.cos(rad) * steps;
        sprite.y += Math.sin(rad) * steps;
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
        sprite.y = Number(val("y", 0)) + 180;
        updateSprite({ x: sprite.x, y: sprite.y });
        break;
      case "set_x":
        sprite.x = Number(val("x", 0)) + 240;
        updateSprite({ x: sprite.x });
        break;
      case "set_y":
        sprite.y = Number(val("y", 0)) + 180;
        updateSprite({ y: sprite.y });
        break;
      case "change_x":
        sprite.x += Number(val("dx", 10));
        updateSprite({ x: sprite.x });
        break;
      case "change_y":
        sprite.y += Number(val("dy", 10));
        updateSprite({ y: sprite.y });
        break;
      case "set_rotation":
        sprite.rotation = Number(val("degrees", 90));
        updateSprite({ rotation: sprite.rotation });
        break;
      case "bounce":
        if (sprite.x <= 24 || sprite.x >= 456) sprite.rotation = 180 - sprite.rotation;
        if (sprite.y <= 24 || sprite.y >= 336) sprite.rotation = -sprite.rotation;
        updateSprite({ rotation: sprite.rotation });
        break;
      case "glide": {
        const secs = Number(val("secs", 1));
        const tx = Number(val("x", 0)) + 240;
        const ty = Number(val("y", 0)) + 180;
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
        updateSprite({ sayText: String(val("message", "مرحباً!")) });
        sprite.sayText = String(val("message", "مرحباً!"));
        break;
      case "say_for": {
        const msg = String(val("message", "مرحباً!"));
        const secs = Number(val("secs", 2));
        updateSprite({ sayText: msg });
        sprite.sayText = msg;
        await new Promise(r => setTimeout(r, secs * 1000));
        updateSprite({ sayText: undefined });
        sprite.sayText = undefined;
        break;
      }
      case "think":
        updateSprite({ sayText: `💭 ${val("message", "همم...")}` });
        break;
      case "show":
        updateSprite({ visible: true });
        sprite.visible = true;
        break;
      case "hide":
        updateSprite({ visible: false });
        sprite.visible = false;
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
        const times = Number(val("times", 10));
        // For repeat, we'd need child blocks - simplified version
        break;
      }
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
      ...s, x: 200, y: 150, rotation: 0, scale: 1, visible: true, sayText: undefined,
    })));
  }, [stopScripts]);

  const currentSprite = sprites[activeSprite];
  const filteredBlocks = BLOCK_TEMPLATES.filter(b => b.category === activeCategory);
  const currentCat = CATEGORIES.find(c => c.id === activeCategory);

  const [showSpriteSelector, setShowSpriteSelector] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-surface-low border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <h1 className="font-display font-bold text-lg text-foreground">بيئة البرمجة بالمكعبات</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={undo} title="تراجع">
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={redo} title="إعادة">
              <Redo2 className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              size="sm"
              onClick={runScripts}
              disabled={isPlaying}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Flag className="h-4 w-4" />
              تشغيل
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={stopScripts}
              disabled={!isPlaying}
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              إيقاف
            </Button>
            <Button size="sm" variant="outline" onClick={resetSprites} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              إعادة ضبط
            </Button>
          </div>
        </div>
      </div>

      {/* Main IDE */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Block Palette */}
        <div className="w-72 border-l border-border bg-surface-low flex flex-col">
          {/* Categories */}
          <div className="p-2 border-b border-border overflow-x-auto">
            <div className="flex flex-wrap gap-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? `bg-gradient-to-l ${cat.color} text-white shadow-lg`
                      : `${cat.bg} ${cat.text} hover:opacity-80`
                  }`}
                >
                  {cat.labelAr}
                </button>
              ))}
            </div>
          </div>

          {/* Blocks */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredBlocks.map(block => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => addBlockToScript(block)}
                  className={`cursor-pointer rounded-xl border ${currentCat?.border} ${currentCat?.bg} px-4 py-3 text-sm font-bold ${currentCat?.text} hover:scale-[1.02] active:scale-[0.98] transition-transform select-none`}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-3 w-3 opacity-50" />
                    <span>{block.labelAr}</span>
                  </div>
                  {block.inputs && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {block.inputs.map(i => (
                        <span key={i.name} className="text-[10px] bg-background/30 rounded px-1.5 py-0.5 opacity-70">
                          {i.name}: {String(i.default)}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Script Area */}
        <div className="flex-1 flex flex-col border-l border-border">
          <div className="px-4 py-2 bg-surface-mid/50 border-b border-border flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-bold">سكربتات:</span>
            <span className="text-xs font-bold text-foreground">{currentSprite?.name}</span>
            <span className="text-lg">{currentSprite?.emoji}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,hsl(var(--border)/0.3)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,hsl(var(--border)/0.3)_20px)]">
            {currentSprite?.scripts[0]?.length ? (
              <AnimatePresence>
                {currentSprite.scripts[0].map(block => (
                  <BlockItem
                    key={block.id}
                    block={block}
                    onRemove={removeBlock}
                    onValueChange={updateBlockValue}
                  />
                ))}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <div className="text-6xl mb-4 opacity-20">🧩</div>
                <p className="text-sm font-bold">اسحب المكعبات هنا لبناء برنامجك</p>
                <p className="text-xs mt-1 opacity-60">أو اضغط على أي مكعب من القائمة لإضافته</p>
              </div>
            )}
          </div>
        </div>

        {/* Stage + Sprites */}
        <div className="w-[520px] flex flex-col border-l border-border">
          {/* Stage */}
          <div className="p-4 bg-surface-low">
            <div className="rounded-2xl overflow-hidden border-2 border-border shadow-xl aspect-[4/3]">
              <Stage sprites={sprites} isPlaying={isPlaying} stageColor={stageColor} />
            </div>
          </div>

          {/* Stage Color */}
          <div className="px-4 py-2 flex items-center gap-3 border-b border-border bg-surface-mid/30">
            <span className="text-xs text-muted-foreground font-bold">لون المسرح:</span>
            <input
              type="color"
              value={stageColor}
              onChange={e => setStageColor(e.target.value)}
              className="h-6 w-8 rounded cursor-pointer border-0"
            />
            <div className="mr-auto flex items-center gap-2 text-xs text-muted-foreground">
              <span>x: {Math.round(sprites[activeSprite]?.x - 240)}</span>
              <span>y: {Math.round(sprites[activeSprite]?.y - 180)}</span>
            </div>
          </div>

          {/* Sprite List */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground">الشخصيات ({sprites.length})</span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs gap-1"
                onClick={() => setShowSpriteSelector(!showSpriteSelector)}
              >
                <Plus className="h-3 w-3" />
                إضافة
              </Button>
            </div>

            {showSpriteSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 p-3 rounded-xl bg-surface-mid border border-border"
              >
                <div className="grid grid-cols-8 gap-1">
                  {SPRITE_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => { addSprite(emoji); setShowSpriteSelector(false); }}
                      className="text-2xl p-2 rounded-lg hover:bg-surface-high transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-2">
              {sprites.map((sprite, idx) => (
                <motion.div
                  key={sprite.id}
                  layout
                  onClick={() => setActiveSprite(idx)}
                  className={`group relative p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    idx === activeSprite
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border bg-surface-mid hover:border-primary/30"
                  }`}
                >
                  <span className="text-3xl block mb-1">{sprite.emoji}</span>
                  <span className="text-[10px] font-bold text-foreground block truncate">{sprite.name}</span>
                  <span className="text-[9px] text-muted-foreground">{sprite.scripts[0]?.length || 0} مكعب</span>
                  {sprites.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); deleteSprite(idx); }}
                      className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 bg-destructive text-white rounded-full p-0.5 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GameLearning;
