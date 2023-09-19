import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

// defining the object type for Game
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
    short_screenshots: Screenshot[];
    description: string;
  }

const useGames = (gameQuery: GameQuery) => useData<Game>('/games',
 {params:
   {genres: gameQuery.genre?.id,
     platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    screenshots: gameQuery.screenshot?.id,
    descriptions: gameQuery.description,
  search: gameQuery.searchText}},
  [gameQuery]);

  


export default useGames;