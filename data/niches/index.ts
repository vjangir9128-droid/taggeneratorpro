import fitness from "./fitness.json";
import travel from "./travel.json";
import tech from "./tech.json";
import food from "./food.json";
import fashion from "./fashion.json";
import business from "./business.json";
import gaming from "./gaming.json";
import beauty from "./beauty.json";
import education from "./education.json";
import crypto from "./crypto.json";
import lifestyle from "./lifestyle.json";

export interface NicheData {
  niche: string;
  keywords: string[];
  highCompetition: string[];
  mediumCompetition: string[];
  lowCompetition: string[];
  youtubeTags: string[];
  tiktokTags: string[];
  facebookTags: string[];
  titleTemplates: string[];
  bioSnippets: string[];
}

export const NICHE_DATASETS: NicheData[] = [
  fitness,
  travel,
  tech,
  food,
  fashion,
  business,
  gaming,
  beauty,
  education,
  crypto,
  lifestyle,
];
