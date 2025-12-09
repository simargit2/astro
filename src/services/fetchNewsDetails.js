export const fetchNewsDetails = async (id) => {
  try {
    const baseUrl = import.meta.env.API_BASE_URL;
    const url = `${baseUrl}/published-news-collection/getFreeNewsById`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        language: "english"
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news details: ${response.status}`);
    }

    const data = await response.json();

    return data;
    
  } catch (error) {
    console.error("fetchNewsDetails error:", error);
    return {
      success: false,
      error: error.message,
      article: {},
    };
  }
};