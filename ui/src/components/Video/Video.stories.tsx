import type { Meta, StoryObj } from "@storybook/react-vite";
import { VideoPlayer } from "./Video";
import mdx from "./Video.mdx";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    tracks: {
      control: "object",
      description: "Array of subtitle/caption tracks for the video",
    },
    src: {
      control: "text",
      description: "The URL of the video file to be played",
    },
    poster: {
      control: "text",
      description: "The URL of an image to display before the video starts playing",
    },
    controls: {
      control: { type: "boolean" },
      description: "Whether to show video controls",
      defaultValue: true,
    },
    autoPlay: {
      control: { type: "boolean" },
      description: "Whether the video should autoplay when loaded",
      defaultValue: false,
    },
    loop: {
      control: { type: "boolean" },
      description: "Whether the video should loop when it reaches the end",
      defaultValue: false,
    },
    muted: {
      control: { type: "boolean" },
      description: "Whether the video should be muted by default",
      defaultValue: false,
    },
    preload: {
      control: { type: "select" },
      options: ["none", "metadata", "auto"],
      description: "How much of the video should be preloaded",
      defaultValue: "metadata",
    },
    showCustomControls: {
      control: { type: "boolean" },
      description: "Whether to show custom overlay controls instead of native browser controls",
      defaultValue: true,
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the video player container",
    },
    videoClassName: {
      control: "text",
      description: "Additional CSS classes for the video element",
    },
    globalShortcuts: {
      control: { type: "boolean" },
      description: "When true, keyboard shortcuts will work even if the player is not focused",
      defaultValue: false,
    },
    onVideoEnd: {
      action: "videoEnded",
      description: "Callback fired when the video ends",
    },
    onVideoPlay: {
      action: "videoPlayed",
      description: "Callback fired when the video starts playing",
    },
    onVideoPause: {
      action: "videoPaused",
      description: "Callback fired when the video is paused",
    },
    onVolumeChange: {
      action: "volumeChanged",
      description: "Callback fired when the volume or mute state changes",
    },
    onFullscreenChange: {
      action: "fullscreenChanged",
      description: "Callback fired when the fullscreen state changes",
    },
    playbackRates: {
      control: "object",
      description: "Array of available playback speed options",
      defaultValue: [0.5, 0.75, 1, 1.5, 2],
    },
  },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample video URLs for demonstration
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER = "https://peach.blender.org/wp-content/uploads/bbb-splash.png";

// Default story
export const Default: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Basic video without poster
export const Basic: Story = {
  args: {
    src: SAMPLE_VIDEO,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Autoplay video
export const Autoplay: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    autoPlay: true,
    muted: true, // Required for autoplay in most browsers
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Looping video
export const Looping: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    loop: true,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Muted by default
export const Muted: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    muted: true,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Without custom controls (native browser controls)
export const NativeControls: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: false,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer {...args} />
    </div>
  ),
};

// Different aspect ratios
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">16:9 Aspect Ratio</h3>
        <div className="aspect-video w-full max-w-2xl">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={SAMPLE_POSTER}
            controls={true}
            showCustomControls={true}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">4:3 Aspect Ratio</h3>
        <div className="aspect-[4/3] w-full max-w-xl">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={SAMPLE_POSTER}
            controls={true}
            showCustomControls={true}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Square Aspect Ratio</h3>
        <div className="aspect-square w-full max-w-md">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={SAMPLE_POSTER}
            controls={true}
            showCustomControls={true}
          />
        </div>
      </div>
    </div>
  ),
};

// With event callbacks
export const WithCallbacks: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
    onVideoPlay: () => console.log("Video started playing"),
    onVideoPause: () => console.log("Video paused"),
    onVideoEnd: () => console.log("Video ended"),
    onVolumeChange: (volume, muted) =>
      console.log(`Volume: ${muted ? "muted" : volume.toFixed(1)}`),
    onFullscreenChange: isFullscreen =>
      console.log(`Fullscreen: ${isFullscreen ? "entered" : "exited"}`),
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        Check the browser console to see callback events being logged.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};

// Custom styled video player
export const CustomStyled: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <VideoPlayer
        {...args}
        className="rounded-xl border-4 border-blue-500 shadow-2xl"
        videoClassName="rounded-lg"
      />
    </div>
  ),
};

// Multiple video players
export const MultiplePlayers: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Player 1</h3>
        <div className="aspect-video">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={SAMPLE_POSTER}
            controls={true}
            showCustomControls={true}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Player 2 (Muted)</h3>
        <div className="aspect-video">
          <VideoPlayer
            src={SAMPLE_VIDEO}
            poster={SAMPLE_POSTER}
            controls={true}
            showCustomControls={true}
            muted={true}
          />
        </div>
      </div>
    </div>
  ),
};

// With subtitles example
export const WithSubtitles: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
    tracks: [
      {
        src: "https://raw.githubusercontent.com/videojs/video.js/master/docs/examples/shared/example-captions.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
      },
      {
        src: "https://raw.githubusercontent.com/videojs/video.js/master/docs/examples/shared/example-captions.vtt",
        kind: "subtitles",
        srclang: "es",
        label: "Spanish",
      },
    ],
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        Click the settings icon to access subtitle options.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};

// With custom playback rates
export const WithPlaybackRates: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        Click the settings icon to access playback speed controls.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};

// With settings menu demonstration
export const WithSettingsMenu: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
    tracks: [
      {
        src: "https://raw.githubusercontent.com/videojs/video.js/master/docs/examples/shared/example-captions.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
      },
    ],
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        The settings menu includes playback speed and subtitle controls.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};

// With feedback overlays
export const WithFeedback: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        Try playing/pausing, seeking, or adjusting volume to see feedback overlays.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};

// With tooltips demonstration
export const WithTooltips: Story = {
  args: {
    src: SAMPLE_VIDEO,
    poster: SAMPLE_POSTER,
    controls: true,
    showCustomControls: true,
  },
  render: args => (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-sm text-gray-600">
        Hover over controls to see tooltips with keyboard shortcuts.
      </p>
      <VideoPlayer {...args} />
    </div>
  ),
};
