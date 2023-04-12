import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodos {
  text: string;
  id: number;
  category: categories;
}

export interface ICusCat {
  category: string;
  id: number;
}

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

export const customCategoryState = atom<ICusCat[]>({
  key: "customCat",
  default: [],
});

export const todoState = atom<ITodos[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoSelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
