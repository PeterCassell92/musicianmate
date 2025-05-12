export default type Playlist = {
    _id: string;
    name: string;
    cover?: string;
    text?: string;
    songs: string[];       // Song IDs
    user: string;          // Creator User ID
    users: string[];       // Associated User IDs
    public: boolean;
    likesCount: number;
  };