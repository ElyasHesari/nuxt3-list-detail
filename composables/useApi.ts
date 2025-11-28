export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;

  const fetchWithError = async (url: string, options?: any): Promise<any> => {
    try {
      const data = await $fetch(url, {
        baseURL,
        headers: {
          "Accept-Language": "en",
        },
        ...options,
      });
      return data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage:
          error.statusMessage || "An error occurred while fetching data",
        fatal: true,
      });
    }
  };

  return {
    fetchWithError,
  };
};
