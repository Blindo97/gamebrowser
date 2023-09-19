import { Tag } from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import { useEffect, useState } from "react";

interface Props {
  game: Game;
}

const GameRatings = ({ game }: Props) => {
  const [color, setColor] = useState("");
  const rating = game.metacritic;

  useEffect(() => {
    if (rating >= 80) {
      setColor("green");
    } else if (rating >= 50 && rating < 80) {
      setColor("yellow");
    } else {
      setColor("red");
    }
  }, [rating]);

  return (
    <Tag fontSize="15px" colorScheme={color}>
      {game.metacritic}
    </Tag>
  );
};

export default GameRatings;
