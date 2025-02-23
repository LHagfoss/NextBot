import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useServerData(guildId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/guilds/${guildId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    isLoading,
    error
  };
} 