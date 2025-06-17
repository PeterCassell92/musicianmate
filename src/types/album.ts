import Artist from 'types/artist'
import User from 'types/users'
import Song from 'types/song'

export type Album = {
  name: string;
  leadArtist: Artist;
  artists: Artist[];
  cover: string;
  year: Date;
  length: number;
  songs: Song[];
  user: User;
  comments: Comment[];
  likesCount: number;
}

export default Album
