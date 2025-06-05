const apiKey =
  import.meta.env.VITE_API_KEY ??
  "live_TvpSUchzwViDMtV85zilyB9NY9RH8Zz0atuDHnSP9X5LycsRtLQFoCh52EhzfwrQ";

export const fetchData = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`https://api.thecatapi.com/v1${url}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
};
