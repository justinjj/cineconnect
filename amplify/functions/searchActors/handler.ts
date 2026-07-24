import type { Schema } from "../../data/resource";
import { searchActors } from "./tmdb";

export const handler: Schema["searchActors"]["functionHandler"] = async (
  event
) => {
  return await searchActors(event.arguments.query);
};