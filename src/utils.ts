export const createUrlParams = (params: Record<string, unknown>): string => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.append(key, String(value));
    }
  });
  return urlParams.toString();
};

export const capitalizeWords = (key: string, delimiter = "_") =>
  key
    .split(delimiter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
