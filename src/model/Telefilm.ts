import { TvDetails } from "./Tv";

export interface Telefilm {
    original_name: string;
    id: number;
    overview: string;
    poster_path: string;
    tv_details: TvDetails;
    collapse: boolean;
}