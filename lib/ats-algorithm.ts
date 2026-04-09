// ── Client-side directional ATS scoring engine ──
// Weights: Keywords 30%, Structure 20%, Quantification 15%,
//          Action Verbs 15%, Length 10%, Contact Info 10%

// ── Common action verbs recruiters look for ──
const ACTION_VERBS = [
  "achieved","analyzed","built","collaborated","coordinated","created","delivered",
  "designed","developed","directed","drove","engineered","established","evaluated",
  "executed","generated","implemented","improved","increased","launched","led","managed",
  "optimized","oversaw","planned","produced","reduced","resolved","spearheaded","streamlined",
  "supervised","trained","transformed","utilized","architected","automated","configured",
  "debugged","deployed","integrated","migrated","monitored","orchestrated","refactored",
  "scaled","secured","shipped","tested","maintained","negotiated","presented","published",
];

// ── Role → keyword map ──
const ROLE_KEYWORDS: Record<string, string[]> = {
  "software engineer":    ["python","javascript","react","node","sql","git","api","docker","ci/cd","agile","testing","backend","frontend","microservices","aws","cloud"],
  "frontend developer":  ["react","vue","angular","html","css","javascript","typescript","webpack","figma","responsive","accessibility","redux","tailwind"],
  "backend developer":   ["node","python","java","go","sql","postgresql","mongodb","rest","graphql","docker","kubernetes","aws","redis","microservices"],
  "data scientist":      ["python","r","machine learning","sql","tensorflow","pytorch","pandas","numpy","statistics","visualization","jupyter","scikit","nlp","deep learning"],
  "data analyst":        ["sql","excel","python","tableau","power bi","analytics","dashboard","reporting","etl","data cleaning","visualization","kpi"],
  "product manager":     ["roadmap","agile","scrum","stakeholder","user research","a/b testing","metrics","kpi","sprint","backlog","mvp","strategy","cross-functional"],
  "ux designer":         ["figma","wireframe","prototype","user research","usability","accessibility","design system","adobe xd","sketch","interaction","information architecture"],
  "ui designer":         ["figma","sketch","adobe xd","css","design system","responsive","typography","color theory","prototype","ui","animation"],
  "devops engineer":     ["docker","kubernetes","aws","gcp","azure","ci/cd","jenkins","terraform","ansible","monitoring","linux","bash","git","pipeline"],
  "marketing manager":   ["campaign","seo","sem","social media","analytics","brand","content","email","roi","conversion","lead generation","crm","google ads"],
  "business analyst":    ["requirements","stakeholder","process","uml","sql","excel","agile","documentation","analysis","workflow","erp","sap"],
  "project manager":     ["pmp","agile","scrum","budget","stakeholder","risk","timeline","gantt","sprint","milestone","resource","communication"],
  "nurse":               ["patient care","clinical","medication","ehr","bls","acls","emr","hipaa","assessment","documentation","teamwork","critical thinking"],
  "teacher":             ["curriculum","lesson plan","classroom management","assessment","differentiated instruction","student engagement","ib","cbse"],
  "financial analyst":   ["financial modeling","excel","valuation","dcf","bloomberg","sql","python","reporting","p&l","budget","forecasting","cfa"],
  "lawyer":              ["litigation","contract","legal research","westlaw","lexis","drafting","compliance","negotiation","discovery","brief"],
  "default": ["communication","teamwork","leadership","problem solving","analytical","detail-oriented","results-driven","collaborative"],
};

function getKeywordsForRole(role: string): string[] {
  const lower = role.toLowerCase();
  for (const key of Object.keys(ROLE_KEYWORDS)) {
    if (lower.includes(key)) return [...ROLE_KEYWORDS[key], ...ROLE_KEYWORDS.default];
  }
  return ROLE_KEYWORDS.default;
}

// ── Required resume sections ──
const REQUIRED_SECTIONS = [
  { name: "Contact Info",    patterns: [/email|phone|linkedin|location|address|\@/i] },
  { name: "Summary",         patterns: [/summary|objective|profile|about/i] },
  { name: "Experience",      patterns: [/experience|employment|work history|career|professional/i] },
  { name: "Education",       patterns: [/education|degree|university|college|school|qualification/i] },
  { name: "Skills",          patterns: [/skills|technologies|tools|competencies|proficiencies/i] },
];

// ── Count quantified achievements (numbers + % + $) ──
function countQuantified(text: string): number {
  const matches = text.match(/\b\d+[\d,]*\s*(%|percent|x|×|times|million|billion|thousand|k\b|\$|₹|£|€|users|customers|clients|members|employees|hours|days|weeks|months|years|points|score|rank|projects|teams?)\b/gi);
  return matches ? matches.length : 0;
}

// ── Detect poor formatting patterns ──
function detectFormattingIssues(text: string): string[] {
  const issues: string[] = [];
  if (text.includes("  ")) issues.push("Multiple consecutive spaces detected");
  if (/[|]{2,}/.test(text)) issues.push("Tables may not parse correctly in ATS");
  if (text.split("\n").some(l => l.length > 120)) issues.push("Some lines exceed 120 characters");
  return issues;
}

export interface ClientATSResult {
  keywordScore: number;
  structureScore: number;
  quantificationScore: number;
  actionVerbScore: number;
  lengthScore: number;
  contactScore: number;
  overallPreScore: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  sectionsPresent: string[];
  sectionsMissing: string[];
  quantifiedCount: number;
  actionVerbsFound: string[];
  wordCount: number;
  formattingIssues: string[];
}

export function runClientATS(resumeText: string, targetRole: string): ClientATSResult {
  const text = resumeText.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // ── 1. Keywords (30%) ──
  const keywords = getKeywordsForRole(targetRole);
  const found = keywords.filter(kw => text.includes(kw.toLowerCase()));
  const missing = keywords.filter(kw => !text.includes(kw.toLowerCase()));
  const keywordScore = Math.min(100, Math.round((found.length / Math.max(keywords.length, 1)) * 100));

  // ── 2. Section Structure (20%) ──
  const sectionsPresent: string[] = [];
  const sectionsMissing: string[] = [];
  for (const sec of REQUIRED_SECTIONS) {
    const present = sec.patterns.some(p => p.test(resumeText));
    if (present) sectionsPresent.push(sec.name);
    else sectionsMissing.push(sec.name);
  }
  const structureScore = Math.round((sectionsPresent.length / REQUIRED_SECTIONS.length) * 100);

  // ── 3. Quantified Achievements (15%) ──
  const quantifiedCount = countQuantified(resumeText);
  // 5+ quantified achievements = 100, scale linearly
  const quantificationScore = Math.min(100, Math.round((quantifiedCount / 5) * 100));

  // ── 4. Action Verbs (15%) ──
  const actionVerbsFound = ACTION_VERBS.filter(v => text.includes(v));
  // 6+ action verbs = 100
  const actionVerbScore = Math.min(100, Math.round((actionVerbsFound.length / 6) * 100));

  // ── 5. Length (10%) — ideal: 300–900 words ──
  let lengthScore: number;
  if (wordCount < 100) lengthScore = 20;
  else if (wordCount < 250) lengthScore = 50;
  else if (wordCount <= 900) lengthScore = 100;
  else if (wordCount <= 1200) lengthScore = 80;
  else lengthScore = 55; // Too long

  // ── 6. Contact Info (10%) ──
  const hasEmail = /@[\w.-]+\.\w{2,}/.test(resumeText);
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(resumeText);
  const hasLinkedIn = /linkedin/i.test(resumeText);
  const hasLocation = /(city|state|country|india|mumbai|delhi|bangalore|hyderabad|chennai|pune|usa|uk|canada|\b[A-Z][a-z]+,\s*[A-Z]{2}\b)/i.test(resumeText);
  const contactChecks = [hasEmail, hasPhone, hasLinkedIn, hasLocation];
  const contactScore = Math.round((contactChecks.filter(Boolean).length / 4) * 100);

  // ── Weighted overall ──
  const overallPreScore = Math.round(
    keywordScore * 0.30 +
    structureScore * 0.20 +
    quantificationScore * 0.15 +
    actionVerbScore * 0.15 +
    lengthScore * 0.10 +
    contactScore * 0.10
  );

  const formattingIssues = detectFormattingIssues(resumeText);

  return {
    keywordScore,
    structureScore,
    quantificationScore,
    actionVerbScore,
    lengthScore,
    contactScore,
    overallPreScore,
    keywordsFound: found,
    keywordsMissing: missing.slice(0, 15),
    sectionsPresent,
    sectionsMissing,
    quantifiedCount,
    actionVerbsFound: actionVerbsFound.slice(0, 10),
    wordCount,
    formattingIssues,
  };
}

// Convert resume data object to plain text for ATS scoring
export function resumeDataToText(data: {
  name?: string; role?: string; email?: string; phone?: string;
  location?: string; linkedin?: string; summary?: string;
  skills?: string[];
  experience?: { title: string; company: string; duration: string; description: string }[];
  education?: { degree: string; institution: string; year: string }[];
}): string {
  const lines: string[] = [];
  if (data.name) lines.push(data.name);
  if (data.role) lines.push(data.role);
  if (data.email) lines.push(data.email);
  if (data.phone) lines.push(data.phone);
  if (data.location) lines.push(data.location);
  if (data.linkedin) lines.push(data.linkedin);
  if (data.summary) lines.push("Summary\n" + data.summary);
  if (data.experience?.length) {
    lines.push("Experience");
    data.experience.forEach(e => lines.push(`${e.title} at ${e.company} (${e.duration})\n${e.description}`));
  }
  if (data.education?.length) {
    lines.push("Education");
    data.education.forEach(e => lines.push(`${e.degree} - ${e.institution} (${e.year})`));
  }
  if (data.skills?.length) {
    lines.push("Skills\n" + data.skills.join(", "));
  }
  return lines.join("\n\n");
}
