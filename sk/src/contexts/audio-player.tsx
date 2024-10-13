import React, { useCallback, useState } from "react";
import { getStream } from "../streams";

type AudioPlayerContextState = {
  players: Record<string, HTMLAudioElement>;
  activeStreamId?: string;
};

type AudioPlayerContextCallbacks = {
  setupPlayer: (streamId: string) => void;
  play: (streamId: string) => void;
  pause: (streamId: string) => void;
};

type AudioPlayerContextValue = AudioPlayerContextState &
  AudioPlayerContextCallbacks;

export const AudioPlayerContext = React.createContext<AudioPlayerContextValue>({
  players: {},
  setupPlayer: () => {},
  play: () => {},
  pause: () => {},
});

export const AudioPlayerContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [activeStreamId, setActiveStreamId] = useState<string>();
  const [players, setPlayers] = useState({});

  const setupPlayer = useCallback(
    (streamId: string) => {
      if (streamId in players) {
        console.error(
          `trying to register already-registered stream: ${streamId}`
        );
        return;
      }

      const stream = getStream(streamId);
      if (!stream) {
        console.error(`trying to load unknown stream: ${streamId}`);
        return;
      }

      const audio = document.createElement("audio");
      audio.src = stream.url;
      audio.crossOrigin = "anonymous";
      audio.preload = "metadata";
      audio.id = streamId;
      audio.onended = () => {
        audio.currentTime = 0;
        setActiveStreamId(undefined);
      };

      setPlayers({
        ...players,
        [streamId]: audio,
      });
    },
    [players, setPlayers]
  );

  const pause = useCallback(
    (streamId: string) => {
      if (!(streamId in players)) {
        console.error(`trying to play unregistered stream: ${streamId}`);
        return;
      }

      players[streamId].pause();

      setActiveStreamId(undefined);
    },
    [players, setActiveStreamId]
  );

  const play = useCallback(
    (streamId: string) => {
      if (!(streamId in players)) {
        console.error(`trying to play unregistered stream: ${streamId}`);
        return;
      }

      if (activeStreamId === streamId) {
        console.error(
          `trying to play the currently-playing stream: ${streamId}`
        );
        return;
      }

      if (activeStreamId) {
        pause(activeStreamId);
      }

      players[streamId].play();

      setActiveStreamId(streamId);
    },
    [activeStreamId, pause, players, setActiveStreamId]
  );

  return (
    <AudioPlayerContext.Provider
      value={{ players, activeStreamId, setupPlayer, play, pause }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
