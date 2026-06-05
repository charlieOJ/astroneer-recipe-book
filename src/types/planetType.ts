export interface PlanetType {
  id: string;
  slug?: number;
  name: string;
  icon: string;
  image: string;
  type: string;
  typeDescription: string;
  resources: {
    primary: string | null;
    secondary: string | null;
    gases: GasType[] | null;
  };
  dayNightCycle: string;
  difficulty: string;
  sun: string;
  wind: string;
  gateway: {
    chamberPower: number;
    icon: string;
    material: string;
  };
  hazards: HazardInfoType[];
}

export interface GasType {
  id: string;
  ppu: number;
}

interface HazardInfoType {
  id: string;
  location: string;
}
