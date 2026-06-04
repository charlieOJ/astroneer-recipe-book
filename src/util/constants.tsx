import { obtainByType } from "../types/constantType";

export const RESOURCES_BASE_URL = "https://static.wikia.nocookie.net/astroneer_gamepedia/images/";

export const PRINTERS = [
  "",
  "backpack printer",
  "small printer",
  "medium printer",
  "large printer",
];

export const OBTAIN_BY = {
  mining: { from: "mining" },
  smelting: { from: "smelting", id: "i81-t3", slug: 80 },
  atmosphericCondenser: { from: "atmospheric condenser", id: "i84-t3", slug: 83 },
  chemistryLab: { from: "chemistry lab", id: "i83-t3", slug: 82 },
} as obtainByType;
