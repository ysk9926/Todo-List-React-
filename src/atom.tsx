import { atom } from "recoil";

export interface ITodos {
  text: string;
  id: number;
  category: "TO_DO" | "DONE" | "DOING";
}

export const todoState = atom<ITodos[]>({
  key: "todo",
  default: [],
});
