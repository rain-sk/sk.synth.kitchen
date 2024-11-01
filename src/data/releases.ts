export type ReleaseData = {
  title: string;
  aside: string;
  iframe: string;
  text: string;
  id: string;
};

export const releases: ReleaseData[] = [
  {
    title: "Do It Again - Remix",
    aside: "2024",
    iframe:
      '<iframe src="https://bandcamp.com/EmbeddedPlayer/album=2098987328/size=small/bgcol=ffffff/linkcol=0687f5/track=1912138020/transparent=true/" seamless><a href="https://liadland.bandcamp.com/track/do-it-again-sk-remix">Nothing To Remix - Liadland</a></iframe>',
    text: `You burned your hand in the fire? Do it again.<br /><br />This dancefloor remix of Liadland's <a href="https://liadland.bandcamp.com/track/do-it-again-3"><i>Do It Again</i></a> offers a groovy take on the original. Liadland's powerful vocals glide along as the rhythm pushes you further and further over the edge.`,
    id: "do-it-again",
  },
  {
    title: "Zela",
    aside: "2019",
    iframe:
      '<iframe src="https://bandcamp.com/EmbeddedPlayer/album=820312149/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/" seamless><a href="https://sk-rain.bandcamp.com/album/zela">Zela by Sk [Rain]</a></iframe>',
    text: `A sonic journey that combines elements of techno, house, and experimental electronics. Each track blends into the next, creating a narrative arc that draws listeners in from start to finish. Zela represents a natural progression for Sk [Rain] as an artist, showcasing the evolution of their creative vision.`,
    id: "zela",
  },
  {
    title: "Fields",
    aside: "2018",
    iframe:
      '<iframe src="https://bandcamp.com/EmbeddedPlayer/album=906746429/size=small/bgcol=ffffff/linkcol=0687f5/track=997702670/transparent=true/" seamless><a href="https://sk-rain.bandcamp.com/album/fields">Fields by Sk [Rain]</a></iframe>',
    text: `Sk [Rain]'s debut EP, featuring a diverse range of genres and styles that have captured their imagination. From minimal/ambient house to "sound fields", Fields is a journey into the sonic landscapes that inspire Sk [Rain]. Listeners are invited to explore the interplay between music and environment.`,
    id: "fields",
  },
];

export const getRelease = (releaseId: string) => {
  return releases.find((release) => release.id === releaseId);
};
