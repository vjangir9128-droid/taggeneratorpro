import { Platform } from "./hashtag-engine";

export type ContentType = "hashtags" | "title" | "description" | "bio" | "all";

export interface GenerationOptions {
  tone?: "viral" | "professional" | "casual" | "informative";
  audience?: string;
}

export interface GeneratedContentPack {
  title?: string;
  description?: string;
  bio?: string;
  tags?: string;
}

interface ProviderResponse {
  title?: string;
  description?: string;
  bio?: string;
}

// Fallback smart heuristic generator when no API key is provided
function generateSmartHeuristicContent(
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): ProviderResponse {
  const clean = topic.trim();
  const capTopic = clean.charAt(0).toUpperCase() + clean.slice(1);
  const tone = options?.tone || "viral";

  let title = "";
  let description = "";
  let bio = "";

  if (platform === "youtube") {
    // Title under 100 characters, front-loaded keywords
    const titles = [
      `${capTopic}: The Complete 2026 Step-By-Step Guide`,
      `How to Master ${capTopic} in 2026 (Beginner to Pro)`,
      `I Tried ${capTopic} for 30 Days: The Shocking Results`,
      `The 5 Biggest ${capTopic} Mistakes You Must Stop Making`,
      `The Ultimate ${capTopic} Blueprint That Actually Works`,
    ];
    title = titles[Math.floor(Math.random() * titles.length)];

    // Description: 150-300 words with keyword placement + suggested hashtags at the end
    description = `In this video, we break down everything you need to know about ${clean}. Whether you are just getting started or looking to optimize your approach in 2026, this step-by-step breakdown gives you the exact strategies and proven techniques to see real results with ${clean}.

Timestamps:
0:00 - Introduction to ${capTopic}
1:15 - Key Fundamentals & Common Traps
3:40 - The 3-Step Action Plan
6:20 - Real-World Examples & Optimization
8:55 - Final Takeaways & Next Steps

🔔 Subscribe for weekly in-depth tutorials, practical breakdowns, and actionable tips to elevate your craft! If you found this helpful, hit the like button and drop your thoughts in the comments below.

#${clean.replace(/\s+/g, "")} #${clean.replace(/\s+/g, "")}Tips #YouTube2026`;

    // Channel Bio
    bio = `Welcome to the official channel for ${clean}! We bring you weekly tutorials, expert breakdowns, and actionable guides to help you achieve your goals. Subscribe for new videos every Tuesday & Friday! 🚀`;
  } else if (platform === "instagram") {
    // Caption / Title hook
    const hooks = [
      `Save this for later! 📌 Here is the truth about ${clean}:`,
      `Stop doing ${clean} the hard way. Try this instead 👇`,
      `3 simple rules for ${clean} that will change your results ✨`,
      `Everything you were told about ${clean} is backwards. Here is why:`,
    ];
    title = hooks[Math.floor(Math.random() * hooks.length)];

    // Post Description
    description = `${title}

Most people struggle with ${clean} because they focus on the wrong details. If you want sustainable progress, here is the exact framework to follow:

1️⃣ Focus on consistency over intensity
2️⃣ Eliminate unnecessary complexity
3️⃣ Measure what actually matters

Drop a "🔥" in the comments if you agree, or share this with someone who needs to see it!

Double tap if this resonated with you ❤️
Save this post for your next session 📲`;

    // Bio: Under 150 characters
    bio = `✨ Simplifying ${clean} for everyday growth\n💡 Actionable tips & routines\n👇 Grab the free guide below\nlinktr.ee/yourpage`;
  } else if (platform === "tiktok") {
    // Punchy caption / title
    const tiktokHooks = [
      `Don't scroll if you care about ${clean} 😳`,
      `The ${clean} hack nobody talks about 🤫`,
      `This one ${clean} trick changed everything 🔥`,
      `POV: You finally figured out ${clean} in 2026 🤯`,
    ];
    title = tiktokHooks[Math.floor(Math.random() * tiktokHooks.length)];

    // Video description
    description = `If you want to level up your ${clean}, watch until the end. Like and follow for part 2! 👀`;

    // Profile Bio: Under 80 characters
    bio = `⚡ Daily ${clean} hacks & tips\n👇 Join 100k+ below`;
  } else {
    // Facebook
    title = `${capTopic}: What Most People Don't Realize About It`;

    description = `Let's have an honest discussion about ${clean}.\n\nOver the past year, one of the biggest lessons I've learned about ${clean} is that small, steady adjustments create far more lasting impact than trying to do everything all at once.\n\nWhat has your experience been with ${clean}? Are you satisfied with your current approach, or are you looking to switch things up?\n\nLet me know your thoughts in the comments below! 👇`;

    bio = `The official community page for ${clean} enthusiasts. Sharing practical advice, real-world discussions, and helpful resources every single day. Welcome to the community!`;
  }

  // Filter based on requested contentType
  if (contentType === "title") return { title };
  if (contentType === "description") return { description };
  if (contentType === "bio") return { bio };

  return { title, description, bio };
}

// Call LLM with platform constraints
export async function generateWithAI(
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): Promise<ProviderResponse> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const preferredProvider = process.env.AI_PROVIDER?.toLowerCase() || "auto";

  // If no external keys are configured, use high-quality heuristic engine
  if (!geminiKey && !openaiKey && !anthropicKey) {
    return generateSmartHeuristicContent(platform, contentType, topic, options);
  }

  const prompt = buildPrompt(platform, contentType, topic, options);

  // Try Gemini if available
  if (
    (preferredProvider === "gemini" || preferredProvider === "auto") &&
    geminiKey
  ) {
    try {
      return await callGemini(geminiKey, prompt, platform, contentType, topic, options);
    } catch (err) {
      console.warn("Gemini call failed, falling back:", err);
    }
  }

  // Try OpenAI if available
  if (
    (preferredProvider === "openai" || preferredProvider === "auto") &&
    openaiKey
  ) {
    try {
      return await callOpenAI(openaiKey, prompt, platform, contentType, topic, options);
    } catch (err) {
      console.warn("OpenAI call failed, falling back:", err);
    }
  }

  // Try Anthropic if available
  if (
    (preferredProvider === "anthropic" || preferredProvider === "auto") &&
    anthropicKey
  ) {
    try {
      return await callAnthropic(anthropicKey, prompt, platform, contentType, topic, options);
    } catch (err) {
      console.warn("Anthropic call failed, falling back:", err);
    }
  }

  // Final fallback to heuristic
  return generateSmartHeuristicContent(platform, contentType, topic, options);
}

function buildPrompt(
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): string {
  const tone = options?.tone || "engaging";

  const instructions: Record<Platform, string> = {
    youtube: `Generate YouTube content for topic: "${topic}".
- Title: Must be under 100 characters, front-loaded with search keywords, high CTR.
- Description: 150-300 words with natural keyword placement, timestamps placeholder (0:00, 1:30, etc.), subscribe CTA, and 3 hashtags at the end.
- Bio: Channel about section with value proposition, upload schedule, and CTA.`,
    instagram: `Generate Instagram content for topic: "${topic}".
- Title: Hook/First line of caption designed to prevent scrolling.
- Description: Engaging post caption with line breaks, emojis, bullet points, and CTA.
- Bio: Instagram profile bio STRICTLY under 150 characters, 3-4 bullet points with emojis, link in bio CTA.`,
    tiktok: `Generate TikTok content for topic: "${topic}".
- Title: Short punchy hook caption under 50 characters.
- Description: 1-2 sentence video description with viral hook and CTA.
- Bio: TikTok profile bio STRICTLY under 80 characters with concise punchy value prop.`,
    facebook: `Generate Facebook content for topic: "${topic}".
- Title: Conversational post headline encouraging engagement.
- Description: Relatable, story-driven post description with community question.
- Bio: Page "About" section for a Facebook business/creator page.`,
  };

  return `You are TagGeneratorPro, an elite social media copywriter.
Tone: ${tone}.
Platform: ${platform}.
Requested Content: ${contentType}.

${instructions[platform]}

Return your response strictly as valid JSON matching this structure:
{
  "title": "...",
  "description": "...",
  "bio": "..."
}
Do not wrap in markdown quotes or extra commentary. Return only valid JSON.`;
}

// Gemini API integration
async function callGemini(
  apiKey: string,
  prompt: string,
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): Promise<ProviderResponse> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.statusText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");

  return JSON.parse(text);
}

// OpenAI API integration
async function callOpenAI(
  apiKey: string,
  prompt: string,
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): Promise<ProviderResponse> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are TagGeneratorPro. Output only valid JSON." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI content");
  return JSON.parse(content);
}

// Anthropic API integration
async function callAnthropic(
  apiKey: string,
  prompt: string,
  platform: Platform,
  contentType: ContentType,
  topic: string,
  options?: GenerationOptions
): Promise<ProviderResponse> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error: ${res.statusText}`);
  const data = await res.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("Empty Anthropic text");

  // Extract JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return generateSmartHeuristicContent(platform, contentType, topic, options);
}
