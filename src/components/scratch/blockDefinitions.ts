import { Block, Category } from "./types";

export const CATEGORIES: Category[] = [
  { id: "motion", label: "Motion", labelAr: "الحركة", color: "#4C97FF", bgColor: "rgba(76,151,255,0.15)", borderColor: "rgba(76,151,255,0.4)", iconBg: "#4C97FF" },
  { id: "looks", label: "Looks", labelAr: "المظهر", color: "#9966FF", bgColor: "rgba(153,102,255,0.15)", borderColor: "rgba(153,102,255,0.4)", iconBg: "#9966FF" },
  { id: "sound", label: "Sound", labelAr: "الصوت", color: "#CF63CF", bgColor: "rgba(207,99,207,0.15)", borderColor: "rgba(207,99,207,0.4)", iconBg: "#CF63CF" },
  { id: "events", label: "Events", labelAr: "الأحداث", color: "#FFBF00", bgColor: "rgba(255,191,0,0.15)", borderColor: "rgba(255,191,0,0.4)", iconBg: "#FFBF00" },
  { id: "control", label: "Control", labelAr: "التحكم", color: "#FFAB19", bgColor: "rgba(255,171,25,0.15)", borderColor: "rgba(255,171,25,0.4)", iconBg: "#FFAB19" },
  { id: "sensing", label: "Sensing", labelAr: "الاستشعار", color: "#5CB1D6", bgColor: "rgba(92,177,214,0.15)", borderColor: "rgba(92,177,214,0.4)", iconBg: "#5CB1D6" },
  { id: "operators", label: "Operators", labelAr: "العمليات", color: "#59C059", bgColor: "rgba(89,192,89,0.15)", borderColor: "rgba(89,192,89,0.4)", iconBg: "#59C059" },
  { id: "variables", label: "Variables", labelAr: "المتغيرات", color: "#FF8C1A", bgColor: "rgba(255,140,26,0.15)", borderColor: "rgba(255,140,26,0.4)", iconBg: "#FF8C1A" },
];

export const BLOCK_TEMPLATES: Block[] = [
  // Motion
  { id: "move", type: "move", category: "motion", label: "move %1 steps", labelAr: "تحرك %1 خطوات", inputs: [{ name: "steps", type: "number", default: 10 }] },
  { id: "turn_right", type: "turn_right", category: "motion", label: "turn ↻ %1 degrees", labelAr: "استدر ↻ %1 درجة", inputs: [{ name: "degrees", type: "number", default: 15 }] },
  { id: "turn_left", type: "turn_left", category: "motion", label: "turn ↺ %1 degrees", labelAr: "استدر ↺ %1 درجة", inputs: [{ name: "degrees", type: "number", default: 15 }] },
  { id: "goto_xy", type: "goto_xy", category: "motion", label: "go to x: %1 y: %2", labelAr: "اذهب إلى x: %1 y: %2", inputs: [{ name: "x", type: "number", default: 0 }, { name: "y", type: "number", default: 0 }] },
  { id: "goto_random", type: "goto_random", category: "motion", label: "go to random position", labelAr: "اذهب إلى موقع عشوائي" },
  { id: "glide", type: "glide", category: "motion", label: "glide %1 secs to x: %2 y: %3", labelAr: "انزلق %1 ثانية إلى x: %2 y: %3", inputs: [{ name: "secs", type: "number", default: 1 }, { name: "x", type: "number", default: 0 }, { name: "y", type: "number", default: 0 }] },
  { id: "set_x", type: "set_x", category: "motion", label: "set x to %1", labelAr: "اجعل x = %1", inputs: [{ name: "x", type: "number", default: 0 }] },
  { id: "set_y", type: "set_y", category: "motion", label: "set y to %1", labelAr: "اجعل y = %1", inputs: [{ name: "y", type: "number", default: 0 }] },
  { id: "change_x", type: "change_x", category: "motion", label: "change x by %1", labelAr: "غيّر x بمقدار %1", inputs: [{ name: "dx", type: "number", default: 10 }] },
  { id: "change_y", type: "change_y", category: "motion", label: "change y by %1", labelAr: "غيّر y بمقدار %1", inputs: [{ name: "dy", type: "number", default: 10 }] },
  { id: "bounce", type: "bounce", category: "motion", label: "if on edge, bounce", labelAr: "إذا لمست الحافة، ارتد" },
  { id: "set_rotation", type: "set_rotation", category: "motion", label: "point in direction %1", labelAr: "اتجه نحو %1", inputs: [{ name: "degrees", type: "number", default: 90 }] },
  { id: "point_towards", type: "point_towards", category: "motion", label: "point towards mouse-pointer", labelAr: "اتجه نحو مؤشر الفأرة" },
  // Looks
  { id: "say", type: "say", category: "looks", label: "say %1", labelAr: "قل %1", inputs: [{ name: "message", type: "string", default: "Hello!" }] },
  { id: "say_for", type: "say_for", category: "looks", label: "say %1 for %2 secs", labelAr: "قل %1 لمدة %2 ثانية", inputs: [{ name: "message", type: "string", default: "Hello!" }, { name: "secs", type: "number", default: 2 }] },
  { id: "think", type: "think", category: "looks", label: "think %1", labelAr: "فكّر %1", inputs: [{ name: "message", type: "string", default: "Hmm..." }] },
  { id: "show", type: "show", category: "looks", label: "show", labelAr: "أظهر" },
  { id: "hide", type: "hide", category: "looks", label: "hide", labelAr: "أخفِ" },
  { id: "set_size", type: "set_size", category: "looks", label: "set size to %1 %", labelAr: "اجعل الحجم %1 %", inputs: [{ name: "size", type: "number", default: 100 }] },
  { id: "change_size", type: "change_size", category: "looks", label: "change size by %1", labelAr: "غيّر الحجم بمقدار %1", inputs: [{ name: "change", type: "number", default: 10 }] },
  { id: "next_costume", type: "next_costume", category: "looks", label: "next costume", labelAr: "المظهر التالي" },
  { id: "set_effect", type: "set_effect", category: "looks", label: "set %1 effect to %2", labelAr: "اضبط تأثير %1 = %2", inputs: [{ name: "effect", type: "dropdown", default: "color", options: ["color", "fisheye", "whirl", "pixelate", "mosaic", "brightness", "ghost"] }, { name: "value", type: "number", default: 0 }] },
  // Sound
  { id: "play_sound", type: "play_sound", category: "sound", label: "play sound %1", labelAr: "شغّل صوت %1", inputs: [{ name: "sound", type: "dropdown", default: "pop", options: ["pop", "meow", "beep", "drum", "bell"] }] },
  { id: "stop_sounds", type: "stop_sounds", category: "sound", label: "stop all sounds", labelAr: "أوقف كل الأصوات" },
  { id: "set_volume", type: "set_volume", category: "sound", label: "set volume to %1 %", labelAr: "اضبط الصوت %1 %", inputs: [{ name: "vol", type: "number", default: 100 }] },
  // Events
  { id: "when_flag", type: "when_flag", category: "events", label: "when 🟢 clicked", labelAr: "عند النقر على 🟢" },
  { id: "when_key", type: "when_key", category: "events", label: "when %1 key pressed", labelAr: "عند الضغط على %1", inputs: [{ name: "key", type: "dropdown", default: "space", options: ["space", "up arrow", "down arrow", "left arrow", "right arrow", "a", "b", "c"] }] },
  { id: "when_clicked", type: "when_clicked", category: "events", label: "when this sprite clicked", labelAr: "عند النقر على الشخصية" },
  { id: "broadcast", type: "broadcast", category: "events", label: "broadcast %1", labelAr: "أرسل رسالة %1", inputs: [{ name: "msg", type: "string", default: "message1" }] },
  { id: "when_receive", type: "when_receive", category: "events", label: "when I receive %1", labelAr: "عندما أستقبل %1", inputs: [{ name: "msg", type: "string", default: "message1" }] },
  // Control
  { id: "wait", type: "wait", category: "control", label: "wait %1 seconds", labelAr: "انتظر %1 ثانية", inputs: [{ name: "secs", type: "number", default: 1 }] },
  { id: "repeat", type: "repeat", category: "control", label: "repeat %1", labelAr: "كرر %1", inputs: [{ name: "times", type: "number", default: 10 }] },
  { id: "forever", type: "forever", category: "control", label: "forever", labelAr: "للأبد" },
  { id: "if", type: "if", category: "control", label: "if ... then", labelAr: "إذا ... فنفذ" },
  { id: "if_else", type: "if_else", category: "control", label: "if ... else", labelAr: "إذا ... وإلا" },
  { id: "stop", type: "stop", category: "control", label: "stop all", labelAr: "أوقف الكل" },
  { id: "clone", type: "clone", category: "control", label: "create clone of myself", labelAr: "أنشئ نسخة مني" },
  // Sensing
  { id: "touching", type: "touching", category: "sensing", label: "touching %1 ?", labelAr: "هل يلمس %1 ؟", inputs: [{ name: "target", type: "dropdown", default: "edge", options: ["edge", "mouse-pointer"] }] },
  { id: "ask", type: "ask", category: "sensing", label: "ask %1 and wait", labelAr: "اسأل %1 وانتظر", inputs: [{ name: "question", type: "string", default: "What's your name?" }] },
  { id: "mouse_x", type: "mouse_x", category: "sensing", label: "mouse x", labelAr: "موقع الفأرة x" },
  { id: "mouse_y", type: "mouse_y", category: "sensing", label: "mouse y", labelAr: "موقع الفأرة y" },
  { id: "key_pressed", type: "key_pressed", category: "sensing", label: "key %1 pressed?", labelAr: "هل مفتاح %1 مضغوط؟", inputs: [{ name: "key", type: "dropdown", default: "space", options: ["space", "up arrow", "down arrow", "left arrow", "right arrow"] }] },
  { id: "timer", type: "timer", category: "sensing", label: "timer", labelAr: "المؤقت" },
  { id: "reset_timer", type: "reset_timer", category: "sensing", label: "reset timer", labelAr: "أعد ضبط المؤقت" },
  // Operators
  { id: "add", type: "add", category: "operators", label: "%1 + %2", labelAr: "%1 + %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "subtract", type: "subtract", category: "operators", label: "%1 - %2", labelAr: "%1 - %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "multiply", type: "multiply", category: "operators", label: "%1 × %2", labelAr: "%1 × %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  { id: "divide", type: "divide", category: "operators", label: "%1 ÷ %2", labelAr: "%1 ÷ %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 1 }] },
  { id: "random", type: "random", category: "operators", label: "pick random %1 to %2", labelAr: "اختر عشوائي %1 إلى %2", inputs: [{ name: "from", type: "number", default: 1 }, { name: "to", type: "number", default: 10 }] },
  { id: "gt", type: "gt", category: "operators", label: "%1 > %2", labelAr: "%1 > %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 50 }] },
  { id: "lt", type: "lt", category: "operators", label: "%1 < %2", labelAr: "%1 < %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 50 }] },
  { id: "eq", type: "eq", category: "operators", label: "%1 = %2", labelAr: "%1 = %2", inputs: [{ name: "a", type: "number", default: 0 }, { name: "b", type: "number", default: 0 }] },
  // Variables
  { id: "set_var", type: "set_var", category: "variables", label: "set %1 to %2", labelAr: "اجعل %1 = %2", inputs: [{ name: "name", type: "string", default: "score" }, { name: "value", type: "number", default: 0 }] },
  { id: "change_var", type: "change_var", category: "variables", label: "change %1 by %2", labelAr: "غيّر %1 بمقدار %2", inputs: [{ name: "name", type: "string", default: "score" }, { name: "value", type: "number", default: 1 }] },
  { id: "show_var", type: "show_var", category: "variables", label: "show variable %1", labelAr: "أظهر المتغير %1", inputs: [{ name: "name", type: "string", default: "score" }] },
];

export const SPRITE_LIBRARY = [
  // Animals (full body)
  { emoji: "🐱", nameAr: "قطة", nameEn: "Cat", category: "animals" },
  { emoji: "🐶", nameAr: "كلب", nameEn: "Dog", category: "animals" },
  { emoji: "🐸", nameAr: "ضفدع", nameEn: "Frog", category: "animals" },
  { emoji: "🦊", nameAr: "ثعلب", nameEn: "Fox", category: "animals" },
  { emoji: "🐻", nameAr: "دب", nameEn: "Bear", category: "animals" },
  { emoji: "🐼", nameAr: "باندا", nameEn: "Panda", category: "animals" },
  { emoji: "🐧", nameAr: "بطريق", nameEn: "Penguin", category: "animals" },
  { emoji: "🦁", nameAr: "أسد", nameEn: "Lion", category: "animals" },
  { emoji: "🐰", nameAr: "أرنب", nameEn: "Rabbit", category: "animals" },
  { emoji: "🐵", nameAr: "قرد", nameEn: "Monkey", category: "animals" },
  { emoji: "🦋", nameAr: "فراشة", nameEn: "Butterfly", category: "animals" },
  { emoji: "🐢", nameAr: "سلحفاة", nameEn: "Turtle", category: "animals" },
  { emoji: "🐙", nameAr: "أخطبوط", nameEn: "Octopus", category: "animals" },
  { emoji: "🦜", nameAr: "ببغاء", nameEn: "Parrot", category: "animals" },
  // People
  { emoji: "🧑", nameAr: "شخص", nameEn: "Person", category: "people" },
  { emoji: "👧", nameAr: "فتاة", nameEn: "Girl", category: "people" },
  { emoji: "👦", nameAr: "ولد", nameEn: "Boy", category: "people" },
  { emoji: "🦸", nameAr: "بطل خارق", nameEn: "Superhero", category: "people" },
  { emoji: "🧙", nameAr: "ساحر", nameEn: "Wizard", category: "people" },
  { emoji: "🧚", nameAr: "جنيّة", nameEn: "Fairy", category: "people" },
  { emoji: "🤖", nameAr: "روبوت", nameEn: "Robot", category: "people" },
  { emoji: "👾", nameAr: "كائن فضائي", nameEn: "Alien", category: "people" },
  { emoji: "💃", nameAr: "راقصة", nameEn: "Dancer", category: "people" },
  // Space & Fantasy
  { emoji: "🚀", nameAr: "صاروخ", nameEn: "Rocket", category: "fantasy" },
  { emoji: "🌍", nameAr: "أرض", nameEn: "Earth", category: "fantasy" },
  { emoji: "🌙", nameAr: "قمر", nameEn: "Moon", category: "fantasy" },
  { emoji: "⭐", nameAr: "نجمة", nameEn: "Star", category: "fantasy" },
  { emoji: "🪐", nameAr: "كوكب", nameEn: "Planet", category: "fantasy" },
  { emoji: "☀️", nameAr: "شمس", nameEn: "Sun", category: "fantasy" },
  { emoji: "🐲", nameAr: "تنين", nameEn: "Dragon", category: "fantasy" },
  { emoji: "🦄", nameAr: "يونيكورن", nameEn: "Unicorn", category: "fantasy" },
  // Objects
  { emoji: "🏀", nameAr: "كرة سلة", nameEn: "Basketball", category: "objects" },
  { emoji: "⚽", nameAr: "كرة قدم", nameEn: "Football", category: "objects" },
  { emoji: "🎈", nameAr: "بالون", nameEn: "Balloon", category: "objects" },
  { emoji: "🎮", nameAr: "وحدة تحكم", nameEn: "Controller", category: "objects" },
  { emoji: "🎪", nameAr: "خيمة سيرك", nameEn: "Circus", category: "objects" },
  { emoji: "🎸", nameAr: "جيتار", nameEn: "Guitar", category: "objects" },
  { emoji: "🍰", nameAr: "كعكة", nameEn: "Cake", category: "objects" },
  { emoji: "🏠", nameAr: "بيت", nameEn: "House", category: "objects" },
];

export const BACKDROP_LIBRARY = [
  { id: "white", color: "#ffffff", nameAr: "أبيض", nameEn: "White" },
  { id: "blue_sky", color: "#87CEEB", nameAr: "سماء زرقاء", nameEn: "Blue Sky" },
  { id: "night", color: "#0a0a2e", nameAr: "ليل", nameEn: "Night" },
  { id: "forest", color: "#228B22", nameAr: "غابة", nameEn: "Forest" },
  { id: "desert", color: "#EDC9AF", nameAr: "صحراء", nameEn: "Desert" },
  { id: "ocean", color: "#006994", nameAr: "محيط", nameEn: "Ocean" },
  { id: "space", color: "#0B0B3B", nameAr: "فضاء", nameEn: "Space" },
  { id: "sunset", color: "#FF6B35", nameAr: "غروب", nameEn: "Sunset" },
  { id: "arctic", color: "#E8F4FD", nameAr: "قطبي", nameEn: "Arctic" },
  { id: "beach", color: "#F5DEB3", nameAr: "شاطئ", nameEn: "Beach" },
];

let _blockCounter = 0;
export const uid = () => `b_${++_blockCounter}_${Date.now()}`;

export const cloneBlock = (b: Block): Block => ({
  ...b,
  id: uid(),
  values: b.values ? { ...b.values } : undefined,
  inputs: b.inputs ? b.inputs.map(i => ({ ...i })) : undefined,
});
