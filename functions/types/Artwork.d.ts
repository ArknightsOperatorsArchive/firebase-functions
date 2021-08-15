import Artist from "./Artist";
import AKOperator from "./AKOperators";

export default interface Artwork {
  uid?: string;
  artist: Artist;
  operator: AKOperator;
  status: "Not Assigned" | "Assigned" | "Work in Progress" | "Finished";
  fileExists?: boolean;
}
