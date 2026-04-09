// ── RESUME TEMPLATES (40 HTML files in /public/templates/resume/) ──
export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  file: string; // path for iframe src
  tags: string[];
  accent: string; // dominant color for card accent
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  { id: "01-minimalist-pro",      name: "Minimalist Pro",       category: "Clean",        file: "/templates/resume/01-minimalist-pro.html",      tags: ["Classic", "ATS ✓"],       accent: "#1a1a1a" },
  { id: "02-bold-sidebar",        name: "Bold Sidebar",         category: "Professional", file: "/templates/resume/02-bold-sidebar.html",        tags: ["Bold", "ATS ✓"],          accent: "#2563eb" },
  { id: "03-creative-cards",      name: "Creative Cards",       category: "Creative",     file: "/templates/resume/03-creative-cards.html",      tags: ["Creative", "Modern"],      accent: "#7c3aed" },
  { id: "04-timeline",            name: "Timeline",             category: "Visual",       file: "/templates/resume/04-timeline.html",            tags: ["Timeline", "Visual"],      accent: "#0891b2" },
  { id: "05-dark-mode",           name: "Dark Mode",            category: "Dark",         file: "/templates/resume/05-dark-mode.html",           tags: ["Dark", "Tech"],            accent: "#a78bfa" },
  { id: "06-infographic",         name: "Infographic",          category: "Visual",       file: "/templates/resume/06-infographic.html",         tags: ["Infographic", "Visual"],   accent: "#f59e0b" },
  { id: "07-editorial",           name: "Editorial",            category: "Elegant",      file: "/templates/resume/07-editorial.html",           tags: ["Editorial", "Elegant"],    accent: "#1e293b" },
  { id: "08-modular-grid",        name: "Modular Grid",         category: "Modern",       file: "/templates/resume/08-modular-grid.html",        tags: ["Grid", "Modern"],          accent: "#3b82f6" },
  { id: "09-split-accent",        name: "Split Accent",         category: "Modern",       file: "/templates/resume/09-split-accent.html",        tags: ["Split", "Accent"],         accent: "#10b981" },
  { id: "10-neo-retro",           name: "Neo Retro",            category: "Retro",        file: "/templates/resume/10-neo-retro.html",           tags: ["Retro", "Bold"],           accent: "#ef4444" },
  { id: "11-software-engineer",   name: "Software Engineer",    category: "Tech",         file: "/templates/resume/11-software-engineer.html",   tags: ["Tech", "ATS ✓"],           accent: "#6366f1" },
  { id: "12-nurse-medical",       name: "Nurse & Medical",      category: "Healthcare",   file: "/templates/resume/12-nurse-medical.html",       tags: ["Healthcare", "Clean"],     accent: "#14b8a6" },
  { id: "13-chef-culinary",       name: "Chef & Culinary",      category: "Culinary",     file: "/templates/resume/13-chef-culinary.html",       tags: ["Culinary", "Creative"],    accent: "#f97316" },
  { id: "14-lawyer-attorney",     name: "Lawyer & Attorney",    category: "Legal",        file: "/templates/resume/14-lawyer-attorney.html",     tags: ["Legal", "Classic"],        accent: "#1e293b" },
  { id: "15-photographer",        name: "Photographer",         category: "Creative",     file: "/templates/resume/15-photographer.html",        tags: ["Photography", "Visual"],   accent: "#7c3aed" },
  { id: "16-teacher-educator",    name: "Teacher & Educator",   category: "Education",    file: "/templates/resume/16-teacher-educator.html",    tags: ["Education", "Clean"],      accent: "#0284c7" },
  { id: "17-data-scientist",      name: "Data Scientist",       category: "Tech",         file: "/templates/resume/17-data-scientist.html",      tags: ["Data", "Tech"],            accent: "#8b5cf6" },
  { id: "18-architect",           name: "Architect",            category: "Design",       file: "/templates/resume/18-architect.html",           tags: ["Design", "Elegant"],       accent: "#64748b" },
  { id: "19-ux-designer",         name: "UX Designer",          category: "Design",       file: "/templates/resume/19-ux-designer.html",         tags: ["Design", "Creative"],      accent: "#ec4899" },
  { id: "20-financial-analyst",   name: "Financial Analyst",    category: "Finance",      file: "/templates/resume/20-financial-analyst.html",   tags: ["Finance", "ATS ✓"],        accent: "#22c55e" },
  { id: "21-royal-portrait",      name: "Royal Portrait",       category: "Luxury",       file: "/templates/resume/21-royal-portrait.html",      tags: ["Luxury", "Premium"],       accent: "#d4af37" },
  { id: "22-glass-morphism",      name: "Glassmorphism",        category: "Modern",       file: "/templates/resume/22-glass-morphism.html",      tags: ["Glass", "Modern"],         accent: "#60a5fa" },
  { id: "23-noir-elegance",       name: "Noir Elegance",        category: "Dark",         file: "/templates/resume/23-noir-elegance.html",       tags: ["Dark", "Elegant"],         accent: "#e2e8f0" },
  { id: "24-aurora-gradient",     name: "Aurora Gradient",      category: "Colorful",     file: "/templates/resume/24-aurora-gradient.html",     tags: ["Gradient", "Colorful"],    accent: "#a855f7" },
  { id: "25-swiss-poster",        name: "Swiss Poster",         category: "Design",       file: "/templates/resume/25-swiss-poster.html",        tags: ["Swiss", "Bold"],           accent: "#dc2626" },
  { id: "26-magazine-spread",     name: "Magazine Spread",      category: "Editorial",    file: "/templates/resume/26-magazine-spread.html",     tags: ["Magazine", "Visual"],      accent: "#f59e0b" },
  { id: "27-blueprint",           name: "Blueprint",            category: "Tech",         file: "/templates/resume/27-blueprint.html",           tags: ["Blueprint", "Technical"],  accent: "#0ea5e9" },
  { id: "28-vogue-editorial",     name: "Vogue Editorial",      category: "Fashion",      file: "/templates/resume/28-vogue-editorial.html",     tags: ["Fashion", "Bold"],         accent: "#1c1c1c" },
  { id: "29-zen-minimal",         name: "Zen Minimal",          category: "Minimal",      file: "/templates/resume/29-zen-minimal.html",         tags: ["Zen", "Clean"],            accent: "#84cc16" },
  { id: "30-neon-punk",           name: "Neon Punk",            category: "Bold",         file: "/templates/resume/30-neon-punk.html",           tags: ["Neon", "Punk"],            accent: "#f0abfc" },
  { id: "31-marble-luxury",       name: "Marble Luxury",        category: "Luxury",       file: "/templates/resume/31-marble-luxury.html",       tags: ["Marble", "Luxury"],        accent: "#d4af37" },
  { id: "32-polaroid-collage",    name: "Polaroid Collage",     category: "Creative",     file: "/templates/resume/32-polaroid-collage.html",    tags: ["Polaroid", "Creative"],    accent: "#fb923c" },
  { id: "33-monochrome-prestige", name: "Monochrome Prestige",  category: "Minimal",      file: "/templates/resume/33-monochrome-prestige.html", tags: ["Mono", "Prestige"],        accent: "#374151" },
  { id: "34-passport-style",      name: "Passport Style",       category: "Unique",       file: "/templates/resume/34-passport-style.html",      tags: ["Passport", "Unique"],      accent: "#1d4ed8" },
  { id: "35-terracotta-warm",     name: "Terracotta Warm",      category: "Warm",         file: "/templates/resume/35-terracotta-warm.html",     tags: ["Warm", "Earthy"],          accent: "#c2410c" },
  { id: "36-diagonal-split",      name: "Diagonal Split",       category: "Modern",       file: "/templates/resume/36-diagonal-split.html",      tags: ["Diagonal", "Bold"],        accent: "#7c3aed" },
  { id: "37-art-deco",            name: "Art Deco",             category: "Vintage",      file: "/templates/resume/37-art-deco.html",            tags: ["Art Deco", "Vintage"],     accent: "#b45309" },
  { id: "38-brutalist-bold",      name: "Brutalist Bold",       category: "Bold",         file: "/templates/resume/38-brutalist-bold.html",      tags: ["Brutalist", "Bold"],       accent: "#111827" },
  { id: "39-watercolor-soft",     name: "Watercolor Soft",      category: "Soft",         file: "/templates/resume/39-watercolor-soft.html",     tags: ["Watercolor", "Soft"],      accent: "#db2777" },
  { id: "40-constellation-dark",  name: "Constellation Dark",   category: "Dark",         file: "/templates/resume/40-constellation-dark.html",  tags: ["Space", "Dark"],           accent: "#818cf8" },
  { id: "41-bubblegum-pop",       name: "Bubblegum Pop",        category: "Playful",      file: "/templates/resume/41-bubblegum-pop.html",       tags: ["Playful", "Colorful"],     accent: "#ff6b9d" },
  { id: "42-retro-arcade",        name: "Retro Arcade",         category: "Retro",        file: "/templates/resume/42-retro-arcade.html",        tags: ["Retro", "Bold"],           accent: "#22c55e" },
  { id: "43-graffiti-street",     name: "Graffiti Street",      category: "Street",       file: "/templates/resume/43-graffiti-street.html",     tags: ["Street", "Creative"],      accent: "#f97316" },
  { id: "44-comic-book",          name: "Comic Book",           category: "Playful",      file: "/templates/resume/44-comic-book.html",          tags: ["Comic", "Fun"],            accent: "#3b82f6" },
  { id: "45-lego-blocks",         name: "Lego Blocks",          category: "Playful",      file: "/templates/resume/45-lego-blocks.html",         tags: ["Blocks", "Fun"],           accent: "#ef4444" },
  { id: "46-psychedelic-wave",    name: "Psychedelic Wave",     category: "Creative",     file: "/templates/resume/46-psychedelic-wave.html",    tags: ["Psychedelic", "Vibrant"],  accent: "#a855f7" },
  { id: "47-sticker-bomb",        name: "Sticker Bomb",         category: "Creative",     file: "/templates/resume/47-sticker-bomb.html",        tags: ["Stickers", "Bold"],        accent: "#f59e0b" },
  { id: "48-neon-gradient",       name: "Neon Gradient",        category: "Colorful",     file: "/templates/resume/48-neon-gradient.html",       tags: ["Neon", "Gradient"],        accent: "#22c55e" },
  { id: "49-carnival-fiesta",     name: "Carnival Fiesta",      category: "Colorful",     file: "/templates/resume/49-carnival-fiesta.html",     tags: ["Fiesta", "Vibrant"],       accent: "#f97316" },
  { id: "50-pixel-grid",          name: "Pixel Grid",           category: "Retro",        file: "/templates/resume/50-pixel-grid.html",          tags: ["Pixel", "Grid"],           accent: "#60a5fa" },
  { id: "51-cloud-whisper",       name: "Cloud Whisper",        category: "Soft",         file: "/templates/resume/51-cloud-whisper.html",       tags: ["Soft", "Clean"],           accent: "#93c5fd" },
  { id: "52-petal-blush",         name: "Petal Blush",          category: "Soft",         file: "/templates/resume/52-petal-blush.html",         tags: ["Soft", "Elegant"],         accent: "#fb7185" },
  { id: "53-morning-mist",        name: "Morning Mist",         category: "Clean",        file: "/templates/resume/53-morning-mist.html",        tags: ["Clean", "Minimal"],        accent: "#94a3b8" },
  { id: "54-linen-paper",         name: "Linen Paper",          category: "Clean",        file: "/templates/resume/54-linen-paper.html",         tags: ["Paper", "Classic"],        accent: "#a3a3a3" },
  { id: "55-sage-garden",         name: "Sage Garden",          category: "Nature",       file: "/templates/resume/55-sage-garden.html",         tags: ["Nature", "Calm"],          accent: "#22c55e" },
  { id: "56-cotton-candy",        name: "Cotton Candy",         category: "Playful",      file: "/templates/resume/56-cotton-candy.html",        tags: ["Pastel", "Sweet"],         accent: "#ec4899" },
  { id: "57-silk-thread",         name: "Silk Thread",          category: "Elegant",      file: "/templates/resume/57-silk-thread.html",         tags: ["Elegant", "Classic"],      accent: "#d4af37" },
  { id: "58-moonlit",             name: "Moonlit",              category: "Dark",         file: "/templates/resume/58-moonlit.html",             tags: ["Dark", "Minimal"],         accent: "#a78bfa" },
  { id: "60-ivory-calm",          name: "Ivory Calm",           category: "Clean",        file: "/templates/resume/60-ivory-calm.html",          tags: ["Calm", "Minimal"],         accent: "#a3a3a3" },
  { id: "61-glitch-matrix",       name: "Glitch Matrix",        category: "Tech",         file: "/templates/resume/61-glitch-matrix.html",       tags: ["Tech", "Cyber"],           accent: "#00ffff" },
  { id: "62-torn-paper",          name: "Torn Paper",           category: "Creative",     file: "/templates/resume/62-torn-paper.html",          tags: ["Paper", "Unique"],         accent: "#f97316" },
  { id: "63-xray",                name: "X-Ray",                category: "Tech",         file: "/templates/resume/63-xray.html",                tags: ["X-Ray", "Monochrome"],     accent: "#60a5fa" },
  { id: "64-redacted-classified", name: "Redacted Classified",  category: "Unique",       file: "/templates/resume/64-redacted-classified.html", tags: ["Redacted", "Unique"],      accent: "#111827" },
  { id: "65-acid-burn",           name: "Acid Burn",            category: "Bold",         file: "/templates/resume/65-acid-burn.html",           tags: ["Acid", "Vibrant"],         accent: "#22c55e" },
  { id: "66-inverted",            name: "Inverted",             category: "Minimal",      file: "/templates/resume/66-inverted.html",            tags: ["Inverted", "Clean"],       accent: "#111827" },
  { id: "67-hazard-tape",         name: "Hazard Tape",          category: "Bold",         file: "/templates/resume/67-hazard-tape.html",         tags: ["Hazard", "Bold"],          accent: "#f59e0b" },
  { id: "68-shattered-glass",     name: "Shattered Glass",      category: "Creative",     file: "/templates/resume/68-shattered-glass.html",     tags: ["Glass", "Unique"],         accent: "#60a5fa" },
  { id: "69-death-metal",         name: "Death Metal",          category: "Dark",         file: "/templates/resume/69-death-metal.html",         tags: ["Metal", "Dark"],           accent: "#e5e7eb" },
  { id: "70-corrupted-file",      name: "Corrupted File",       category: "Tech",         file: "/templates/resume/70-corrupted-file.html",      tags: ["Corrupted", "Glitch"],     accent: "#22c55e" },
  { id: "71-velvet-noir",         name: "Velvet Noir",          category: "Luxury",       file: "/templates/resume/71-velvet-noir.html",         tags: ["Luxury", "Noir"],          accent: "#d4af37" },
  { id: "72-rose-gold",           name: "Rose Gold",            category: "Luxury",       file: "/templates/resume/72-rose-gold.html",           tags: ["Rose Gold", "Elegant"],    accent: "#fb7185" },
  { id: "73-champagne-satin",     name: "Champagne Satin",      category: "Luxury",       file: "/templates/resume/73-champagne-satin.html",     tags: ["Champagne", "Elegant"],    accent: "#d4af37" },
  { id: "74-midnight-silk",       name: "Midnight Silk",        category: "Luxury",       file: "/templates/resume/74-midnight-silk.html",       tags: ["Midnight", "Elegant"],     accent: "#818cf8" },
  { id: "75-marble-onyx",         name: "Marble Onyx",          category: "Luxury",       file: "/templates/resume/75-marble-onyx.html",         tags: ["Marble", "Onyx"],          accent: "#111827" },
  { id: "76-black-tie",           name: "Black Tie",            category: "Luxury",       file: "/templates/resume/76-black-tie.html",           tags: ["Formal", "Classic"],       accent: "#111827" },
  { id: "77-pearl-shimmer",       name: "Pearl Shimmer",        category: "Luxury",       file: "/templates/resume/77-pearl-shimmer.html",       tags: ["Pearl", "Soft"],           accent: "#e5e7eb" },
  { id: "78-obsidian-chrome",     name: "Obsidian Chrome",      category: "Luxury",       file: "/templates/resume/78-obsidian-chrome.html",     tags: ["Chrome", "Dark"],          accent: "#94a3b8" },
  { id: "79-emerald-luxe",        name: "Emerald Luxe",         category: "Luxury",       file: "/templates/resume/79-emerald-luxe.html",        tags: ["Emerald", "Elegant"],      accent: "#22c55e" },
  { id: "80-parisian-elegance",   name: "Parisian Elegance",    category: "Elegant",      file: "/templates/resume/80-parisian-elegance.html",   tags: ["Parisian", "Elegant"],     accent: "#1e293b" },
];

// ── PORTFOLIO STATIC TEMPLATES (20 JS files) ──
export interface PortfolioTemplate {
  id: string;
  name: string;
  category: string;
  emoji: string;
  theme: string;
  animated: boolean;
  scriptVar: string; // window.TPL_* variable name
  file: string;
}

export const PORTFOLIO_STATIC_TEMPLATES: PortfolioTemplate[] = [
  { id: "architect",   name: "Architect",   category: "Blueprint",    emoji: "🏛️",  theme: "blueprint",       animated: false, scriptVar: "TPL_ARCHITECT",   file: "/templates/portfolio/static/tpl-architect.js" },
  { id: "artist",      name: "Artist",      category: "Creative",     emoji: "🎨",  theme: "gallery",         animated: false, scriptVar: "TPL_ARTIST",      file: "/templates/portfolio/static/tpl-artist.js" },
  { id: "barber",      name: "Barber",      category: "Lifestyle",    emoji: "✂️",  theme: "barber",          animated: false, scriptVar: "TPL_BARBER",      file: "/templates/portfolio/static/tpl-barber.js" },
  { id: "carpenter",   name: "Carpenter",   category: "Craft",        emoji: "🔨",  theme: "craft",           animated: false, scriptVar: "TPL_CARPENTER",   file: "/templates/portfolio/static/tpl-carpenter.js" },
  { id: "chef",        name: "Chef",        category: "Culinary",     emoji: "👨‍🍳", theme: "culinary",        animated: false, scriptVar: "TPL_CHEF",        file: "/templates/portfolio/static/tpl-chef.js" },
  { id: "doctor",      name: "Doctor",      category: "Healthcare",   emoji: "🏥",  theme: "medical",         animated: false, scriptVar: "TPL_DOCTOR",      file: "/templates/portfolio/static/tpl-doctor.js" },
  { id: "fashion",     name: "Fashion",     category: "Fashion",      emoji: "👗",  theme: "fashion",         animated: false, scriptVar: "TPL_FASHION",     file: "/templates/portfolio/static/tpl-fashion.js" },
  { id: "filmmaker",   name: "Filmmaker",   category: "Cinema",       emoji: "🎬",  theme: "cinema",          animated: false, scriptVar: "TPL_FILMMAKER",   file: "/templates/portfolio/static/tpl-filmmaker.js" },
  { id: "fitness",     name: "Fitness",     category: "Health",       emoji: "💪",  theme: "fitness",         animated: false, scriptVar: "TPL_FITNESS",     file: "/templates/portfolio/static/tpl-fitness.js" },
  { id: "florist",     name: "Florist",     category: "Nature",       emoji: "🌸",  theme: "floral",          animated: false, scriptVar: "TPL_FLORIST",     file: "/templates/portfolio/static/tpl-florist.js" },
  { id: "journalist",  name: "Journalist",  category: "Media",        emoji: "📰",  theme: "editorial",       animated: false, scriptVar: "TPL_JOURNALIST",  file: "/templates/portfolio/static/tpl-journalist.js" },
  { id: "lawyer",      name: "Lawyer",      category: "Legal",        emoji: "⚖️",  theme: "legal",           animated: false, scriptVar: "TPL_LAWYER",      file: "/templates/portfolio/static/tpl-lawyer.js" },
  { id: "mechanic",    name: "Mechanic",    category: "Technical",    emoji: "🔧",  theme: "mechanical",      animated: false, scriptVar: "TPL_MECHANIC",    file: "/templates/portfolio/static/tpl-mechanic.js" },
  { id: "musician",    name: "Musician",    category: "Music",        emoji: "🎵",  theme: "music",           animated: false, scriptVar: "TPL_MUSICIAN",    file: "/templates/portfolio/static/tpl-musician.js" },
  { id: "photographer",name: "Photographer",category: "Photography",  emoji: "📷",  theme: "photography",     animated: false, scriptVar: "TPL_PHOTOGRAPHER",file: "/templates/portfolio/static/tpl-photographer.js" },
  { id: "pilot",       name: "Pilot",       category: "Aviation",     emoji: "✈️",  theme: "aviation",        animated: false, scriptVar: "TPL_PILOT",       file: "/templates/portfolio/static/tpl-pilot.js" },
  { id: "scientist",   name: "Scientist",   category: "Science",      emoji: "🔬",  theme: "science",         animated: false, scriptVar: "TPL_SCIENTIST",   file: "/templates/portfolio/static/tpl-scientist.js" },
  { id: "teacher",     name: "Teacher",     category: "Education",    emoji: "📚",  theme: "education",       animated: false, scriptVar: "TPL_TEACHER",     file: "/templates/portfolio/static/tpl-teacher.js" },
  { id: "vet",         name: "Veterinarian",category: "Healthcare",   emoji: "🐾",  theme: "veterinary",      animated: false, scriptVar: "TPL_VET",         file: "/templates/portfolio/static/tpl-vet.js" },
  { id: "writer",      name: "Writer",      category: "Literary",     emoji: "✍️",  theme: "literary",        animated: false, scriptVar: "TPL_WRITER",      file: "/templates/portfolio/static/tpl-writer.js" },
  { id: "nova",        name: "Nova",        category: "3D Pop",       emoji: "🌟",  theme: "dark-orange",     animated: true,  scriptVar: "TPL_NOVA",        file: "/templates/portfolio/static/tpl-nova.js" },
  { id: "minimal",     name: "Minimal Pro", category: "Minimal",      emoji: "◻️",  theme: "clean-white",     animated: false, scriptVar: "TPL_MINIMAL",     file: "/templates/portfolio/static/tpl-minimal.js" },
  { id: "musica",      name: "Musica",      category: "Animated",     emoji: "🎸",  theme: "dark-blue",       animated: true,  scriptVar: "TPL_MUSICA",      file: "/templates/portfolio/static/tpl-musica.js" },
];

// ── PORTFOLIO 3D TEMPLATES (12 JS files) ──
export const PORTFOLIO_3D_TEMPLATES: PortfolioTemplate[] = [
  { id: "card-dealer",      name: "Card Dealer",      category: "Casino 3D",      emoji: "🃏", theme: "casino",        animated: true, scriptVar: "TPL_CARD_DEALER",      file: "/templates/portfolio/3d/tpl-card-dealer.js" },
  { id: "clockwork",        name: "Clockwork",        category: "Steampunk 3D",   emoji: "⚙️", theme: "steampunk",     animated: true, scriptVar: "TPL_CLOCKWORK",        file: "/templates/portfolio/3d/tpl-clockwork.js" },
  { id: "dna-helix",        name: "DNA Helix",        category: "Science 3D",     emoji: "🧬", theme: "biology",       animated: true, scriptVar: "TPL_DNA_HELIX",        file: "/templates/portfolio/3d/tpl-dna-helix.js" },
  { id: "luxe",             name: "Luxe",             category: "Luxury 3D",      emoji: "💎", theme: "gold-noir",     animated: true, scriptVar: "TPL_LUXE",             file: "/templates/portfolio/3d/tpl-luxe.js" },
  { id: "music-visualizer", name: "Music Visualizer", category: "Music 3D",       emoji: "🎵", theme: "music",         animated: true, scriptVar: "TPL_MUSIC_VISUALIZER", file: "/templates/portfolio/3d/tpl-music-visualizer.js" },
  { id: "rubiks-cube",      name: "Rubik's Cube",     category: "Puzzle 3D",      emoji: "🎲", theme: "puzzle",        animated: true, scriptVar: "TPL_RUBIKS_CUBE",      file: "/templates/portfolio/3d/tpl-rubiks-cube.js" },
  { id: "slot-machine",     name: "Slot Machine",     category: "Retro 3D",       emoji: "🎰", theme: "retro",         animated: true, scriptVar: "TPL_SLOT_MACHINE",     file: "/templates/portfolio/3d/tpl-slot-machine.js" },
  { id: "solar-system",     name: "Solar System",     category: "Space 3D",       emoji: "🪐", theme: "space",         animated: true, scriptVar: "TPL_SOLAR_SYSTEM",     file: "/templates/portfolio/3d/tpl-solar-system.js" },
  { id: "tv-channel",       name: "TV Channel",       category: "Retro TV 3D",    emoji: "📺", theme: "retro-tv",      animated: true, scriptVar: "TPL_TV_CHANNEL",       file: "/templates/portfolio/3d/tpl-tv-channel.js" },
  { id: "vending-machine",  name: "Vending Machine",  category: "Pop Art 3D",     emoji: "🏪", theme: "pop-art",       animated: true, scriptVar: "TPL_VENDING_MACHINE",  file: "/templates/portfolio/3d/tpl-vending-machine.js" },
  { id: "world",            name: "World",            category: "Globe 3D",       emoji: "🌍", theme: "world",         animated: true, scriptVar: "TPL_WORLD",            file: "/templates/portfolio/3d/tpl-world.js" },
  { id: "zen-garden",       name: "Zen Garden",       category: "Zen 3D",         emoji: "🪨", theme: "zen",           animated: true, scriptVar: "TPL_ZEN_GARDEN",       file: "/templates/portfolio/3d/tpl-zen-garden.js" },
  { id: "abyss",            name: "Abyss",            category: "Immersive 3D",   emoji: "🌊", theme: "deep-ocean",    animated: true, scriptVar: "TPL_ABYSS",            file: "/templates/portfolio/3d/tpl-abyss.js" },
];

export const RESUME_CATEGORIES = [...new Set(RESUME_TEMPLATES.map(t => t.category))];
export const ALL_PORTFOLIO_TEMPLATES = [...PORTFOLIO_STATIC_TEMPLATES, ...PORTFOLIO_3D_TEMPLATES];
