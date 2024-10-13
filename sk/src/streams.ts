export type StreamInfo = {
  streamId: string;
  url: string;
  title: string;
  tracklist?: string[];
};

export const streams: StreamInfo[] = [
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
