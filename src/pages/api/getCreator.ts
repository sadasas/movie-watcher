import { IResponseDataCreator } from "@/models/server";
import { movieApi } from "@/pages/api/movieApi";

export async function getCreators(id: string) {
  try {
    const { data } = await movieApi.get<IResponseDataCreator>(
      "/titles/x/titles-by-ids",
      {
        params: { idsList: id, info: "creators_directors_writers" },
      }
    );

    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
