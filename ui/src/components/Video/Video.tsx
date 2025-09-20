import { cn, tw } from "../../lib/utils";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  IoCheckmark,
  IoContract,
  IoExpand,
  IoPause,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoSettings,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMute,
  IoVolumeOff,
} from "react-icons/io5";

export interface VideoTrack {
  /** The URL of the subtitle/caption file */
  src: string;
  /** The kind of text track - either "subtitles" or "captions" */
  kind: "subtitles" | "captions";
  /** The language code for the track (e.g., "en", "es") */
  srclang: string;
  /** The human-readable label for the track */
  label: string;
}

export interface VideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "onTimeUpdate" | "onVolumeChange"> {
  /** The URL of the video file to be played */
  src: string;
  /** The URL of an image to display before the video starts playing */
  poster?: string;
  /** Array of subtitle/caption tracks for the video */
  tracks?: VideoTrack[];
  /** Array of available playback speed options. Defaults to [0.5, 0.75, 1, 1.5, 2] */
  playbackRates?: number[];
  /** Whether to show video controls. Defaults to true */
  controls?: boolean;
  /** Whether the video should autoplay when loaded. Defaults to false */
  autoPlay?: boolean;
  /** Whether the video should loop when it reaches the end. Defaults to false */
  loop?: boolean;
  /** Whether the video should be muted by default. Defaults to false */
  muted?: boolean;
  /** How much of the video should be preloaded. Defaults to "metadata" */
  preload?: "none" | "metadata" | "auto";
  /** Additional CSS classes for the video player container */
  className?: string;
  /** Additional CSS classes for the video element */
  videoClassName?: string;
  /** Whether to show custom overlay controls instead of native browser controls. Defaults to true */
  showCustomControls?: boolean;
  /**
   * When true, keyboard shortcuts will work even if the player is not focused.
   * @default false
   */
  globalShortcuts?: boolean;
  /** Callback fired when the video ends */
  onVideoEnd?: () => void;
  /** Callback fired when the video starts playing */
  onVideoPlay?: () => void;
  /** Callback fired when the video is paused */
  onVideoPause?: () => void;
  /** Callback fired when the volume or mute state changes */
  onVolumeChange?: (volume: number, muted: boolean) => void;
  /** Callback fired when the fullscreen state changes */
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const ControlTooltip = ({
  text,
  shortcut,
  align = "center",
}: {
  text: string;
  shortcut?: string;
  align?: "start" | "center" | "end";
}) => {
  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-full mb-2 rounded bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100",
        alignmentClasses[align]
      )}
    >
      {text}
      {shortcut && <span className='ml-2 font-mono text-gray-400'>{shortcut}</span>}
    </div>
  );
};

// #region Tailwind Class Definitions
const baseContainer = tw`group/container relative touch-none overflow-hidden rounded-lg bg-black select-none`;
const baseVideo = tw`h-full w-full object-contain`;
const controlsOverlay = tw`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300`;
const controlsBar = tw`absolute right-0 bottom-0 left-0 flex items-center gap-2 p-4`;
const playButton = tw`flex h-16 w-16 items-center justify-center rounded-full bg-black/50 transition-transform duration-200 hover:scale-110 hover:bg-black/70`;
const volumeControl = tw`group/volume relative flex min-w-0 items-center gap-2 transition-all duration-300 group-hover/volume:mr-4`;
const volumeTrack = tw`relative h-1 w-0 cursor-pointer rounded-full bg-white/30 opacity-0 transition-all duration-300 group-hover/volume:w-20 group-hover/volume:opacity-100`;
const progressBar = tw`group/progress relative h-2 flex-1 cursor-pointer rounded-full bg-white/20 transition-all duration-200 group-hover/progress:h-3`;
const progressFill = tw`absolute top-0 left-0 h-full rounded-full bg-blue-500`;
const bufferedFill = tw`absolute top-0 left-0 h-full rounded-full bg-white/30`;
const iconButton = tw`group relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 hover:bg-white/20`;
const loadingSpinner = tw`absolute inset-0 flex items-center justify-center bg-black/50`;
const settingsMenu = tw`absolute right-4 bottom-14 z-10 w-48 rounded-md bg-black/80 p-2 text-white shadow-lg backdrop-blur-sm`;
const feedbackOverlay = tw`pointer-events-none absolute inset-0 flex items-center justify-between p-12`;
const feedbackIcon = tw`animate-in fade-in-0 zoom-in-95 fill-mode-forwards flex items-center gap-2 rounded-full bg-black/50 p-6 text-4xl text-white duration-300`;
// #endregion

// #region State Management (useReducer)
interface PlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  isFullscreen: boolean;
  isScrubbing: boolean;
  showSettings: boolean;
  currentTime: number;
  duration: number;
  bufferedTime: number;
  volume: number;
  playbackRate: number;
  activeTrack: string | null;
}
type PlayerAction =
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_MUTED"; payload: boolean }
  | { type: "TOGGLE_SETTINGS" }
  | { type: "SET_FULLSCREEN"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SCRUBBING"; payload: boolean }
  | { type: "SET_PLAYBACK_RATE"; payload: number }
  | { type: "SET_ACTIVE_TRACK"; payload: string | null }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_BUFFERED_TIME"; payload: number };
const initialState: PlayerState = {
  isPlaying: false,
  isMuted: false,
  isLoading: true,
  isFullscreen: false,
  isScrubbing: false,
  showSettings: false,
  currentTime: 0,
  duration: 0,
  bufferedTime: 0,
  volume: 1,
  playbackRate: 1,
  activeTrack: null,
};
function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_MUTED":
      return { ...state, isMuted: action.payload };
    case "TOGGLE_SETTINGS":
      return { ...state, showSettings: !state.showSettings };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_FULLSCREEN":
      return { ...state, isFullscreen: action.payload };
    case "SET_SCRUBBING":
      return { ...state, isScrubbing: action.payload };
    case "SET_PLAYBACK_RATE":
      return {
        ...state,
        playbackRate: action.payload,
        showSettings: false,
      };
    case "SET_ACTIVE_TRACK":
      return {
        ...state,
        activeTrack: action.payload,
        showSettings: false,
      };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_BUFFERED_TIME":
      return { ...state, bufferedTime: action.payload };
    default:
      return state;
  }
}
// #endregion

type FeedbackType = "forward" | "rewind" | "volume" | "play" | "pause";
type Feedback = { type: FeedbackType; key: number; value?: number };

/**
 * A fully-featured, accessible video player component with custom controls, built-in support for common video features, and seamless integration with your design system.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  tracks,
  playbackRates = [0.5, 0.75, 1, 1.5, 2],
  controls = true,
  autoPlay = false,
  loop = false,
  muted: initialMuted = false,
  preload = "metadata",
  className,
  videoClassName,
  showCustomControls = true,
  globalShortcuts = false,
  onVideoEnd,
  onVideoPlay,
  onVideoPause,
  onVolumeChange,
  onFullscreenChange,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<number | null>(null);
  const wasPlayingBeforeScrub = useRef(false);
  const volumeBeforeMute = useRef(1);
  const [state, dispatch] = useReducer(playerReducer, {
    ...initialState,
    isMuted: initialMuted,
    isLoading: !!src,
  });
  const {
    isPlaying,
    isMuted,
    isLoading,
    isFullscreen,
    isScrubbing,
    showSettings,
    currentTime,
    duration,
    bufferedTime,
    volume,
    playbackRate,
    activeTrack,
  } = state;

  const [showControlsUI, setShowControlsUI] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const triggerFeedback = useCallback(
    (type: FeedbackType, value?: number) => setFeedback({ type, key: Date.now(), value }),
    []
  );

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 600);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    const styleId = "custom-video-player-subtitle-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            .custom-video-player-container::cue {
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                font-size: clamp(1rem, 2.5vmin, 1.5rem);
                font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
                padding: 0.25em 0.5em;
                border-radius: 4px;
                bottom: 5%;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                transition: bottom 0.3s ease-in-out;
            }
            .custom-video-player-container.controls-visible::cue {
                bottom: 20%;
            }
        `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) document.head.removeChild(existingStyle);
    };
  }, []);

  const formatTime = useCallback((time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const hideControls = useCallback(() => {
    if (isScrubbing) return;
    if (containerRef.current && isPlaying) containerRef.current.style.cursor = "none";
    setShowControlsUI(false);
    if (showSettings) dispatch({ type: "TOGGLE_SETTINGS" });
  }, [isScrubbing, showSettings, isPlaying]);

  const showAndAutoHideControls = useCallback(() => {
    if (containerRef.current) containerRef.current.style.cursor = "default";
    setShowControlsUI(true);
    if (hideControlsTimer.current) window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(hideControls, 3000);
  }, [hideControls]);

  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play().catch(console.error);
        triggerFeedback("play");
      } else {
        video.pause();
        triggerFeedback("pause");
      }
    },
    [triggerFeedback]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-controls-bar]")) return;
      togglePlay();
    },
    [togglePlay]
  );

  const handleSeek = useCallback(
    (offset: number) => {
      const video = videoRef.current;
      if (!video || duration === 0) return;
      const newTime = Math.max(0, Math.min(duration, video.currentTime + offset));
      video.currentTime = newTime;
      dispatch({ type: "SET_TIME", payload: newTime });
      triggerFeedback(offset > 0 ? "forward" : "rewind");
    },
    [duration, triggerFeedback]
  );

  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(1, newVolume));
    video.volume = clamped;
    video.muted = clamped === 0;
  }, []);

  const handleVolumeScrub = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      handleVolumeChange(newVolume);

      const handleMove = (moveEvent: MouseEvent) => {
        const movedVolume = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
        handleVolumeChange(movedVolume);
      };
      const handleEnd = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
      };
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
    },
    [handleVolumeChange]
  );

  const toggleMute = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      const newMuted = !video.muted;
      if (newMuted) {
        volumeBeforeMute.current = video.volume;
        handleVolumeChange(0);
      } else {
        handleVolumeChange(volumeBeforeMute.current > 0.01 ? volumeBeforeMute.current : 0.5);
      }
    },
    [handleVolumeChange]
  );

  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }, []);

  const handlePlaybackRateChange = useCallback((rate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
    dispatch({ type: "SET_PLAYBACK_RATE", payload: rate });
  }, []);

  const handleTrackChange = useCallback((label: string | null) => {
    const video = videoRef.current;
    if (!video) return;
    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = video.textTracks[i].label === label ? "showing" : "hidden";
    }
    dispatch({ type: "SET_ACTIVE_TRACK", payload: label });
  }, []);

  const updateSeekPosition = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!progressRef.current || !duration) return 0;
      const rect = progressRef.current.getBoundingClientRect();
      return Math.max(0, Math.min(duration, ((e.clientX - rect.left) / rect.width) * duration));
    },
    [duration]
  );

  const handleScrubStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      wasPlayingBeforeScrub.current = !video.paused;
      if (wasPlayingBeforeScrub.current) video.pause();
      dispatch({ type: "SET_SCRUBBING", payload: true });

      const newTime = updateSeekPosition(e);
      video.currentTime = newTime;
      dispatch({ type: "SET_TIME", payload: newTime });

      const handleScrubMove = (moveEvent: MouseEvent) => {
        const movedTime = updateSeekPosition(moveEvent);
        video.currentTime = movedTime;
        dispatch({ type: "SET_TIME", payload: movedTime });
      };
      const handleScrubEnd = () => {
        if (wasPlayingBeforeScrub.current) video.play().catch(console.error);
        dispatch({ type: "SET_SCRUBBING", payload: false });
        document.removeEventListener("mousemove", handleScrubMove);
        document.removeEventListener("mouseup", handleScrubEnd);
      };
      document.addEventListener("mousemove", handleScrubMove);
      document.addEventListener("mouseup", handleScrubEnd);
    },
    [updateSeekPosition]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => {
      dispatch({ type: "SET_PLAYING", payload: true });
      onVideoPlay?.();
    };
    const onPause = () => {
      dispatch({ type: "SET_PLAYING", payload: false });
      onVideoPause?.();
    };
    const onEnded = () => {
      dispatch({ type: "SET_PLAYING", payload: false });
      onVideoEnd?.();
    };
    const onTimeUpdateEvent = () => dispatch({ type: "SET_TIME", payload: video.currentTime });
    const onLoadedData = () => {
      dispatch({ type: "SET_DURATION", payload: video.duration });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    const onVolumeChangeHandler = () => {
      dispatch({ type: "SET_VOLUME", payload: video.volume });
      dispatch({ type: "SET_MUTED", payload: video.muted });
      onVolumeChange?.(video.volume, video.muted);
    };
    const onProgress = () => {
      if (video.buffered.length > 0)
        dispatch({
          type: "SET_BUFFERED_TIME",
          payload: video.buffered.end(video.buffered.length - 1),
        });
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdateEvent);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("volumechange", onVolumeChangeHandler);
    video.addEventListener("waiting", () => dispatch({ type: "SET_LOADING", payload: true }));
    video.addEventListener("playing", () => dispatch({ type: "SET_LOADING", payload: false }));
    video.addEventListener("progress", onProgress);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdateEvent);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("volumechange", onVolumeChangeHandler);
      video.removeEventListener("waiting", () => dispatch({ type: "SET_LOADING", payload: true }));
      video.removeEventListener("playing", () => dispatch({ type: "SET_LOADING", payload: false }));
      video.removeEventListener("progress", onProgress);
    };
  }, [onVideoPlay, onVideoPause, onVideoEnd, onVolumeChange]);

  useEffect(() => {
    const onFullscreen = () => {
      const isFull = !!document.fullscreenElement;
      dispatch({ type: "SET_FULLSCREEN", payload: isFull });
      onFullscreenChange?.(isFull);
    };
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, [onFullscreenChange]);

  useEffect(() => {
    if (isPlaying) {
      showAndAutoHideControls();
    } else {
      setShowControlsUI(true);
      if (containerRef.current) containerRef.current.style.cursor = "default";
      if (hideControlsTimer.current) {
        window.clearTimeout(hideControlsTimer.current);
        hideControlsTimer.current = null;
      }
    }
  }, [isPlaying, showAndAutoHideControls]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (!globalShortcuts && document.activeElement !== containerRef.current) return;
      if (target.tagName === "INPUT" || target.isContentEditable) return;

      showAndAutoHideControls();
      switch (e.key.toLowerCase()) {
        case "k":
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          handleSeek(-10);
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          handleSeek(10);
          break;
        case "arrowup": {
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          handleVolumeChange(newVolumeUp);
          triggerFeedback("volume", newVolumeUp * 100);
          break;
        }
        case "arrowdown": {
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          handleVolumeChange(newVolumeDown);
          triggerFeedback("volume", newVolumeDown * 100);
          break;
        }
      }
    };
    const eventTarget = globalShortcuts ? document : containerRef.current;
    if (!eventTarget) return;

    eventTarget.addEventListener("keydown", handleKeyDown as EventListener);
    return () => eventTarget.removeEventListener("keydown", handleKeyDown as EventListener);
  }, [
    togglePlay,
    toggleMute,
    toggleFullscreen,
    handleSeek,
    handleVolumeChange,
    volume,
    showAndAutoHideControls,
    triggerFeedback,
    globalShortcuts,
  ]);

  const VolumeIcon = isMuted
    ? IoVolumeMute
    : volume <= 0.01
      ? IoVolumeOff
      : volume < 0.5
        ? IoVolumeLow
        : IoVolumeHigh;
  const CentralFeedbackIcon = feedback?.type === "play" ? IoPlay : IoPause;

  return (
    <div
      ref={containerRef}
      className={cn(
        baseContainer,
        "custom-video-player-container",
        showControlsUI && "controls-visible",
        className
      )}
      onMouseMove={showAndAutoHideControls}
      onMouseLeave={isPlaying ? hideControls : undefined}
      onClick={handleContainerClick}
      tabIndex={-1}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={initialMuted}
        preload={preload}
        crossOrigin='anonymous'
        className={cn(baseVideo, videoClassName)}
        {...props}
      >
        {tracks?.map(track => (
          <track key={track.src} {...track} />
        ))}
      </video>

      {isLoading && (
        <div className={loadingSpinner}>
          <div className='h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white'></div>
        </div>
      )}

      {feedback && (
        <div className={feedbackOverlay} key={feedback.key}>
          <div className='flex w-1/3 justify-start'>
            {feedback.type === "rewind" && (
              <div className={feedbackIcon}>
                <IoPlayBack />
              </div>
            )}
          </div>
          <div className='flex w-1/3 justify-center'>
            {["play", "pause"].includes(feedback.type) && (
              <div className={feedbackIcon}>
                <CentralFeedbackIcon />
              </div>
            )}
            {feedback.type === "volume" && (
              <div className={feedbackIcon}>
                <VolumeIcon />
                <span className='text-xl'>{Math.round(feedback.value ?? 0)}%</span>
              </div>
            )}
          </div>
          <div className='flex w-1/3 justify-end'>
            {feedback.type === "forward" && (
              <div className={feedbackIcon}>
                <IoPlayForward />
              </div>
            )}
          </div>
        </div>
      )}

      {controls && showCustomControls && (
        <div
          className={cn(
            controlsOverlay,
            showControlsUI ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {!isPlaying && !isLoading && !feedback && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <button onClick={togglePlay} className={playButton} aria-label='Play'>
                <IoPlay className='ml-1 h-8 w-8 text-white' />
              </button>
            </div>
          )}
          <div className={controlsBar} data-controls-bar>
            <button onClick={togglePlay} className={iconButton}>
              {isPlaying ? <IoPause className='h-6 w-6' /> : <IoPlay className='h-6 w-6' />}
              <ControlTooltip align='start' text={isPlaying ? "Pause" : "Play"} shortcut='K' />
            </button>
            <div className={volumeControl}>
              <button onClick={toggleMute} className={iconButton}>
                <VolumeIcon className='h-6 w-6' />
                <ControlTooltip text={isMuted ? "Unmute" : "Mute"} shortcut='M' />
              </button>
              <div onMouseDown={handleVolumeScrub} className={volumeTrack}>
                <div
                  className='absolute h-full rounded-full bg-white'
                  style={{
                    width: `${isMuted ? 0 : volume * 100}%`,
                  }}
                />
                <div
                  className='absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow'
                  style={{
                    left: `${isMuted ? 0 : volume * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className='min-w-[80px] text-right text-sm font-medium text-white'>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div
              ref={progressRef}
              className={progressBar}
              onMouseDown={handleScrubStart}
              onMouseMove={e => {
                setHoverTime(updateSeekPosition(e));
                setHoverPosition(e.clientX - e.currentTarget.getBoundingClientRect().left);
              }}
              onMouseLeave={() => setHoverTime(null)}
            >
              <div
                className={bufferedFill}
                style={{
                  width: `${(bufferedTime / duration) * 100}%`,
                }}
              />
              <div
                className={progressFill}
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              />
              {hoverTime !== null && (
                <>
                  <div
                    className='pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs text-white'
                    style={{ left: `${hoverPosition}px` }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                  <div
                    className='pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md'
                    style={{ left: `${hoverPosition}px` }}
                  />
                </>
              )}
            </div>

            <button
              onClick={e => {
                e.stopPropagation();
                dispatch({ type: "TOGGLE_SETTINGS" });
              }}
              className={iconButton}
            >
              <IoSettings className='h-6 w-6' />
              <ControlTooltip text='Settings' />
            </button>
            <button onClick={toggleFullscreen} className={iconButton}>
              {isFullscreen ? <IoContract className='h-6 w-6' /> : <IoExpand className='h-6 w-6' />}
              <ControlTooltip
                align='end'
                text={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                shortcut='F'
              />
            </button>

            {showSettings && (
              <div className={settingsMenu}>
                <div className='p-1'>
                  <h4 className='mb-2 text-sm font-semibold'>Speed</h4>
                  {playbackRates.map(rate => (
                    <button
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className='flex w-full items-center justify-between rounded p-1.5 text-left text-xs hover:bg-white/20'
                    >
                      <span>{rate === 1 ? "Normal" : `${rate}x`}</span>
                      {playbackRate === rate && <IoCheckmark />}
                    </button>
                  ))}
                </div>
                {videoRef.current?.textTracks && videoRef.current.textTracks.length > 0 && (
                  <>
                    <div className='my-1 h-px bg-white/20' />
                    <div className='p-1'>
                      <h4 className='mb-2 text-sm font-semibold'>Subtitles</h4>
                      <button
                        onClick={() => handleTrackChange(null)}
                        className='flex w-full items-center justify-between rounded p-1.5 text-left text-xs hover:bg-white/20'
                      >
                        <span>Off</span>
                        {activeTrack === null && <IoCheckmark />}
                      </button>
                      {Array.from(videoRef.current.textTracks).map(track => (
                        <button
                          key={track.label}
                          onClick={() => handleTrackChange(track.label)}
                          className='flex w-full items-center justify-between rounded p-1.5 text-left text-xs hover:bg-white/20'
                        >
                          <span>{track.label}</span>
                          {activeTrack === track.label && <IoCheckmark />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

VideoPlayer.displayName = "VideoPlayer";
