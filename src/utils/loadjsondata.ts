export async function loadJsonData(url: string) {
  try {
    const jsonUrl = new URL(`../content/${url}`, import.meta.url).href;
    const response = await fetch(jsonUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading JSON data:", error, "URL:", url);
    throw error;
  }
}
