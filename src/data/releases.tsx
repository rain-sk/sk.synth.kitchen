import { SocialLinkInfo } from "../components/social-links/SocialLinks";

export type ReleaseData = {
  title: string;
  aside: string;
  iframe: string;
  text: string;
  id: string;
  streams?: SocialLinkInfo[];
};

export const releases: ReleaseData[] = [
  {
    title: "Do It Again - Remix",
    aside: "2024",
    iframe:
      '<iframe src="https://bandcamp.com/EmbeddedPlayer/album=2098987328/size=small/bgcol=ffffff/linkcol=0687f5/track=1912138020/transparent=true/" seamless><a href="https://liadland.bandcamp.com/track/do-it-again-sk-remix">Nothing To Remix - Liadland</a></iframe>',
    text: `You burned your hand in the fire? Do it again!<br /><br />This dancefloor remix of Liadland's <a href="https://liadland.bandcamp.com/track/do-it-again-3"><i>Do It Again</i></a> offers a groovy take on the original. Liadland's powerful vocals glide along as the rhythm pushes you further and further over the edge.`,
    id: "do-it-again",
    streams: [
      {
        text: "spotify",
        icon: <i className="fab fa-spotify">&nbsp;</i>,
        url: "https://open.spotify.com/track/43uW9HmJwcTvObyrT7ehrK",
      },
      {
        text: "apple music",
        icon: <i className="fab fa-apple">&nbsp;</i>,
        url: "https://music.apple.com/us/album/do-it-again-sk-remix/1775954301?i=1775954303",
      },
      {
        text: "youtube",
        icon: <i className="fab fa-youtube">&nbsp;</i>,
        url: "https://music.youtube.com/watch?v=-6T0om9pgdM",
      },
      {
        text: "tidal",
        icon: (
          <svg
            viewBox="0 0 33 22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="tidal-header-logo--image"
          >
            <path d="M21.1775 5.70464L15.8834 10.9992L10.589 5.70464L15.8834 0.411743L21.1775 5.70464Z"></path>
            <path d="M21.1775 16.2936L15.8834 21.5882L10.589 16.2936L15.8834 10.9993L21.1775 16.2936Z"></path>
            <path d="M10.5886 5.70506L5.29417 10.9997L0 5.70506L5.29417 0.411743L10.5886 5.70506Z"></path>
            <path d="M31.7655 5.70506L26.4715 10.9997L21.1769 5.70506L26.4715 0.411743L31.7655 5.70506Z"></path>
          </svg>
        ),
        url: "https://tidal.com/browse/track/395644719?u",
      },
    ],
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
