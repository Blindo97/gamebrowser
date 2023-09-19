import {
  Button,
  HStack,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import GameRatings from "./GameRatings";
import getCroppedImageUrl from "../services/image-url";
import { useEffect, useState } from "react";
import { fetchGameDescription } from "../hooks/getDescription";

interface Props {
  game: Game;
}

const GameModal = ({ game }: Props) => {
  const [description, setDescription] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchGameDescription(game.id).then((result) => {
      setDescription(result);
    });
  }, [game.id]);

  let shownDescription = "";
  const limit = 240;

  if (description) {
    if (isExpanded || description.length <= limit) {
      shownDescription = description;
    } else {
      shownDescription = description.slice(0, limit) + "...";
    }
  }

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent>
        <ModalHeader>{game.name}</ModalHeader>
        <ModalCloseButton />
        {!isMobile && (
          <ModalBody>
            <Tabs defaultIndex={0}>
              <TabPanels>
                {game.short_screenshots.map((s) => (
                  <TabPanel key={s.id}>
                    <Image width={1024} height={550} key={s.id} src={s.image} />
                  </TabPanel>
                ))}
              </TabPanels>
              <TabList>
                {game.short_screenshots.map((list) => (
                  <Tab maxWidth={150} key={list.id}>
                    <Image src={getCroppedImageUrl(list.image)} />
                  </Tab>
                ))}
              </TabList>
            </Tabs>
            <HStack marginTop={2} justifyContent="space-between">
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />
              <GameRatings game={game} />
            </HStack>
          </ModalBody>
        )}
        <ModalFooter display="flex">
          {description && (
            <>
              <VStack>
                <Text fontSize="2xl">About the game</Text>
                <p dangerouslySetInnerHTML={{ __html: shownDescription }}></p>
                <Button onClick={toggleDescription}>
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              </VStack>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default GameModal;
