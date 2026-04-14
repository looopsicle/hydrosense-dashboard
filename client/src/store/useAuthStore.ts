import { create } from 'zustand';

interface User {
    id: string;
    username: string;
    password: string;
}

interface AuthState {
    user: User | null;

    setLogin: (user: User) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    setLogin: (user) => set({ user }),

    setLogout: () => set({ user: null }),
}));