export const areKeywordsOnPage = async (url: string, keywords?: string[]) => {
  if (!Array.isArray(keywords)) return false;

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/scan-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      keywords,
    }),
  });

  return await response.json();
};
