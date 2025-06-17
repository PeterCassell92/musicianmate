import Song from 'types/song'

export type updateAudioQueue = (songs: Song[], playnow: boolean) => void;

export default updateAudioQueue