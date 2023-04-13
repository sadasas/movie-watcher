export interface ReleaseDate {
  day: number;
  month: number;
  year: number;
}

export interface Image {
  width: number;
  height: number;
  url: string;
  caption: { plainText: string };
}
export interface Movie {
  id: string;
  primaryImage: Image;
  releaseDate: ReleaseDate;
  titleText: { text: string };
  titleType: {
    isSeries: boolean;
    isEpisode: boolean;
  };
}
