import Comment from './comment.ts'

export type User = {
  _id: string;
  email: string;
  username: string;
  image?: string;
  about?: string;
  playlists: string[];        // Array of Playlist IDs
  likes: string[];            // Liked song IDs or slugs
  comments: Comment[];        // Reuse comment structure
  addedSongs: string[];       // Array of Song IDs
}

export default User