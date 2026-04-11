export interface BlockInput {
  name: string;
  type: "number" | "string" | "dropdown";
  default: string | number;
  options?: string[];
}

export interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  labelAr: string;
  inputs?: BlockInput[];
  values?: Record<string, string | number>;
  children?: Block[];
}

export interface Sprite {
  id: string;
  name: string;
  nameEn: string;
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

export interface Category {
  id: string;
  label: string;
  labelAr: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
}

export type Language = "ar" | "en";
