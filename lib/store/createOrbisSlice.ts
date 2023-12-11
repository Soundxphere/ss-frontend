// @ts-ignore
import { immer } from "zustand/middleware/immer";

type State = {
  orbis: any;
  user: any;
};

type Actions = {
  setOrbis: (orbis: any) => void;
  setUser: (user: any) => void;
};

export default immer<State & Actions>((set, get) => ({
  orbis: undefined,
  user: undefined,

  setOrbis: (orbis) =>
    set((state) => {
      state.orbis = orbis;
    }),

  setUser: (user) =>
    set((state) => {
      state.user = user;
    }),
}));
