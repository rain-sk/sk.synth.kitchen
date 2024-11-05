import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import { getStream, StreamInfo } from "../data/streams";
import { PlayerApiContext } from "./plays-api";
import ReactPlayer from "react-player/file";

type AudioState = {
  info: StreamInfo;
  ref: React.RefObject<ReactPlayer>;
};
type AudioStates = Record<string, AudioState>;
type AudioPositionState = Record<string, number>;

type AudioPlayerContextState = {
  players: AudioStates;
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
  const [players, setPlayers] = useState<AudioStates>({});
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

  const startTimer = (player: AudioState, streamId: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      if (playerPositionsRef.current) {
        playerPositionsRef.current[streamId] =
          (player.ref.current?.getCurrentTime() ?? 0) /
          (player.ref.current?.getDuration() ?? 1);
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

      // todo set up the player state
      const player = {
        info: stream,
        ref: React.createRef<ReactPlayer>(),
      };

      const stopTimer = () => {
        if (timerRef.current !== undefined) {
          clearInterval(timerRef.current);
          timerRef.current = undefined;
        }
      };

      const setupPlayer = () =>
        new Promise<ReactPlayer>((resolve) => {
          const container = document.createElement("div");
          ReactDOM.createRoot(container).render(
            <ReactPlayer
              ref={player.ref}
              url={player.info.url}
              onEnded={() => {
                player.ref.current?.seekTo(0);
                setActiveStreamId(undefined);
              }}
              onPlay={() => {
                startTimer(player, streamId);
              }}
              onPause={stopTimer}
              onError={stopTimer}
            />
          );
          const interval = setInterval(checkRef, 10);
          function checkRef() {
            if (player.ref.current) {
              resolve(player.ref.current);
              clearInterval(interval);
            }
          }
        });

      setupPlayer().then((/*reactPlayer*/) => {
        setPlayers({
          ...players,
          [streamId]: player,
        });
        if (!playerPositionsRef.current) {
          playerPositionsRef.current = {};
          playerPositionsRef.current[streamId] = 0;
        }
        setPlayerPositions({
          ...playerPositionsRef.current,
          [streamId]: 0,
        });
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

      if (players[streamId].ref.current) {
        (players[streamId].ref.current as any).player.player.player.pause();
        setActiveStreamId(undefined);
      }
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

      if (players[streamId].ref.current) {
        setActiveStreamId(streamId);
        (players[streamId].ref.current as any).player.player.player.play();
      }
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
      const player = players[streamId].ref.current;
      if (player && !isNaN(player.getDuration())) {
        player.seekTo(position * player.getDuration());
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
