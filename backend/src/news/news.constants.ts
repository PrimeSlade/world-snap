export const NEWS_API_CONFIG = {
  BASE_URL: 'https://newsdata.io/api/1/latest',
  DEFAULT_PARAMS: {
    language: 'en',
    image: '1',
    removeduplicate: '1',
    sort: 'pubdateasc',
    size: '10',
  },
} as const;

export const buildNewsApiUrl = (
  apikey: string,
  additionalParams?: Record<string, string>,
): string => {
  const params = new URLSearchParams({
    apikey,
    ...NEWS_API_CONFIG.DEFAULT_PARAMS,
    ...additionalParams,
  });

  return `${NEWS_API_CONFIG.BASE_URL}?${params.toString()}`;
};
