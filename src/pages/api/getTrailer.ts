import { IResponseDataTrailer } from "@/models/server";
import { movieApi } from "@/pages/api/movieApi";

export async function getTrailer(id: string) {
  try {
    const { data } = await movieApi.get<IResponseDataTrailer>(`/titles/${id}`, {
      params: { info: "trailer" },
    });

    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
