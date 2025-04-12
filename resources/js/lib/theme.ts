import { create } from "zustand";

type Theme = "PENDAPATAN" | "PENGELUARAN";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
    theme: "PENDAPATAN",
    setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
