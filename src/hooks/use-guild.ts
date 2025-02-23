import { create } from 'zustand';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
}

interface GuildStore {
  selectedGuild: Guild | null;
  setSelectedGuild: (guild: Guild | null) => void;
}

export const useGuild = create<GuildStore>((set) => ({
  selectedGuild: null,
  setSelectedGuild: (guild) => set({ selectedGuild: guild }),
})); 