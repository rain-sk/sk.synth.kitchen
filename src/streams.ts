export type StreamInfo = {
  streamId: string;
  url: string;
  title: string;
  tracklist?: string[];
};

export const streams: StreamInfo[] = [
  {
    streamId: "sunrise-trance",
    url: "/mp3/Sunrise-Trance_2024-10-26.mp3",
    title: "Sunrise Trance Set",
    tracklist: [
      "S Mobile - Patrick Holland",
      "Wither - Browncoat",
      "Third Rail - Patrick Holland",
      "Show - Sk",
      "Let's Make Love and Listen to Death From Above - CSS",
      "ALOHAnet - Palmbomen II",
      "Shangri-La (Psychemagik Remix) - YACHT",
      "Stardust - Kohra",
      "High Noon - Patrick Holland",
      "Turtles - Flying Lotus",
      "Love Is All I Got - Feed Me & Crystal Fighters",
      "Messed It Up - Palmbomen II",
      "RTL Unifeeder - Palmbomen II",
      "Ultimate Lovestory Fantasy - Palmbomen II",
      "Summer Song - YACHT",
      "The Sky - Mat Zo Feat. Linnea Schössow",
      "Reaching Out (Booka Shade Remix) - Nero",
      "Reaching Out (Fred Falke Remix) - Nero",
      "Last Duty (Masanori Yasuda Remix) - Nhato",
      "Superman Lost - Mat Zo",
      "Time Dilation - Mat Zo",
      "145 - Palmbomen II",
      "Pyrotechnomarco - Palmbomen II",
      "Beautiful Life - Martin Roth",
      "Get to Know You - Vincenzo K.",
      "Phobos - Stephen J. Kroos",
      "Ill Victory Beat - The Latch Brothers",
      "Hair Dun Nails Dun - Color Plus",
      "Good Enough - XXYYXX",
      "Killing Time - Mat Zo",
    ],
  },
  {
    streamId: "sala-sonari",
    url: "/mp3/Sala-Sonari_2024-10-10.mp3",
    title: "Sala Sonari",
  },
  {
    streamId: "cdmix",
    url: "/mp3/CDMX_2024-09-28.mp3",
    title: "CDMX Mix",
  },
  {
    streamId: "sissy-fest",
    url: "/mp3/Sissy-Fest.mp3",
    title: "Sissy Fest 2024",
  },
];

export const getStream = (streamId: string) => {
  return streams.find((stream) => stream.streamId === streamId);
};
