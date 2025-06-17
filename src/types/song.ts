import Artist from 'types/artist'
import Album from './album'

export type Song = {
    _id: string;
    name: string;
    genre?: string;
    singer: Artist; // Artist ID
    cover?: string;
    year: string; // ISO date string
    source?: string;
    musicSrc?: string;
    length?: number;
    album?: Album; // Album ID
    artists: Artist[]; // Array of Artist IDs
    comments: Comment[];
    likesCount: number;
    user: string; // User ID
    isDeleted: boolean;
    officialLyricSheet: string; // LyricSheet ID
  }

export default Song