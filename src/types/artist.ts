import Album from './album.ts'
import Comment from './comment.ts'
import Song from './song.ts'

export type Artist = {
  _id: string;
  name: string;
  date: Date;
  about: string;
  cover: string; //url
  songs: Array<Song>;
  albums: Array<Album>;
  comments: Array<Comment>;
  likesCount: number;
}

export default Artist