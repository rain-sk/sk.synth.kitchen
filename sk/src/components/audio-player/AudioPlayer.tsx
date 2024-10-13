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
  const { activeStreamId, players, setupPlayer, play, pause } =
    useContext(AudioPlayerContext);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const animationRef = useRef<number>();
  const dragPositionRef = useRef<number>();
  const draggingRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>();

  const initialized = streamId in players;
  const playing = activeStreamId === streamId;

  const clearAnimation = useCallback(() => {
    if (animationRef.current !== undefined) {
      clearInterval(animationRef.current);
      animationRef.current = undefined;
    }
  }, [animationRef]);

  const animate = useCallback(() => {
    if (playing) {
      animationRef.current = setInterval(() => {
        setPlayheadPosition(
          players[streamId].currentTime / players[streamId].duration
        );
      }, 1000);
    }
  }, [animationRef, players, playing, setPlayheadPosition, streamId]);

  useEffect(() => {
    if (!initialized) {
      setupPlayer(streamId);
    }
  }, [initialized, setupPlayer, streamId]);

  useEffect(() => {
    if (buttonRef.current && buttonRef.current.parentNode) {
      buttonRef.current.style.left = `${
        (buttonRef.current.parentNode.clientWidth -
          buttonRef.current.clientWidth) *
        playheadPosition
      }px`;
    }
  }, [playheadPosition, playing, buttonRef]);

  useEffect(() => {
    clearAnimation();
    animate();
  }, [
    animate,
    clearAnimation,
    players,
    playing,
    setPlayheadPosition,
    streamId,
  ]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        clearAnimation();

        draggingRef.current = false;
        dragPositionRef.current = e.screenX;

        const setButtonPosition = (screenX: number) => {
          if (buttonRef.current && dragPositionRef.current) {
            const min = 0;
            const max =
              buttonRef.current.parentNode.clientWidth -
              buttonRef.current.clientWidth;
            const currentPosition = parseFloat(
              buttonRef.current.style.left.replace("px", "")
            );
            const diff = screenX - dragPositionRef.current;
            const newPosition = Math.min(
              max,
              Math.max(min, currentPosition + diff)
            );
            buttonRef.current.style.left = `${newPosition}px`;
            dragPositionRef.current = screenX;
          }
        };

        const seekToButtonPosition = () => {
          if (buttonRef.current) {
            const position = parseFloat(
              buttonRef.current.style.left.replace("px", "")
            );
            const relativePosition =
              position /
              (buttonRef.current.parentNode.clientWidth -
                buttonRef.current.clientWidth);

            players[streamId].currentTime =
              relativePosition * players[streamId].duration;
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
          animate();
        };

        document.body.addEventListener("mouseup", onMouseUp);
        document.body.addEventListener("mousemove", onMouseMove);
      }
    },
    [
      animate,
      buttonRef,
      clearAnimation,
      pause,
      play,
      players,
      playing,
      streamId,
    ]
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

  return initialized ? (
    <div className="player">
      <button
        type="button"
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        ref={buttonRef}
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
