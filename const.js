const REELS = 3;
const REEL_HEIGHT = 200;
const SYMBOLS = ["7️⃣", "🍒", "🍑", "🍓", "🍇", "❤️", "🍋", "💎"];
const SYMBOL_HEIGHT = 100;
const SPIN_STEP = 30;
const PAGE = SYMBOLS.length * SYMBOL_HEIGHT;
const PAGE_OFFSET = PAGE - SYMBOL_HEIGHT;
const DRAG_FORCE = 0.005;
const FRICTION_FREE_ITERATIONS = 10;
const CENTER = REEL_HEIGHT / 2 - SYMBOL_HEIGHT / 2;
const DRAG_THRESHOLD = 20;
const SPIN_DELAY = 250;
const FRAME_RATE = 1000 / 30; // 30 FPS
const AUTOPLAY_DELAY = 500;
