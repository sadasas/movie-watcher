import { IResponseDataCast } from "@/models/server";
import { movieApi } from "@/pages/api/movieApi";

export async function getMainActors(id: string) {
  try {
    const { data } = await movieApi.get<IResponseDataCast>(
      "/titles/x/titles-by-ids",
      {
        params: { idsList: id, info: "extendedCast" },
      }
    );

    return data.results[0].cast.edges;
  } catch (error) {
    console.error(error);
    return null;
  }
}
