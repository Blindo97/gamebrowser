const API_KEY = '8871779f948542c8b6a387351db26075'; // this is a free trial key please replace it with yours from https://rawg.io/apidocs

export const fetchGameDescription = async (gameId: number): Promise<string | null> => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
    const data = await response.json();
    const description = data.description || null;

    return description;
  } catch (error) {
    console.error("Error fetching game description:", error);
    return null;
  }
};
