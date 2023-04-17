export interface IRating {
  aggregateRating: number;
  voteCount: number;
  __typename: string;
}

export interface IReleaseDate {
  day: number;
  month: number;
  year: number;
  __typename: string;
}
export interface ICast {
  node: {
    name: {
      id: string;
      nameText: {
        text: string;
        __typename: string;
      };
      primaryImage: {
        url: string;
        width: number;
        height: number;
        __typename: string;
      };
      __typename: string;
    };
    characters: [{ name: string; __typename: string }];
    episodeCredits: { total: number; __typename: string };
    __typename: string;
  };
  __typename: string;
}

export interface IImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
    __typename: string;
  };
  __typename: string;
}
export interface IMovie {
  id: string;
  ratingsSummary: IRating;
  episodes: {
    episodes: { total: number; __typename: string };
    seasons: [{ years: number; totalEpisodes: number }];
    years: { year: number; __typename: string };
    totalEpisodes: {
      total: number;
      __typename: string;
    };
    topRated: {
      edges: [
        {
          node: {
            ratingsSummary: { aggregateRating: number };
            __typename: string;
          };
        }
      ];
      __typename: string;
    };
    __typename: string;
  };
  primaryImage: IImage;
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
  genres: {
    genres: [{ text: string; id: string; __typename: string }];
    __typename: string;
  };
  titleText: { text: string; __typename: string };
  releaseYear: { year: number; endYear: number; __typename: string };
  releaseDate: IReleaseDate;
  runtime: { seconds: number; __typename: string };
  plot: {
    plotText: { plainText: string; __typename: string };
    language: { id: string; __typename: string };
    __typename: string;
  };
}
export interface ICreator {
  id: string;
  creators: Array<{
    totalCredits: number;
    category: {
      text: string;
      __typename: string;
    };
    credits: Array<{
      name: {
        id: string;
        nameText: {
          text: string;
          __typename: string;
        };
        __typename: string;
      };
      attributes: any;
      __typename: string;
    }>;
    __typename: string;
  }>;
  directors: [
    {
      totalCredits: number;
      category: {
        text: string;
        __typename: string;
      };
      credits: Array<{
        name: {
          id: string;
          nameText: {
            text: string;
            __typename: string;
          };
          __typename: string;
        };
        attributes: any;
        __typename: string;
      }>;
      __typename: string;
    }
  ];
  writers: Array<{
    totalCredits: number;
    category: {
      text: string;
      __typename: string;
    };
    credits: Array<{
      name: {
        id: string;
        nameText: {
          text: string;
          __typename: string;
        };
        __typename: string;
      };
      attributes: any;
      __typename: string;
    }>;
    __typename: string;
  }>;
}

export enum Genre {
  Action = 0,
  Adult,
  Adventure,
  Animation,
  Biography,
  Comedy,
  Crime,
  Documentary,
  Drama,
  Family,
  Fantasy,
  History,
  Horror,
  Music,
  Musical,
  Mystery,
  News,
  Romance,
  Short,
  Sport,
  Thriller,
  War,
  Western,
}

export enum MovieType {
  Film = 0,
  Series,
}

export const defaultValueMovie: IMovie = {
  id: "",
  ratingsSummary: {
    aggregateRating: 0,
    voteCount: 0,
    __typename: "",
  },
  episodes: {
    episodes: { total: 0, __typename: "string" },
    seasons: [{ years: 0, totalEpisodes: 0 }],
    years: { year: 0, __typename: "" },
    totalEpisodes: {
      total: 0,
      __typename: "",
    },
    topRated: {
      edges: [
        {
          node: {
            ratingsSummary: { aggregateRating: 0 },
            __typename: "",
          },
        },
      ],
      __typename: "",
    },
    __typename: "",
  },
  primaryImage: {
    id: "",
    width: 0,
    height: 0,
    url: "",
    caption: {
      plainText: "",
      __typename: "",
    },
    __typename: "",
  },
  titleType: {
    text: "",
    id: "",
    isSeries: false,
    isEpisode: false,
    __typename: "",
  },
  genres: [{ text: "", id: "", __typename: "" }],
  titleText: { text: "", __typename: "" },
  releaseYear: { year: 0, endYear: 0, __typename: "" },
  releaseDate: {
    day: 0,
    month: 0,
    year: 0,
    __typename: "",
  },
  runtime: { seconds: 0, __typename: "" },

  plot: {
    plotText: { plainText: "", __typename: "" },
    language: { id: "", __typename: "" },
    __typename: "",
  },
};

export const defaultValueRating: IRating = {
  aggregateRating: 0,
  voteCount: 0,
  __typename: "",
};
