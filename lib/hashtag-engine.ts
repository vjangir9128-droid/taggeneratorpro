import { NICHE_DATASETS, NicheData } from "@/data/niches";

export type Platform = "youtube" | "instagram" | "facebook" | "tiktok";

export interface HashtagTierItem {
  tag: string;
  tier: "high" | "medium" | "low";
  estimatedPosts?: string;
}

export interface GeneratedTagsResult {
  raw: string; // The formatted string ready for copy (e.g. comma-separated for YouTube, space-separated with # for IG)
  items: HashtagTierItem[];
  characterCount: number;
  maxCharacters?: number;
  itemCount: number;
  targetCountText?: string;
  nicheDetected?: string;
}

// Clean and normalize user topic
function cleanTopic(topic: string): string {
  return topic.trim().replace(/[^\w\s-]/g, "");
}

function toHashtag(str: string): string {
  const clean = str.replace(/[^\w]/g, "");
  return clean ? `#${clean.toLowerCase()}` : "";
}

function toCamelHashtag(words: string[]): string {
  const camel = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
  return `#${camel}`;
}

// Detect niche based on keyword overlap
function findMatchingNiche(topic: string): NicheData | null {
  const normalized = topic.toLowerCase();
  const words = new Set(normalized.split(/\s+/).filter(Boolean));

  let bestMatch: NicheData | null = null;
  let highestScore = 0;

  for (const niche of NICHE_DATASETS) {
    let score = 0;
    // Direct niche category name match
    if (words.has(niche.niche)) score += 6;

    // Check keywords
    for (const kw of niche.keywords) {
      if (kw.includes(" ") && normalized.includes(kw)) {
        score += 5; // multi-word keyword match (e.g. "weight loss", "street food")
      } else if (words.has(kw)) {
        score += 3; // single exact word match
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = niche;
    }
  }

  return highestScore >= 3 ? bestMatch : null;
}

// Keyword Expansion Engine for custom/unmatched topics
function expandKeywordFallback(topic: string) {
  const clean = cleanTopic(topic);
  const words = clean.split(/\s+/).filter(Boolean);
  const baseTag = toHashtag(clean);
  const camelBase = toCamelHashtag(words);

  const modifiersHigh = ["life", "daily", "world", "gram", "love", "community", "inspo"];
  const modifiersMedium = [
    "tips", "hacks", "goals", "journey", "addict", "guide", "routine",
    "trends", "creator", "vibes", "mindset", "content", "hub"
  ];
  const modifiersLow = [
    "forbeginners", "secretsrevealed", "stepbystep", "masterclass2026",
    "blueprint", "tutorialvideo", "dailyinspiration", "growthstrategy",
    "transformation", "recommendations"
  ];

  const high: string[] = [baseTag, `#${words.join("")}`];
  modifiersHigh.forEach((m) => {
    high.push(`#${words.join("")}${m}`);
  });

  const medium: string[] = [];
  modifiersMedium.forEach((m) => {
    medium.push(`#${words.join("")}${m}`);
    if (words.length > 1) {
      medium.push(toCamelHashtag([...words, m]));
    }
  });

  const low: string[] = [];
  modifiersLow.forEach((m) => {
    low.push(toCamelHashtag([...words, m]));
    low.push(`#${words.join("")}${m}`);
  });

  const youtubePhrases: string[] = [
    clean,
    `${clean} 2026`,
    `how to ${clean}`,
    `best ${clean} tips`,
    `${clean} for beginners`,
    `${clean} tutorial`,
    `${clean} guide`,
    `${clean} review`,
    `${clean} secrets`,
    `ultimate ${clean} strategy`,
    `${clean} explained`,
    `${clean} walkthrough`,
    `${clean} hacks`,
    `master ${clean} fast`,
    `${clean} mistakes to avoid`,
  ];

  const tiktokTags: string[] = [
    `${camelBase}Tok`,
    `#${clean.replace(/\s+/g, "")}Tok`,
    `#${words.join("")}Check`,
    `#LearnOnTikTok`,
    `#${clean.replace(/\s+/g, "")}Hacks`,
    `#${clean.replace(/\s+/g, "")}Tips`,
    `#Trending${words[0] || ""}`,
    `#FYP`,
  ];

  const facebookTags: string[] = [
    camelBase,
    `#${words.join("")}Community`,
    `#${words.join("")}Tips`,
    `#${words.join("")}Discussion`,
    `#Daily${words[0] || "Updates"}`,
  ];

  return {
    high: Array.from(new Set(high)).filter(Boolean),
    medium: Array.from(new Set(medium)).filter(Boolean),
    low: Array.from(new Set(low)).filter(Boolean),
    youtubePhrases,
    tiktokTags,
    facebookTags,
  };
}

/**
 * Generate platform-appropriate tags & hashtags
 */
export function generateTags(platform: Platform, topic: string): GeneratedTagsResult {
  const clean = cleanTopic(topic) || "trending";
  const matchedNiche = findMatchingNiche(clean);
  const fallback = expandKeywordFallback(clean);

  if (platform === "youtube") {
    // YouTube rules: Comma-separated tags, maximum 500 characters
    const candidateList: string[] = [];

    // 1. Front-load exact match & topic phrases
    candidateList.push(clean.toLowerCase());
    candidateList.push(`${clean.toLowerCase()} 2026`);
    fallback.youtubePhrases.forEach((t) => candidateList.push(t.toLowerCase()));

    // 2. Add matched niche tags if available to fill remaining budget
    if (matchedNiche) {
      matchedNiche.youtubeTags.forEach((t) => {
        candidateList.push(t.replace("{topic}", clean).toLowerCase());
      });
    }

    // Deduplicate
    const uniqueCandidates = Array.from(new Set(candidateList));

    // Pack into <= 500 characters
    const selectedTags: string[] = [];
    let currentLength = 0;

    for (const tag of uniqueCandidates) {
      const addedLen = selectedTags.length === 0 ? tag.length : tag.length + 2; // +2 for ", "
      if (currentLength + addedLen <= 490) { // keep safe margin below 500
        selectedTags.push(tag);
        currentLength += addedLen;
      } else {
        break;
      }
    }

    const rawString = selectedTags.join(", ");
    const items: HashtagTierItem[] = selectedTags.map((tag, idx) => ({
      tag,
      tier: idx < 3 ? "high" : idx < 8 ? "medium" : "low",
      estimatedPosts: idx < 3 ? "High Volume" : idx < 8 ? "Targeted" : "Long-tail",
    }));

    return {
      raw: rawString,
      items,
      characterCount: rawString.length,
      maxCharacters: 500,
      itemCount: selectedTags.length,
      targetCountText: "Max 500 characters",
      nicheDetected: matchedNiche?.niche,
    };
  }

  if (platform === "instagram") {
    // Instagram rules: 20-30 hashtags, tri-tier strategy (mix of high, medium, low competition)
    const highSource = matchedNiche ? [...matchedNiche.highCompetition, ...fallback.high] : fallback.high;
    const mediumSource = matchedNiche ? [...matchedNiche.mediumCompetition, ...fallback.medium] : fallback.medium;
    const lowSource = matchedNiche ? [...matchedNiche.lowCompetition, ...fallback.low] : fallback.low;

    // We want: 6-8 High, 14-16 Medium, 6-8 Low => total 26-30
    const pickUnique = (arr: string[], count: number, exclude: Set<string>): string[] => {
      const result: string[] = [];
      for (const item of arr) {
        const lower = item.toLowerCase();
        if (!exclude.has(lower) && lower.startsWith("#") && lower.length > 2) {
          result.push(item);
          exclude.add(lower);
          if (result.length >= count) break;
        }
      }
      return result;
    };

    const used = new Set<string>();
    // Always include base topic tag first
    const topicTag = toHashtag(clean);
    if (topicTag) {
      used.add(topicTag.toLowerCase());
    }

    const selectedHigh = pickUnique(highSource, 7, used);
    const selectedMed = pickUnique(mediumSource, 14, used);
    const selectedLow = pickUnique(lowSource, 7, used);

    const items: HashtagTierItem[] = [];
    if (topicTag) {
      items.push({ tag: topicTag, tier: "high", estimatedPosts: "1M+ (Primary)" });
    }

    selectedHigh.forEach((tag) => items.push({ tag, tier: "high", estimatedPosts: "500k - 2M+" }));
    selectedMed.forEach((tag) => items.push({ tag, tier: "medium", estimatedPosts: "50k - 500k" }));
    selectedLow.forEach((tag) => items.push({ tag, tier: "low", estimatedPosts: "5k - 50k (Low Comp)" }));

    // Format raw string with space separation
    const rawString = items.map((i) => i.tag).join(" ");

    return {
      raw: rawString,
      items,
      characterCount: rawString.length,
      maxCharacters: 2200, // IG caption limit
      itemCount: items.length,
      targetCountText: "20 - 30 hashtags",
      nicheDetected: matchedNiche?.niche,
    };
  }

  if (platform === "tiktok") {
    // TikTok rules: 5-8 trending-style hashtags
    const pool = matchedNiche ? [...matchedNiche.tiktokTags, ...fallback.tiktokTags] : fallback.tiktokTags;
    const used = new Set<string>();
    const items: HashtagTierItem[] = [];

    // Always include a topic tag
    const baseTag = toHashtag(clean);
    if (baseTag) {
      items.push({ tag: baseTag, tier: "high", estimatedPosts: "Trending" });
      used.add(baseTag.toLowerCase());
    }

    for (const tag of pool) {
      const lower = tag.toLowerCase();
      if (!used.has(lower) && tag.length > 2) {
        items.push({
          tag: tag.startsWith("#") ? tag : `#${tag}`,
          tier: items.length < 3 ? "high" : "medium",
          estimatedPosts: items.length < 3 ? "Viral / FYP" : "Niche Trend",
        });
        used.add(lower);
        if (items.length >= 7) break;
      }
    }

    const rawString = items.map((i) => i.tag).join(" ");

    return {
      raw: rawString,
      items,
      characterCount: rawString.length,
      maxCharacters: 2200,
      itemCount: items.length,
      targetCountText: "5 - 8 hashtags (Viral Mix)",
      nicheDetected: matchedNiche?.niche,
    };
  }

  // Facebook rules: 3-5 focused hashtags
  const pool = matchedNiche ? [...matchedNiche.facebookTags, ...fallback.facebookTags] : fallback.facebookTags;
  const used = new Set<string>();
  const items: HashtagTierItem[] = [];

  const baseTag = toHashtag(clean);
  if (baseTag) {
    items.push({ tag: baseTag, tier: "high", estimatedPosts: "Core Topic" });
    used.add(baseTag.toLowerCase());
  }

  for (const tag of pool) {
    const lower = tag.toLowerCase();
    if (!used.has(lower) && tag.length > 2) {
      items.push({
        tag: tag.startsWith("#") ? tag : `#${tag}`,
        tier: "medium",
        estimatedPosts: "Community",
      });
      used.add(lower);
      if (items.length >= 5) break;
    }
  }

  const rawString = items.map((i) => i.tag).join(" ");

  return {
    raw: rawString,
    items,
    characterCount: rawString.length,
    itemCount: items.length,
    targetCountText: "3 - 5 hashtags (High Relevance)",
    nicheDetected: matchedNiche?.niche,
  };
}
