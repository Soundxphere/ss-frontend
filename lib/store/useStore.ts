import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createGlobalAppStateSlice from "./createGlobalAppStateSlice";
import createOrbisSlice from "./createOrbisSlice";
import createProfileEditSlice from "./createProfileEditSlice";

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type State = StateFromFunctions<
  [
    typeof createGlobalAppStateSlice,
    typeof createOrbisSlice,
    typeof createProfileEditSlice,
  ]
>;

export const useStore = create<State>()(
  devtools(
    (set, get, store) => ({
      ...createGlobalAppStateSlice(set, get, store),
      ...createOrbisSlice(set, get, store),
      ...createProfileEditSlice(set, get, store),
    }),
    { name: "sentiment-drips" },
  ),
);
