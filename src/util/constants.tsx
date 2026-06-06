import { obtainByType } from "../types/constantType";

export const PRINTERS = [
  "",
  "backpack printer",
  "small printer",
  "medium printer",
  "large printer",
];

export const OBTAIN_BY = {
  mining: { from: "mining" },
  smelting: { from: "smelting", id: "i84-t3" },
  atmosphericCondenser: { from: "atmospheric condenser", id: "i87-t3" },
  chemistryLab: { from: "chemistry lab", id: "i86-t3" },
} as obtainByType;
