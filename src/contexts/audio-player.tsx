import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getStream } from "../streams";
import { PlayerApiContext } from "./plays-api";

type AudioState = Record<string, HTMLAudioElement>;
type AudioPositionState = Record<string, number>;

type AudioPlayerContextState = {
  players: AudioState;
  playerPositions: AudioPositionState;
  activeStreamId?: string;
};

type AudioPlayerContextCallbacks = {
  setupPlayer: (streamId: string) => void;
  play: (streamId: string) => void;
  pause: (streamId: string) => void;
  setPosition: (streamId: string, position: number) => void;
};

type AudioPlayerContextValue = AudioPlayerContextState &
  AudioPlayerContextCallbacks;

export const AudioPlayerContext = React.createContext<AudioPlayerContextValue>({
  players: {},
  playerPositions: {},
  setupPlayer: () => {},
  play: () => {},
  pause: () => {},
  setPosition: () => {},
});

export const AudioPlayerContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const activeStreamRef = useRef<string>();
  const [activeStreamId, setActiveStreamId] = useState<string>();
  const [players, setPlayers] = useState<AudioState>({});
  const [playerPositions, setPlayerPositions] = useState<AudioPositionState>(
    {}
  );
  const playerPositionsRef = useRef<AudioPositionState>();
  const timerRef = useRef<number>();
  const { incrementPlayCount } = useContext(PlayerApiContext);

  const playTimerRef = useRef<number>();
  useEffect(() => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = undefined;
    }

    if (
      activeStreamId !== undefined &&
      activeStreamId !== activeStreamRef.current
    ) {
      playTimerRef.current = setTimeout(() => {
        if (activeStreamId === activeStreamRef.current) {
          incrementPlayCount(activeStreamId);
        }
      }, 30000);
    }
    activeStreamRef.current = activeStreamId;
  }, [activeStreamRef, activeStreamId, incrementPlayCount]);

  const startTimer = (audio: HTMLAudioElement, streamId: string) => {
    timerRef.current = setInterval(() => {
      if (playerPositionsRef.current) {
        playerPositionsRef.current[streamId] =
          audio.currentTime / audio.duration;
      }

      setPlayerPositions({ ...playerPositionsRef.current });
    }, 1000);
  };

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
      audio.onplaying = () => {
        startTimer(audio, streamId);
      };
      const stopTimer = () => {
        if (timerRef.current !== undefined) {
          clearInterval(timerRef.current);
          timerRef.current = undefined;
        }
      };
      audio.onpause = stopTimer;
      audio.onerror = stopTimer;

      setPlayers({
        ...players,
        [streamId]: audio,
      });
      if (!playerPositionsRef.current) {
        playerPositionsRef.current = {};
        playerPositionsRef.current[streamId] = 0;
      }
      setPlayerPositions({
        ...playerPositionsRef.current,
        [streamId]: 0,
      });
    },
    [playerPositionsRef, players, setPlayerPositions, setPlayers]
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

      setActiveStreamId(streamId);
      players[streamId].play();
    },
    [activeStreamId, pause, players, setActiveStreamId]
  );

  const setPosition = useCallback(
    (streamId: string, position: number) => {
      position = Math.max(0, Math.min(1, position));
      if (playerPositionsRef.current) {
        playerPositionsRef.current[streamId] = position;
      }
      setPlayerPositions({
        ...playerPositionsRef.current,
      });
      if (!isNaN(players[streamId].duration)) {
        players[streamId].currentTime = position * players[streamId].duration;
      }
    },
    [playerPositionsRef, players, setPlayerPositions]
  );

  return (
    <AudioPlayerContext.Provider
      value={{
        players,
        playerPositions,
        activeStreamId,
        setupPlayer,
        play,
        pause,
        setPosition,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
