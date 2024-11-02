import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";

import { AudioPlayerContext } from "../../contexts/audio-player";

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

  const onClickPlayer = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        buttonRef.current &&
        e.target &&
        buttonRef.current.contains(e.target as HTMLElement)
      ) {
        return;
      }
      const eventX = e.screenX;
      const elementRect = (e.target as HTMLDivElement).getBoundingClientRect();
      const left = elementRect.x;
      const right = left + elementRect.width;

      const newPosition = (eventX - left) / (right - left);

      setPosition(streamId, newPosition);
    },
    [setPosition, streamId]
  );

  type DragStartEvent<HTMLElementType> =
    | {
        type: "mouse";
        event: React.MouseEvent<HTMLElementType>;
      }
    | {
        type: "touch";
        event: React.TouchEvent<HTMLElementType>;
      };

  const touchRef = useRef<boolean>(false);
  const onDragStart = useCallback(
    (e: DragStartEvent<HTMLButtonElement>) => {
      const isMouseEvent = e.type === "mouse";
      if (!isMouseEvent) {
        e.event.preventDefault();
        e.event.stopPropagation();
      } else if (touchRef.current) {
        setTimeout(() => {
          touchRef.current = false;
        }, 10);
        return;
      }

      touchRef.current = !isMouseEvent;

      const screenX = (
        e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent
      ) => {
        return isMouseEvent
          ? (e as React.MouseEvent | MouseEvent).screenX
          : Array.from((e as React.TouchEvent | TouchEvent).touches).find(
              (touch) => touch.target === buttonRef.current
            )?.screenX ?? 0;
      };

      if (buttonRef.current) {
        clearAnimation();

        draggingRef.current = false;
        dragPositionRef.current = screenX(e.event);

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

        const onDrag = (e: MouseEvent | TouchEvent) => {
          if (isMouseEvent) {
            e.preventDefault();
            e.stopPropagation();
          }

          const dragX = screenX(e);
          if (!draggingRef.current && dragPositionRef.current !== undefined) {
            draggingRef.current = Math.abs(dragX - dragPositionRef.current) > 1;
            console.log(dragX, dragPositionRef.current, draggingRef.current);
          }
          if (draggingRef.current) {
            setButtonPosition(dragX);
          }
        };

        const onDragEnd = (e: MouseEvent | TouchEvent) => {
          if (draggingRef.current) {
            setButtonPosition(screenX(e));
            seekToButtonPosition();
          } else {
            if (playing) {
              pause(streamId);
            } else {
              play(streamId);
            }
          }

          dragPositionRef.current = undefined;
          document.body.removeEventListener(
            isMouseEvent ? "mouseup" : "touchend",
            onDragEnd
          );
          document.body.removeEventListener(
            isMouseEvent ? "mousemove" : "touchmove",
            onDrag
          );

          draggingRef.current = false;
        };

        document.body.addEventListener(
          isMouseEvent ? "mouseup" : "touchend",
          onDragEnd
        );
        document.body.addEventListener(
          isMouseEvent ? "mousemove" : "touchmove",
          onDrag
        );

        if (!isMouseEvent) {
          document.body.addEventListener("touchcancel", onDragEnd);
        }
      }
    },
    [
      buttonRef,
      draggingRef,
      dragPositionRef,
      clearAnimation,
      pause,
      play,
      playing,
      setPosition,
      streamId,
    ]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onDragStart({
        type: "mouse",
        event: e,
      });
    },
    [onDragStart]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      onDragStart({
        type: "touch",
        event: e,
      });
    },
    [onDragStart]
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
    <div className="player" onClick={onClickPlayer}>
      <button
        type="button"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
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
