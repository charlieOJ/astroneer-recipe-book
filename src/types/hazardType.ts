export interface HazardType {
  id: string;
  name: string;
  description: string;
  type: "defensive" | "aggressive";
  slug?: number;
}
