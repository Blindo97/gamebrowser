import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import GameRatings from "./GameRatings";
import getCroppedImageUrl from "../services/image-url";
import GameModal from "./GameModal";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card onClick={onOpen}>
        <Image src={getCroppedImageUrl(game.background_image)} />
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <GameRatings game={game} />
          </HStack>
          <Heading fontSize="2xl">{game.name}</Heading>
        </CardBody>
      </Card>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="5xl"
      >
        <GameModal game={game} />
      </Modal>
    </>
  );
};

export default GameCard;
