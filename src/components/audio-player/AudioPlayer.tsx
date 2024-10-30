import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AudioPlayerContext } from "../../contexts/audio-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import "./AudioPlayer.css";

type AudioPlayerProps = {
  streamId: string;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ streamId }) => {
  const {
    activeStreamId,
    players,
    playerPositions,
    setupPlayer,
    play,
    pause,
    setPosition,
  } = useContext(AudioPlayerContext);
  const [draggingButtonPosition, setDraggingButtonPosition] =
    useState<number>();

  const animationRef = useRef<number>();
  const dragPositionRef = useRef<number>();
  const draggingRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>();

  const initialized = streamId in players;
  const playing = activeStreamId === streamId;
  const playerPosition = playerPositions[streamId];

  const clearAnimation = useCallback(() => {
    if (animationRef.current !== undefined) {
      clearInterval(animationRef.current);
      animationRef.current = undefined;
    }
  }, [animationRef]);

  useEffect(() => {
    if (!initialized) {
      setupPlayer(streamId);
    }
  }, [initialized, setupPlayer, streamId]);

  useEffect(() => {
    clearAnimation();
  }, [clearAnimation, players, playing, streamId]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        clearAnimation();

        draggingRef.current = false;
        dragPositionRef.current = e.screenX;

        const setButtonPosition = (screenX: number) => {
          if (
            buttonRef.current &&
            buttonRef.current.parentElement &&
            dragPositionRef.current
          ) {
            const min = 0;
            const max =
              buttonRef.current.parentElement.clientWidth -
              buttonRef.current.clientWidth;
            const currentPosition = parseFloat(
              buttonRef.current.style.left.replace("px", "")
            );
            const diff = screenX - dragPositionRef.current;
            const newPosition = Math.max(
              min,
              Math.min(max, currentPosition + diff)
            );
            setDraggingButtonPosition(newPosition);
            dragPositionRef.current = screenX;
          }
        };

        const seekToButtonPosition = () => {
          if (buttonRef.current && buttonRef.current.parentElement) {
            const position = parseFloat(
              buttonRef.current.style.left.replace("px", "")
            );

            const relativePosition =
              position /
              (buttonRef.current.parentElement.clientWidth -
                buttonRef.current.clientWidth);

            setDraggingButtonPosition(undefined);
            setPosition(streamId, relativePosition);
          }
        };

        const onMouseMove = (e: MouseEvent) => {
          draggingRef.current = true;
          setButtonPosition(e.screenX);
        };

        const onMouseUp = (e: MouseEvent) => {
          if (draggingRef.current) {
            setButtonPosition(e.screenX);
            seekToButtonPosition();
          } else {
            if (playing) {
              pause(streamId);
            } else {
              play(streamId);
            }
          }

          dragPositionRef.current = undefined;
          document.body.removeEventListener("mouseup", onMouseUp);
          document.body.removeEventListener("mousemove", onMouseMove);

          draggingRef.current = false;
        };

        document.body.addEventListener("mouseup", onMouseUp);
        document.body.addEventListener("mousemove", onMouseMove);
      }
    },
    [buttonRef, clearAnimation, pause, play, playing, setPosition, streamId]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.code === "Space") {
        if (playing) {
          pause(streamId);
        } else {
          play(streamId);
        }
      } else if (e.code === "ArrowRight") {
        players[streamId].currentTime += 5;
      } else if (e.code === "ArrowLeft") {
        players[streamId].currentTime -= 5;
      }
    },
    [pause, play, players, playing, streamId]
  );

  const calcLeft = useCallback(() => {
    return draggingButtonPosition !== undefined
      ? `${draggingButtonPosition}px`
      : buttonRef.current &&
        buttonRef.current.parentElement &&
        playerPosition !== undefined
      ? `${
          (buttonRef.current.parentElement.clientWidth -
            buttonRef.current.clientWidth) *
          playerPosition
        }px`
      : "0px";
  }, [draggingButtonPosition, buttonRef, playerPosition]);

  const [left, setLeft] = useState(calcLeft());
  useEffect(() => {
    setLeft(calcLeft());
  }, [calcLeft, setLeft, draggingButtonPosition, playerPosition]);

  return initialized ? (
    <div className="player">
      <button
        type="button"
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        ref={(button) => {
          buttonRef.current = button ?? undefined;
          setLeft(calcLeft());
        }}
        style={{ left }}
      >
        <span className="visually-hidden">{playing ? "pause" : "play"}</span>
        {playing ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
    </div>
  ) : null;
};
