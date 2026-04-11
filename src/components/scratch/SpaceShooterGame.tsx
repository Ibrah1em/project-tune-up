import { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Play, RotateCcw, Volume2, VolumeX, Trophy, Heart, Zap, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language } from "./types";

interface Question {
  question: string;
  questionEn: string;
  options: { text: string; textEn: string; correct: boolean }[];
  difficulty: number;
}

const QUESTIONS: Question[] = [
  // Level 1 - Easy
  {
    question: "ما الأمر الذي يحرك الشخصية 10 خطوات؟",
    questionEn: "Which command moves the sprite 10 steps?",
    options: [
      { text: "move(10)", textEn: "move(10)", correct: true },
      { text: "go(10)", textEn: "go(10)", correct: false },
      { text: "run(10)", textEn: "run(10)", correct: false },
      { text: "step(10)", textEn: "step(10)", correct: false },
    ],
    difficulty: 1,
  },
  {
    question: "كيف نجعل الشخصية تقول 'مرحباً'؟",
    questionEn: "How do we make the sprite say 'Hello'?",
    options: [
      { text: "talk('مرحباً')", textEn: "talk('Hello')", correct: false },
      { text: "say('مرحباً')", textEn: "say('Hello')", correct: true },
      { text: "speak('مرحباً')", textEn: "speak('Hello')", correct: false },
      { text: "print('مرحباً')", textEn: "print('Hello')", correct: false },
    ],
    difficulty: 1,
  },
  {
    question: "ما هو أمر تكرار الحركة للأبد؟",
    questionEn: "What is the command to repeat forever?",
    options: [
      { text: "always", textEn: "always", correct: false },
      { text: "loop", textEn: "loop", correct: false },
      { text: "forever", textEn: "forever", correct: true },
      { text: "infinite", textEn: "infinite", correct: false },
    ],
    difficulty: 1,
  },
  // Level 2 - Medium
  {
    question: "كيف نستدير 90 درجة لليمين؟",
    questionEn: "How do we turn 90 degrees right?",
    options: [
      { text: "rotate(90)", textEn: "rotate(90)", correct: false },
      { text: "turn_right(90)", textEn: "turn_right(90)", correct: true },
      { text: "spin(90)", textEn: "spin(90)", correct: false },
      { text: "angle(90)", textEn: "angle(90)", correct: false },
    ],
    difficulty: 2,
  },
  {
    question: "ما الأمر لاختبار لمس حافة الشاشة؟",
    questionEn: "What command checks if touching the edge?",
    options: [
      { text: "if_edge_bounce()", textEn: "if_edge_bounce()", correct: true },
      { text: "check_wall()", textEn: "check_wall()", correct: false },
      { text: "border_test()", textEn: "border_test()", correct: false },
      { text: "edge_detect()", textEn: "edge_detect()", correct: false },
    ],
    difficulty: 2,
  },
  {
    question: "كيف ننشئ متغير اسمه 'نقاط'؟",
    questionEn: "How to create a variable called 'score'?",
    options: [
      { text: "new_var('نقاط')", textEn: "new_var('score')", correct: false },
      { text: "make_variable('نقاط')", textEn: "make_variable('score')", correct: false },
      { text: "set_var('نقاط', 0)", textEn: "set_var('score', 0)", correct: true },
      { text: "create('نقاط')", textEn: "create('score')", correct: false },
    ],
    difficulty: 2,
  },
  // Level 3 - Hard
  {
    question: "ما الفرق بين 'say' و 'say_for'؟",
    questionEn: "What's the difference between 'say' and 'say_for'?",
    options: [
      { text: "say أبطأ", textEn: "say is slower", correct: false },
      { text: "say_for تختفي بعد وقت محدد", textEn: "say_for disappears after set time", correct: true },
      { text: "لا فرق", textEn: "No difference", correct: false },
      { text: "say_for أعلى صوتاً", textEn: "say_for is louder", correct: false },
    ],
    difficulty: 3,
  },
  {
    question: "كيف نجعل الشخصية تنزلق لموقع معين في ثانيتين؟",
    questionEn: "How to make a sprite glide to a position in 2 seconds?",
    options: [
      { text: "slide(2, x, y)", textEn: "slide(2, x, y)", correct: false },
      { text: "move_smooth(2, x, y)", textEn: "move_smooth(2, x, y)", correct: false },
      { text: "glide(2, x, y)", textEn: "glide(2, x, y)", correct: true },
      { text: "drift(2, x, y)", textEn: "drift(2, x, y)", correct: false },
    ],
    difficulty: 3,
  },
  {
    question: "ما الأمر لإنشاء نسخة من الشخصية؟",
    questionEn: "What command creates a clone of the sprite?",
    options: [
      { text: "duplicate()", textEn: "duplicate()", correct: false },
      { text: "create_clone()", textEn: "create_clone()", correct: true },
      { text: "copy_sprite()", textEn: "copy_sprite()", correct: false },
      { text: "spawn()", textEn: "spawn()", correct: false },
    ],
    difficulty: 3,
  },
];

interface Missile {
  id: number;
  x: number;
  y: number;
  speed: number;
  question: Question;
  answered: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: "shield" | "slowmo" | "doubleScore";
  speed: number;
}

const SpaceShooterGame = ({ lang, t }: { lang: Language; t: (ar: string, en: string) => string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "question" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    try { return Number(localStorage.getItem("spaceShooterHighScore") || 0); } catch { return 0; }
  });
  const [playerX, setPlayerX] = useState(240);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentMissile, setCurrentMissile] = useState<Missile | null>(null);
  const [showAnswer, setShowAnswer] = useState<"correct" | "wrong" | null>(null);
  const [combo, setCombo] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const missilesRef = useRef<Missile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const starsRef = useRef<{ x: number; y: number; speed: number; size: number; brightness: number }[]>([]);
  const playerXRef = useRef(240);
  const frameRef = useRef(0);
  const gameLoopRef = useRef<number>(0);
  const lastMissileTime = useRef(0);
  const missileIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize stars
  useEffect(() => {
    starsRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * 480,
      y: Math.random() * 400,
      speed: 0.2 + Math.random() * 1.5,
      size: 0.5 + Math.random() * 2,
      brightness: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  const playSound = useCallback((type: "shoot" | "explode" | "correct" | "wrong" | "powerup" | "levelup") => {
    if (!soundEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      switch (type) {
        case "shoot":
          osc.frequency.value = 800;
          osc.type = "square";
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          osc.start(); osc.stop(ctx.currentTime + 0.1);
          break;
        case "explode":
          osc.frequency.value = 150;
          osc.type = "sawtooth";
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start(); osc.stop(ctx.currentTime + 0.4);
          break;
        case "correct":
          osc.frequency.setValueAtTime(523, ctx.currentTime);
          osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
          osc.type = "sine";
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start(); osc.stop(ctx.currentTime + 0.4);
          break;
        case "wrong":
          osc.frequency.value = 200;
          osc.type = "sawtooth";
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start(); osc.stop(ctx.currentTime + 0.3);
          break;
        case "powerup":
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
          osc.type = "sine";
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start(); osc.stop(ctx.currentTime + 0.3);
          break;
        case "levelup":
          osc.frequency.setValueAtTime(523, ctx.currentTime);
          osc.frequency.setValueAtTime(784, ctx.currentTime + 0.15);
          osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.3);
          osc.type = "sine";
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.start(); osc.stop(ctx.currentTime + 0.5);
          break;
      }
    } catch {}
  }, [soundEnabled]);

  const createExplosion = useCallback((x: number, y: number, color = "#ff6b35") => {
    const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => {
      const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      return {
        id: Date.now() + i,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
        size: 2 + Math.random() * 4,
      };
    });
    particlesRef.current = [...particlesRef.current, ...newParticles];
  }, []);

  const getQuestionForLevel = useCallback((lvl: number): Question => {
    const difficulty = Math.min(3, Math.ceil(lvl / 3));
    const available = QUESTIONS.filter(q => q.difficulty <= difficulty);
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const spawnMissile = useCallback(() => {
    const question = getQuestionForLevel(level);
    const missile: Missile = {
      id: ++missileIdRef.current,
      x: 60 + Math.random() * 360,
      y: -40,
      speed: 0.3 + level * 0.15,
      question,
      answered: false,
    };
    missilesRef.current.push(missile);
  }, [level, getQuestionForLevel]);

  // Player movement via mouse/touch
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = 480 / rect.width;
      const x = Math.max(30, Math.min(450, (clientX - rect.left) * scaleX));
      playerXRef.current = x;
      setPlayerX(x);
    };

    const onMouse = (e: MouseEvent) => handleMove(e.clientX);
    const onTouch = (e: TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX); };

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    return () => {
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      frameRef.current++;
      const now = Date.now();

      // Spawn missiles
      const spawnInterval = Math.max(2000, 5000 - level * 400);
      if (now - lastMissileTime.current > spawnInterval) {
        spawnMissile();
        lastMissileTime.current = now;
      }

      // Update stars
      starsRef.current.forEach(star => {
        star.y += star.speed;
        if (star.y > 400) { star.y = 0; star.x = Math.random() * 480; }
      });

      // Update missiles
      missilesRef.current.forEach(m => {
        if (!m.answered) m.y += m.speed;
      });

      // Update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.02;
        return p.life > 0;
      });

      // Update powerups
      powerUpsRef.current.forEach(p => { p.y += p.speed; });
      powerUpsRef.current = powerUpsRef.current.filter(p => p.y < 420);

      // Check missile-player collision
      const px = playerXRef.current;
      for (const m of missilesRef.current) {
        if (m.answered) continue;
        // Check if missile reached player zone
        if (m.y > 320 && Math.abs(m.x - px) < 50) {
          setCurrentMissile(m);
          setCurrentQuestion(m.question);
          setGameState("question");
          return;
        }
        // Check if missile passed the screen
        if (m.y > 400) {
          if (!shieldActive) {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState("gameover");
                if (score > highScore) {
                  setHighScore(score);
                  try { localStorage.setItem("spaceShooterHighScore", String(score)); } catch {}
                }
              }
              return newLives;
            });
            setCombo(0);
            playSound("wrong");
          }
          createExplosion(m.x, 380, "#ff0000");
          m.answered = true;
        }
      }

      // Check powerup collection
      for (let i = powerUpsRef.current.length - 1; i >= 0; i--) {
        const p = powerUpsRef.current[i];
        if (p.y > 340 && Math.abs(p.x - px) < 40) {
          playSound("powerup");
          powerUpsRef.current.splice(i, 1);
          if (p.type === "shield") setShieldActive(true);
          else if (p.type === "doubleScore") setScore(s => s + 50);
          else if (p.type === "slowmo") {
            missilesRef.current.forEach(m => { m.speed *= 0.5; });
          }
          createExplosion(p.x, p.y, "#00ff88");
        }
      }

      // Clean answered missiles
      missilesRef.current = missilesRef.current.filter(m => !m.answered);

      // Draw
      ctx.clearRect(0, 0, 480, 400);

      // Space background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 400);
      grad.addColorStop(0, "#0a0a2e");
      grad.addColorStop(0.5, "#0d1b3e");
      grad.addColorStop(1, "#1a0a2e");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 480, 400);

      // Stars
      starsRef.current.forEach(star => {
        const twinkle = 0.5 + Math.sin(frameRef.current * 0.05 + star.x) * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${star.brightness * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Missiles (as rockets)
      missilesRef.current.forEach(m => {
        if (m.answered) return;
        ctx.save();
        ctx.translate(m.x, m.y);

        // Missile glow
        const missileGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 25);
        missileGlow.addColorStop(0, "rgba(255,60,60,0.4)");
        missileGlow.addColorStop(1, "rgba(255,60,60,0)");
        ctx.fillStyle = missileGlow;
        ctx.fillRect(-25, -25, 50, 50);

        // Missile body
        ctx.fillStyle = "#ff4444";
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(-8, 10);
        ctx.lineTo(8, 10);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ff8888";
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(-5, 6);
        ctx.lineTo(5, 6);
        ctx.closePath();
        ctx.fill();

        // Fins
        ctx.fillStyle = "#cc0000";
        ctx.beginPath();
        ctx.moveTo(-8, 10);
        ctx.lineTo(-14, 18);
        ctx.lineTo(-4, 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(8, 10);
        ctx.lineTo(14, 18);
        ctx.lineTo(4, 10);
        ctx.fill();

        // Engine flame
        const flameFlicker = Math.sin(frameRef.current * 0.3) * 3;
        ctx.fillStyle = "#ffaa00";
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(0, 20 + flameFlicker);
        ctx.lineTo(5, 10);
        ctx.fill();
        ctx.fillStyle = "#ff6600";
        ctx.beginPath();
        ctx.moveTo(-3, 10);
        ctx.lineTo(0, 25 + flameFlicker);
        ctx.lineTo(3, 10);
        ctx.fill();

        // Warning indicator
        if (m.y > 250) {
          ctx.font = "bold 10px monospace";
          ctx.fillStyle = `rgba(255,255,0,${0.5 + Math.sin(frameRef.current * 0.2) * 0.5})`;
          ctx.textAlign = "center";
          ctx.fillText("⚠️", 0, -28);
        }

        ctx.restore();
      });

      // Power-ups
      powerUpsRef.current.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(frameRef.current * 0.03);
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const icons = { shield: "🛡️", slowmo: "⏳", doubleScore: "💎" };
        ctx.fillText(icons[p.type], 0, 0);

        // Glow
        const pglow = ctx.createRadialGradient(0, 0, 5, 0, 0, 20);
        pglow.addColorStop(0, "rgba(0,255,200,0.3)");
        pglow.addColorStop(1, "rgba(0,255,200,0)");
        ctx.fillStyle = pglow;
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Player ship
      ctx.save();
      ctx.translate(px, 360);

      // Engine glow
      const engineGlow = ctx.createRadialGradient(0, 10, 3, 0, 10, 20);
      engineGlow.addColorStop(0, "rgba(0,150,255,0.6)");
      engineGlow.addColorStop(1, "rgba(0,150,255,0)");
      ctx.fillStyle = engineGlow;
      ctx.beginPath();
      ctx.arc(0, 15, 20, 0, Math.PI * 2);
      ctx.fill();

      // Ship body
      ctx.fillStyle = "#4488ff";
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(-18, 15);
      ctx.lineTo(-8, 10);
      ctx.lineTo(0, 14);
      ctx.lineTo(8, 10);
      ctx.lineTo(18, 15);
      ctx.closePath();
      ctx.fill();

      // Ship highlight
      ctx.fillStyle = "#66aaff";
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(-10, 8);
      ctx.lineTo(0, 11);
      ctx.lineTo(10, 8);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = "#aaddff";
      ctx.beginPath();
      ctx.arc(0, -4, 5, 0, Math.PI * 2);
      ctx.fill();

      // Shield indicator
      if (shieldActive) {
        ctx.strokeStyle = `rgba(0,255,255,${0.3 + Math.sin(frameRef.current * 0.1) * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Engine flame
      const eFlame = Math.sin(frameRef.current * 0.4) * 2;
      ctx.fillStyle = "#00aaff";
      ctx.beginPath();
      ctx.moveTo(-6, 14);
      ctx.lineTo(0, 22 + eFlame);
      ctx.lineTo(6, 14);
      ctx.fill();

      ctx.restore();

      // Particles
      particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // HUD
      ctx.font = "bold 14px 'Cairo', sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = "white";
      ctx.fillText(`⭐ ${score}`, 10, 25);
      ctx.fillText(`❤️ ${"♥".repeat(Math.max(0, lives))}`, 10, 45);
      ctx.textAlign = "right";
      ctx.fillText(`Lv.${level}`, 470, 25);
      if (combo > 1) {
        ctx.fillStyle = "#ffdd00";
        ctx.fillText(`🔥 x${combo}`, 470, 45);
      }

      // Spawn powerups occasionally
      if (frameRef.current % 600 === 0 && Math.random() < 0.4) {
        const types: PowerUp["type"][] = ["shield", "slowmo", "doubleScore"];
        powerUpsRef.current.push({
          id: Date.now(),
          x: 60 + Math.random() * 360,
          y: -20,
          type: types[Math.floor(Math.random() * types.length)],
          speed: 1,
        });
      }

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    lastMissileTime.current = Date.now();
    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, level, spawnMissile, createExplosion, playSound, shieldActive, score, highScore, lives, combo]);

  // Level progression
  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setLevel(l => l + 1);
      playSound("levelup");
    }
  }, [score, playSound]);

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) {
      const points = 10 * (combo + 1) * level;
      setScore(s => s + points);
      setCombo(c => c + 1);
      setShowAnswer("correct");
      playSound("correct");
      if (currentMissile) {
        createExplosion(currentMissile.x, currentMissile.y, "#00ff88");
        missilesRef.current = missilesRef.current.filter(m => m.id !== currentMissile.id);
      }
    } else {
      setShowAnswer("wrong");
      setCombo(0);
      playSound("wrong");
      if (!shieldActive) {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setTimeout(() => {
              setGameState("gameover");
              if (score > highScore) {
                setHighScore(score);
                try { localStorage.setItem("spaceShooterHighScore", String(score)); } catch {}
              }
            }, 800);
          }
          return newLives;
        });
        if (currentMissile) createExplosion(currentMissile.x, currentMissile.y, "#ff0000");
      } else {
        setShieldActive(false);
        if (currentMissile) {
          missilesRef.current = missilesRef.current.filter(m => m.id !== currentMissile.id);
        }
      }
    }

    setTimeout(() => {
      setShowAnswer(null);
      setCurrentQuestion(null);
      setCurrentMissile(null);
      if (lives > (correct ? 0 : 1)) {
        setGameState("playing");
      }
    }, 800);
  }, [currentMissile, combo, level, playSound, createExplosion, shieldActive, lives, score, highScore]);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setCombo(0);
    setShieldActive(false);
    setPlayerX(240);
    playerXRef.current = 240;
    missilesRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    frameRef.current = 0;
    setGameState("playing");
  }, []);

  return (
    <div className="py-8 sm:py-12" style={{ backgroundColor: "hsl(var(--surface-low))" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              {t("🚀 حرب الفضاء البرمجية", "🚀 Code Space War")}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t(
              "دافع عن سفينتك بالإجابة على أسئلة البرمجة! كل إجابة صحيحة تدمر الصاروخ القادم",
              "Defend your ship by answering coding questions! Each correct answer destroys the incoming missile"
            )}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div ref={containerRef} className="relative rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: "hsl(var(--border))" }}>
            <canvas
              ref={canvasRef}
              width={480}
              height={400}
              className="w-full"
              style={{ imageRendering: "auto", aspectRatio: "480/400", touchAction: "none" }}
            />

            {/* Menu Overlay */}
            {gameState === "menu" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t("حرب الفضاء البرمجية", "Code Space War")}</h3>
                  <p className="text-sm text-gray-300 mb-1">{t("أعلى نقاط", "High Score")}: {highScore}</p>
                  <p className="text-xs text-gray-400 mb-6">{t("حرّك السفينة بالماوس • أجب على الأسئلة لتدمير الصواريخ", "Move ship with mouse • Answer questions to destroy missiles")}</p>
                  <Button onClick={startGame} className="gap-2 px-8 py-3 text-lg" style={{ backgroundColor: "#4CAF50" }}>
                    <Play className="h-5 w-5" />
                    {t("ابدأ اللعب", "Start Game")}
                  </Button>

                  <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
                    <span>🛡️ {t("درع", "Shield")}</span>
                    <span>⏳ {t("إبطاء", "Slow")}</span>
                    <span>💎 {t("نقاط مضاعفة", "Double Score")}</span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Question Overlay */}
            {gameState === "question" && currentQuestion && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full max-w-sm rounded-xl p-4 text-center"
                  style={{ backgroundColor: "hsl(var(--card))", border: "2px solid hsl(var(--border))" }}
                >
                  {showAnswer ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-5xl py-8"
                    >
                      {showAnswer === "correct" ? "✅" : "❌"}
                      <p className="text-lg font-bold mt-2" style={{ color: showAnswer === "correct" ? "#4CAF50" : "#f44336" }}>
                        {showAnswer === "correct" ? t("إجابة صحيحة! 🎉", "Correct! 🎉") : t("إجابة خاطئة 😢", "Wrong answer 😢")}
                      </p>
                      {showAnswer === "correct" && combo > 1 && (
                        <p className="text-sm text-yellow-400 mt-1">🔥 Combo x{combo}!</p>
                      )}
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                          {t("مستوى", "Level")} {level}
                        </span>
                        <span className="text-xs text-muted-foreground">⚠️ {t("أجب بسرعة!", "Answer quickly!")}</span>
                      </div>
                      <p className="text-sm font-bold text-foreground mb-4">
                        {lang === "ar" ? currentQuestion.question : currentQuestion.questionEn}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {currentQuestion.options.map((opt, i) => (
                          <motion.button
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.08 }}
                            onClick={() => handleAnswer(opt.correct)}
                            className="px-4 py-2.5 rounded-lg text-sm font-bold text-start transition-all hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              backgroundColor: "hsl(var(--muted))",
                              color: "hsl(var(--foreground))",
                              border: "1px solid hsl(var(--border))",
                            }}
                          >
                            <span className="font-mono">{lang === "ar" ? opt.text : opt.textEn}</span>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center p-6 rounded-xl"
                  style={{ backgroundColor: "hsl(var(--card))", border: "2px solid hsl(var(--border))" }}
                >
                  <div className="text-5xl mb-3">💥</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t("انتهت اللعبة!", "Game Over!")}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">⭐ {score}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t("المستوى", "Level")}: {level}</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-sm text-yellow-400 font-bold mb-2">🏆 {t("رقم قياسي جديد!", "New High Score!")}</p>
                  )}
                  <p className="text-xs text-muted-foreground mb-4">{t("أعلى نقاط", "Best")}: {highScore}</p>
                  <Button onClick={startGame} className="gap-2" style={{ backgroundColor: "#4CAF50" }}>
                    <RotateCcw className="h-4 w-4" />
                    {t("العب مرة أخرى", "Play Again")}
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(s => !s)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white/70 hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>

          {/* Game info */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>❤️ {t("حياة", "Lives")}: {lives}</span>
            <span>⭐ {t("نقاط", "Score")}: {score}</span>
            <span>📊 {t("مستوى", "Level")}: {level}</span>
            {combo > 1 && <span className="text-yellow-500">🔥 x{combo}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceShooterGame;
