export const fetchNews = async ({ date, page, limit, sector }) => {
  try {
    const baseUrl = import.meta.env.API_BASE_URL;
    const url = `${baseUrl}/published-news-collection/free`;

    console.log('Making API request to:', url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ date, page, limit, sector }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchNews error:", error);
    return {
      success: false,
      error: error.message,
      articles: [],
    };
  }
};


export const fetchExtraFree = async ({ sector, id, language, companies }) => {
  try {
    const baseUrl = import.meta.env.API_BASE_URL;
    const url = `${baseUrl}/published-news-collection/extraFree`;

    console.log('Making API request to:', url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ sector,id, language, companies }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchExtraNews error:", error);
    return {
      success: false,
      error: error.message,
      articles: [],
    };
  }
};