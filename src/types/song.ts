
export type Song {
    _id: string;
    name: string;
    genre?: string;
    singer: string; // Artist ID
    cover?: string;
    year: string; // ISO date string
    source?: string;
    musicSrc?: string;
    length?: number;
    album?: string; // Album ID
    artists: string[]; // Array of Artist IDs
    comments: Comment[];
    likesCount: number;
    user: string; // User ID
    isDeleted: boolean;
    officialLyricSheet: string; // LyricSheet ID
  }